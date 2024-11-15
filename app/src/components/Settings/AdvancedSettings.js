import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRoomContext } from '../../RoomContext';
import * as settingsActions from '../../store/actions/settingsActions';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useIntl, FormattedMessage } from 'react-intl';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { config } from '../../config';
import TransferList from './TransferList';

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

const FILMSTRIP_SLIDER_MAX_LASTN = 4;
const DEFAULT_MAX_LASTN = 10;

const AdvancedSettings = ({
	roomClient,
	settings,
	onToggleAdvancedMode,
	onToggleNotificationSounds,
	classes,
	mode
}) =>
{
	const intl = useIntl();

	const [ maxLastN, setSetMaxLastN ] = useState(config.maxLastN || DEFAULT_MAX_LASTN);

	useEffect(() =>
	{
		switch (mode)
		{
			case 'filmstripdown':
			case 'filmstripup':
			case 'filmstripright':
			case 'filmstripleft':
				setSetMaxLastN(FILMSTRIP_SLIDER_MAX_LASTN);
				break;
			default:
				setSetMaxLastN(DEFAULT_MAX_LASTN);
				break;
		}
	}, [ mode ]);

	return (
		<React.Fragment>
			<FormControlLabel
				data-testid='advancedMode'
				className={classnames(classes.setting, classes.switchLabel)}
				control={<Switch data-testid='advancedModeSwitch' checked={settings.advancedMode} onChange={onToggleAdvancedMode} value='advancedMode' />}
				labelPlacement='start'
				label={intl.formatMessage({
					id             : 'settings.advancedMode',
					defaultMessage : 'Advanced mode'
				})}
			/>
			<FormControlLabel
				data-testid='notificationSounds'
				className={classnames(classes.setting, classes.switchLabel)}
				control={<Switch data-testid='notificationSoundsSwitch' checked={settings.notificationSounds} onChange={onToggleNotificationSounds} value='notificationSounds' />}
				labelPlacement='start'
				label={intl.formatMessage({
					id             : 'settings.notificationSounds',
					defaultMessage : 'Notification sounds'
				})}
			/>
			{ !config.lockLastN &&
				<form className={classes.setting} autoComplete='off'>
					<FormControl data-testid='lastn' className={classes.formControl}>
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
								{ length: maxLastN },
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
			<TransferList/>
		</React.Fragment>
	);
};

AdvancedSettings.propTypes =
{
	roomClient                 : PropTypes.any.isRequired,
	settings                   : PropTypes.object.isRequired,
	onToggleAdvancedMode       : PropTypes.func.isRequired,
	onToggleNotificationSounds : PropTypes.func.isRequired,
	classes                    : PropTypes.object.isRequired,
	mode                       : PropTypes.string.isRequired
};

const mapStateToProps = (state) =>
	({
		settings : state.settings,
		mode     : state.room.mode
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