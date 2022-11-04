import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makePeerConsumerSelector } from '../../../store/selectors';
import { withStyles } from '@mui/styles';
import * as roomActions from '../../../store/actions/roomActions';
import PropTypes from 'prop-types';
import * as appPropTypes from '../../appPropTypes';
import { withRoomContext } from '../../../RoomContext';
import { useIntl, FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import { green } from '@mui/material/colors';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ScreenIcon from '@mui/icons-material/ScreenShare';
import ScreenOffIcon from '@mui/icons-material/StopScreenShare';
import ExitIcon from '@mui/icons-material/ExitToApp';
import EmptyAvatar from '../../../images/avatar-empty.jpeg';
import PanIcon from '@mui/icons-material/PanTool';
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MoreIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Slider from '@mui/material/Slider';

const styles = (theme) =>
	({
		root :
		{
			width    : '100%',
			overflow : 'hidden',
			cursor   : 'auto',
			display  : 'flex'
		},
		avatar :
		{
			borderRadius : '50%',
			height       : '2rem',
			width        : '2rem',
			objectFit    : 'cover',
			marginTop    : theme.spacing(0.5)
		},
		peerInfo :
		{
			fontSize    : '1rem',
			display     : 'flex',
			paddingLeft : theme.spacing(1),
			flexGrow    : 1,
			alignItems  : 'center'
		},
		indicator :
		{
			margin : theme.spacing(1)
		},
		buttons :
		{
			padding : theme.spacing(1)
		},
		moreAction :
		{
			margin : theme.spacing(0.5, 0, 0.5, 1.5)
		},
		moreActionsHeader :
		{
			fontWeight  : 700,
			marginLeft  : theme.spacing(2),
			marginRight : theme.spacing(2),
			marginTop   : theme.spacing(1)
		},
		moderator :
		{
			color : 'rgba(220, 0, 78, 1)'
		}
	});

const VolumeSlider = withStyles(
	{
		root :
		{
			color   : '#3880ff',
			height  : 2,
			padding : '15px 0'
		},
		track : {
			height : 2
		},
		rail : {
			height  : 2,
			opacity : 0.2
		},
		mark : {
			backgroundColor : '#bfbfbf',
			height          : 10,
			width           : 3,
			marginTop       : -3
		},
		markActive : {
			opacity         : 1,
			backgroundColor : 'currentColor'
		}
	})(Slider);

const ListPeer = (props) =>
{
	const intl = useIntl();

	const [ anchorEl, setAnchorEl ] = useState(null);
	const [ currentMenu, setCurrentMenu ] = useState(null);

	const handleExited = () =>
	{
		setCurrentMenu(null);
	};

	const handleMenuOpen = (event, menu) =>
	{
		setAnchorEl(event.currentTarget);
		setCurrentMenu(menu);
	};

	const handleMenuClose = () =>
	{
		setAnchorEl(null);
	};

	const {
		roomClient,
		isModerator,
		spotlight,
		peer,
		mode,
		openRolesManager,
		micConsumer,
		webcamConsumer,
		screenConsumer,
		isSelected,
		children,
		classes
	} = props;

	const webcamEnabled = (
		Boolean(webcamConsumer) &&
		!webcamConsumer.locallyPaused &&
		!webcamConsumer.remotelyPaused
	);

	const micEnabled = (
		Boolean(micConsumer) &&
		!micConsumer.locallyPaused &&
		!micConsumer.remotelyPaused
	);

	const screenVisible = (
		Boolean(screenConsumer) &&
		!screenConsumer.locallyPaused &&
		!screenConsumer.remotelyPaused
	);

	const picture = peer.picture || EmptyAvatar;

	const isMenuOpen = Boolean(anchorEl);

	return (
		<div className={classes.root}>
			<img alt='Peer avatar' className={classes.avatar} src={picture} />

			<div className={classes.peerInfo}>
				{peer.displayName}
			</div>
			{ peer.raisedHand &&
				<IconButton
					className={classes.buttons}
					style={{ color: green[500] }}
					disabled={!isModerator || peer.raisedHandInProgress}
					onClick={() =>
					{
						roomClient.lowerPeerHand(peer.id);
					}}
				>
					<PanIcon />
				</IconButton>
			}
			{ isSelected ?
				<Tooltip
					title={intl.formatMessage({
						id             : 'tooltip.inSpotlight',
						defaultMessage : 'In spotlight'
					})}
				>
					<IconButton
						className={classes.buttons}
						style={{ color: green[500] }}
						onClick={() =>
						{
							roomClient.removeSelectedPeer(peer.id);
						}}
					>
						<AddToQueueIcon />
					</IconButton>
				</Tooltip>
				:
				spotlight &&
					<Tooltip
						title={intl.formatMessage({
							id             : 'tooltip.isSpeaker',
							defaultMessage : 'Active speaker'
						})}
					>
						<RecordVoiceOverIcon
							className={classes.indicator}
							style={{ color: green[500] }}
						/>
					</Tooltip>
			}
			<Tooltip
				title={intl.formatMessage({
					id             : 'tooltip.muteParticipant',
					defaultMessage : 'Mute audio'
				})}
				placement='bottom'
			>
				<IconButton
					aria-label={intl.formatMessage({
						id             : 'tooltip.muteParticipant',
						defaultMessage : 'Mute audio'
					})}
					color={micEnabled ? 'primary' : 'secondary'}
					disabled={peer.peerAudioInProgress}
					className={classes.buttons}
					onClick={() =>
					{
						micEnabled ?
							roomClient.modifyPeerConsumer(peer.id, 'mic', true) :
							roomClient.modifyPeerConsumer(peer.id, 'mic', false);
					}}
				>
					{ micEnabled ?
						<VolumeUpIcon />
						:
						<VolumeOffIcon />
					}
				</IconButton>
			</Tooltip>
			{children}
			<Tooltip
				title={intl.formatMessage({
					id             : 'label.moreActions',
					defaultMessage : 'More actions'
				})}
			>
				<IconButton
					aria-haspopup
					onClick={(event) => handleMenuOpen(event, 'moreActions')}
					color='inherit'
					className={classes.buttons}
				>
					<MoreIcon />
				</IconButton>
			</Tooltip>
			<Popover
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'left' }}
				open={isMenuOpen}
				onClose={handleMenuClose}
				onExited={handleExited}
				getContentAnchorEl={null}
			>
				{ currentMenu === 'moreActions' &&
					<Paper>
						<Typography className={classes.moreActionsHeader}>
							{peer.displayName}
						</Typography>
						<ListItem className={classes.nested}
							disabled={!micConsumer || peer.stopPeerAudioInProgress}
						>
							<VolumeDownIcon />
							<VolumeSlider className={classnames(classes.slider, classnames.setting)}
								key={'audio-gain-slider'}
								disabled={!micConsumer || peer.stopPeerAudioInProgress}
								min={0}
								max={2}
								step={0.05}
								value={micConsumer && micConsumer.audioGain !== undefined?
									micConsumer.audioGain: 1}
								valueLabelDisplay={'auto'}
								onChange={
									(event, value) =>
									{
										roomClient.setAudioGain(micConsumer, peer.id, value);
									}}
							/>
							<VolumeUpIcon />
						</ListItem>
						<MenuItem
							disabled={
								peer.peerVideoInProgress ||
								!webcamConsumer ||
								!spotlight
							}
							onClick={() =>
							{
								// handleMenuClose();

								webcamEnabled ?
									roomClient.modifyPeerConsumer(peer.id, 'webcam', true) :
									roomClient.modifyPeerConsumer(peer.id, 'webcam', false);
							}}
						>
							{ webcamEnabled ?
								<VideocamIcon />
								:
								<VideocamOffIcon />
							}
							<p className={classes.moreAction}>
								{ webcamEnabled ?
									<FormattedMessage
										id='tooltip.muteParticipantVideo'
										defaultMessage='Mute video'
									/>
									:
									<FormattedMessage
										id='tooltip.unMuteParticipantVideo'
										defaultMessage='Unmute video'
									/>
								}
							</p>
						</MenuItem>
						<MenuItem
							disabled={
								peer.peerScreenInProgress ||
								!screenConsumer ||
								!spotlight
							}
							onClick={() =>
							{
								// handleMenuClose();

								screenVisible ?
									roomClient.modifyPeerConsumer(peer.id, 'screen', true) :
									roomClient.modifyPeerConsumer(peer.id, 'screen', false);
							}}
						>
							{ screenVisible ?
								<ScreenIcon />
								:
								<ScreenOffIcon />
							}
							<p className={classes.moreAction}>
								{ screenVisible ?
									<FormattedMessage
										id='tooltip.muteScreenSharing'
										defaultMessage='Mute screen share'
									/>
									:
									<FormattedMessage
										id='tooltip.unMuteScreenSharing'
										defaultMessage='Unmute screen share'
									/>
								}
							</p>
						</MenuItem>
						<MenuItem
							onClick={() =>
							{
								// handleMenuClose();

								isSelected ?
									roomClient.removeSelectedPeer(peer.id) :
									mode === 'filmstrip' ?
										roomClient.setSelectedPeer(peer.id) :
										roomClient.addSelectedPeer(peer.id);
							}}
						>
							{ !isSelected ?
								<AddToQueueIcon />
								:
								<RemoveFromQueueIcon />
							}
							<p className={classes.moreAction}>
								{ !isSelected ?
									<FormattedMessage
										id='tooltip.addParticipantToSpotlight'
										defaultMessage='Add to spotlight'
									/>
									:
									<FormattedMessage
										id='tooltip.removeParticipantFromSpotlight'
										defaultMessage='Remove from spotlight'
									/>
								}
							</p>
						</MenuItem>
						{ isModerator &&
							<React.Fragment>
								<Divider />
								<Typography
									className={
										classnames(classes.moreActionsHeader, classes.moderator)
									}
								>
									<FormattedMessage
										id='room.moderatoractions'
										defaultMessage='Moderator actions'
									/>
								</Typography>
								<MenuItem
									disabled={peer.peerKickInProgress}
									onClick={() =>
									{
										// handleMenuClose();

										roomClient.kickPeer(peer.id);
									}}
								>
									<ExitIcon />
									<p className={classes.moreAction}>
										<FormattedMessage
											id='tooltip.kickParticipant'
											defaultMessage='Kick out'
										/>
									</p>
								</MenuItem>
								<MenuItem
									disabled={!micConsumer || peer.stopPeerAudioInProgress}
									onClick={() =>
									{
										// handleMenuClose();

										roomClient.mutePeer(peer.id);
									}}
								>
									{ micConsumer && !micConsumer.remotelyPaused ?
										<MicIcon />
										:
										<MicOffIcon />
									}
									<p className={classes.moreAction}>
										<FormattedMessage
											id='tooltip.muteParticipantAudioModerator'
											defaultMessage='Stop audio'
										/>
									</p>
								</MenuItem>
								<MenuItem
									disabled={!webcamConsumer || peer.stopPeerVideoInProgress}
									onClick={() =>
									{
										// handleMenuClose();

										roomClient.stopPeerVideo(peer.id);
									}}
								>
									{ webcamConsumer && !webcamConsumer.remotelyPaused ?
										<VideocamIcon />
										:
										<VideocamOffIcon />
									}
									<p className={classes.moreAction}>
										<FormattedMessage
											id='tooltip.muteParticipantVideoModerator'
											defaultMessage='Stop video'
										/>
									</p>
								</MenuItem>
								<MenuItem
									disabled={!screenConsumer || peer.stopPeerScreenSharingInProgress}
									onClick={() =>
									{
										// handleMenuClose();

										roomClient.stopPeerScreenSharing(peer.id);
									}}
								>
									{ screenConsumer && !screenConsumer.remotelyPaused ?
										<ScreenIcon />
										:
										<ScreenOffIcon />
									}
									<p className={classes.moreAction}>
										<FormattedMessage
											id='tooltip.muteScreenSharingModerator'
											defaultMessage='Stop screen share'
										/>
									</p>
								</MenuItem>
								<MenuItem
									onClick={() =>
									{
										// handleMenuClose();

										openRolesManager(peer.id);
									}}
								>
									<AccountTreeIcon />
									<p className={classes.moreAction}>
										<FormattedMessage
											id='moderator.modifyPeerRoles'
											defaultMessage='Change roles'
										/>
									</p>
								</MenuItem>
							</React.Fragment>
						}
					</Paper>
				}
			</Popover>
		</div>
	);
};

ListPeer.propTypes =
{
	roomClient       : PropTypes.any.isRequired,
	advancedMode     : PropTypes.bool,
	isModerator      : PropTypes.bool,
	spotlight        : PropTypes.bool,
	peer             : appPropTypes.Peer.isRequired,
	mode             : PropTypes.string.isRequired,
	openRolesManager : PropTypes.func.isRequired,
	micConsumer      : appPropTypes.Consumer,
	webcamConsumer   : appPropTypes.Consumer,
	screenConsumer   : appPropTypes.Consumer,
	isSelected       : PropTypes.bool,
	children         : PropTypes.object,
	classes          : PropTypes.object.isRequired
};

const makeMapStateToProps = (initialState, { id }) =>
{
	const getPeerConsumers = makePeerConsumerSelector();

	const mapStateToProps = (state) =>
	{
		return {
			peer : state.peers[id],
			mode : state.room.mode,
			...getPeerConsumers(state, id)
		};
	};

	return mapStateToProps;
};

const mapDispatchToProps = (dispatch) =>
{
	return {
		openRolesManager : (peerId) =>
		{
			dispatch(roomActions.setRolesManagerPeer(peerId));
			dispatch(roomActions.setRolesManagerOpen(true));
		}
	};
};

export default withRoomContext(connect(
	makeMapStateToProps,
	mapDispatchToProps,
	null,
	{
		areStatesEqual : (next, prev) =>
		{
			return (
				prev.peers === next.peers &&
				prev.room.mode === next.room.mode &&
				prev.consumers === next.consumers
			);
		}
	}
)(withStyles(styles)(ListPeer)));