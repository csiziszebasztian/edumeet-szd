import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@mui/styles';
import { withRoomContext } from '../RoomContext';
import * as roomActions from '../store/actions/roomActions';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

const styles = (theme) =>
	({
		dialogPaper :
		{
			width                          : '30vw',
			[theme.breakpoints.down('lg')] :
			{
				width : '40vw'
			},
			[theme.breakpoints.down('md')] :
			{
				width : '50vw'
			},
			[theme.breakpoints.down('sm')] :
			{
				width : '70vw'
			},
			[theme.breakpoints.down('xs')] :
			{
				width : '90vw'
			}
		},
		dialogActions :
		{
			flexDirection                  : 'row',
			[theme.breakpoints.down('xs')] :
			{
				flexDirection : 'column'
			}
		},

		logo :
		{
			marginLeft  : theme.spacing(1.5),
			marginRight : 'auto'
		},
		divider :
		{
			marginBottom : theme.spacing(3)
		}
	});

const LeaveDialog = ({
	roomClient,
	leaveOpen,
	classes,
	handleSetLeaveOpen,
	chatCount
}) =>

{
	const buttonYes = useRef();

	const handleEnterKey = (event) =>
	{
		if (event.key === 'Enter')
		{
			buttonYes.current.click();
		}
		else
		if (event.key === 'Escape' || event.key === 'Esc')
		{
			handleSetLeaveOpen(false);
		}
	};

	const handleStay = () => handleSetLeaveOpen(false);

	const handleLeave = () => roomClient.close();

	const handleLeaveWithSavingChat = () =>
	{
		roomClient.saveChat();

		setTimeout(() =>
		{
			roomClient.close();
		}, 1000);
	};

	return (
		<Dialog
			data-testid='leaveDialog'
			onKeyDown={handleEnterKey}
			open={leaveOpen}
			onClose={() => handleSetLeaveOpen(false)}
			classes={{
				paper : classes.dialogPaper
			}}
		>
			<DialogTitle id='form-dialog-title' dividers>
				<FormattedMessage
					id='room.leavingTheRoom'
					defaultMessage='Leaving the room'
				/>
			</DialogTitle>
			<DialogContent dividers>
				<FormattedMessage
					id='room.leaveConfirmationMessage'
					defaultMessage='Do you want to leave the room?'
				/>
			</DialogContent>
			<DialogActions className={classes.dialogActions}>
				<Button
					data-testid='leaveDialogNo'
					onClick={handleStay}
					color='primary'
					startIcon={<CancelIcon />}
				>
					<FormattedMessage
						id='label.no'
						defaultMessage='No'
					/>
				</Button>
				<Button
					data-testid='leaveDialogYes'
					onClick={handleLeave}
					color='primary'
					startIcon={<MeetingRoomIcon />}
					ref={buttonYes}
				>
					<FormattedMessage
						id='label.yes'
						defaultMessage='Yes'

					/>
				</Button>
				<Button
					onClick={handleLeaveWithSavingChat}
					color='primary'
					startIcon={<SaveIcon />}
					disabled={chatCount === 0}
				>
					<FormattedMessage
						id='label.leaveWithSavingChat'
						defaultMessage='Yes + save chat ({chatCount})'

						values={{ chatCount: chatCount }}
					/>
				</Button>
			</DialogActions>
		</Dialog>
	);
};

LeaveDialog.propTypes =
{
	roomClient         : PropTypes.object.isRequired,
	leaveOpen          : PropTypes.bool.isRequired,
	handleSetLeaveOpen : PropTypes.func.isRequired,
	classes            : PropTypes.object.isRequired,
	chatCount          : PropTypes.number.isRequired
};

const mapStateToProps = (state) =>
	({
		leaveOpen : state.room.leaveOpen,
		chatCount : state.chat.count
	});

const mapDispatchToProps = {
	handleSetLeaveOpen : roomActions.setLeaveOpen
};

export default withRoomContext(connect(
	mapStateToProps,
	mapDispatchToProps,
	null,
	{
		areStatesEqual : (next, prev) =>
		{
			return (
				prev.room.leaveOpen === next.room.leaveOpen &&
				prev.chat.count === next.chat.count
			);
		}
	}
)(withStyles(styles)(LeaveDialog)));
