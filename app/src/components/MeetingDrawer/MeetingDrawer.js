import React from 'react';
import { connect } from 'react-redux';
import { raisedHandsSelector } from '../../store/selectors';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import * as toolareaActions from '../../store/actions/toolareaActions';
import * as settingsActions from '../../store/actions/settingsActions';
import { useIntl } from 'react-intl';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Badge from '@mui/material/Badge';
import Chat from './Chat/Chat';
import ParticipantList from './ParticipantList/ParticipantList';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';

import { ReactComponent as PinIcon } from '../../images/pin-icon-baseline.svg';
import { ReactComponent as UnpinIcon } from '../../images/pin-icon-outline.svg';

const tabs =
[
	'users',
	'chat'
];

const styles = (theme) =>
	({
		root :
		{
			display         : 'flex',
			flexDirection   : 'column',
			width           : '100%',
			height          : '100%',
			backgroundColor : theme.palette.background.paper
		},
		appBar :
		{
			display       : 'flex',
			flexDirection : 'row'
		},
		tabsHeader :
		{
			flexGrow : 1
		}
	});

const MeetingDrawer = (props) =>
{
	const intl = useIntl();

	const {
		currentToolTab,
		unreadMessages,
		unreadFiles,
		raisedHands,
		closeDrawer,
		setToolTab,
		classes,
		theme,
		drawerOverlayed,
		toggleDrawerOverlayed,
		browser

	} = props;

	return (
		<div className={classes.root}>
			<AppBar
				position='static'
				color='default'
				className={classes.appBar}
			>
				<Tabs
					className={classes.tabsHeader}
					value={tabs.indexOf(currentToolTab)}
					onChange={(event, value) => setToolTab(tabs[value])}
					indicatorColor='primary'
					textColor='primary'
					variant='fullWidth'
				>
					<Tab
						label={
							<Badge color='secondary' badgeContent={raisedHands}>
								<GroupIcon />&nbsp;
								{(browser.platform !== 'mobile') && intl.formatMessage({
									id             : 'label.participants',
									defaultMessage : 'Participants'
								})}
							</Badge>
						}
					/>
					<Tab
						label={
							<Badge
								color='secondary'
								badgeContent={unreadMessages+unreadFiles}
							>
								<ChatIcon />&nbsp;
								{(browser.platform !== 'mobile') && intl.formatMessage({
									id             : 'label.chat',
									defaultMessage : 'Chat'
								})}
							</Badge>
						}
					/>
				</Tabs>
				{browser.platform !== 'mobile' && (
					<React.Fragment>
						<IconButton onClick={toggleDrawerOverlayed}>
							{ drawerOverlayed ? <UnpinIcon /> : <PinIcon /> }
						</IconButton>
						<IconButton onClick={closeDrawer}>
							{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						</IconButton>
					</React.Fragment>
				)}
			</AppBar>
			{currentToolTab === 'chat' && <Chat />}
			{currentToolTab === 'users' && <ParticipantList />}
		</div>
	);
};

MeetingDrawer.propTypes =
{
	currentToolTab        : PropTypes.string.isRequired,
	setToolTab            : PropTypes.func.isRequired,
	unreadMessages        : PropTypes.number.isRequired,
	unreadFiles           : PropTypes.number.isRequired,
	raisedHands           : PropTypes.number.isRequired,
	closeDrawer           : PropTypes.func.isRequired,
	classes               : PropTypes.object.isRequired,
	theme                 : PropTypes.object.isRequired,
	drawerOverlayed       : PropTypes.bool.isRequired,
	toggleDrawerOverlayed : PropTypes.func.isRequired,
	browser               : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
{
	return {
		currentToolTab  : state.toolarea.currentToolTab,
		unreadMessages  : state.toolarea.unreadMessages,
		unreadFiles     : state.toolarea.unreadFiles,
		raisedHands     : raisedHandsSelector(state),
		drawerOverlayed : state.settings.drawerOverlayed,
		browser         : state.me.browser

	};
};

const mapDispatchToProps = {
	setToolTab            : toolareaActions.setToolTab,
	toggleDrawerOverlayed : settingsActions.toggleDrawerOverlayed
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	null,
	{
		areStatesEqual : (next, prev) =>
		{
			return (
				prev.toolarea.currentToolTab === next.toolarea.currentToolTab &&
				prev.toolarea.unreadMessages === next.toolarea.unreadMessages &&
				prev.toolarea.drawerOverlayed === next.toolarea.drawerOverlayed &&
				prev.toolarea.unreadFiles === next.toolarea.unreadFiles &&
				prev.peers === next.peers &&
				prev.me.browser === next.me.browser

			);
		}
	}
)(withStyles(styles, { withTheme: true })(MeetingDrawer));
