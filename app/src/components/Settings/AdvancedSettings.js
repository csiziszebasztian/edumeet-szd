import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@mui/styles';
import { withRoomContext } from '../../RoomContext';
import * as settingsActions from '../../store/actions/settingsActions';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useIntl, FormattedMessage } from 'react-intl';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { config } from '../../config';

const styles = (theme) =>
	({
		setting :
		{
			padding : theme.spacing(2)
		},
		formControl :
		{
			display : 'flex'
		},
		switchLabel : {
			justifyContent : 'space-between',
			flex           : 'auto',
			display        : 'flex',
			padding        : theme.spacing(1),
			marginRight    : 0
		}
	});

const AdvancedSettings = ({
	roomClient,
	settings,
	onToggleAdvancedMode,
	onToggleNotificationSounds,
	classes
}) =>
{
	const intl = useIntl();

	return (
		<React.Fragment>
			<FormControlLabel
				className={classnames(classes.setting, classes.switchLabel)}
				control={<Switch checked={settings.advancedMode} onChange={onToggleAdvancedMode} value='advancedMode' />}
				labelPlacement='start'
				label={intl.formatMessage({
					id             : 'settings.advancedMode',
					defaultMessage : 'Advanced mode'
				})}
			/>
			<FormControlLabel
				className={classnames(classes.setting, classes.switchLabel)}
				control={<Switch checked={settings.notificationSounds} onChange={onToggleNotificationSounds} value='notificationSounds' />}
				labelPlacement='start'
				label={intl.formatMessage({
					id             : 'settings.notificationSounds',
					defaultMessage : 'Notification sounds'
				})}
			/>
			{ !config.lockLastN &&
				<form className={classes.setting} autoComplete='off'>
					<FormControl className={classes.formControl}>
						<Select
							value={settings.lastN || ''}
							onChange={(event) =>
							{
								if (event.target.value)
									roomClient.changeMaxSpotlights(event.target.value);
							}}
							name='Last N'
							autoWidth
							className={classes.selectEmpty}
						>
							{ Array.from(
								{ length: config.maxLastN || 10 },
								(_, i) => i + 1
							).map((lastN) =>
							{
								return (
									<MenuItem key={lastN} value={lastN}>
										{lastN}
									</MenuItem>
								);
							})}
						</Select>
						<FormHelperText>
							<FormattedMessage
								id='settings.lastn'
								defaultMessage='Number of visible videos'
							/>
						</FormHelperText>
					</FormControl>
				</form>
			}
		</React.Fragment>
	);
};

AdvancedSettings.propTypes =
{
	roomClient                 : PropTypes.any.isRequired,
	settings                   : PropTypes.object.isRequired,
	onToggleAdvancedMode       : PropTypes.func.isRequired,
	onToggleNotificationSounds : PropTypes.func.isRequired,
	classes                    : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
	({
		settings : state.settings
	});

const mapDispatchToProps = {
	onToggleAdvancedMode       : settingsActions.toggleAdvancedMode,
	onToggleNotificationSounds : settingsActions.toggleNotificationSounds
};

export default withRoomContext(connect(
	mapStateToProps,
	mapDispatchToProps,
	null,
	{
		areStatesEqual : (next, prev) =>
		{
			return (
				prev.settings === next.settings
			);
		}
	}
)(withStyles(styles)(AdvancedSettings)));