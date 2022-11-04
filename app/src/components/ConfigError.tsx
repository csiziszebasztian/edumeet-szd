import React from 'react'; // eslint-disable-line no-use-before-define
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button';

const styles = () =>
	({
		error : {
			color : 'red'
		}
	});

const ConfigError = ({
	classes,
	configError
}: {
	classes : any;
	configError : string;
}) =>
{
	return (
		<Dialog
			open
			scroll={'body'}
			classes={{
				paper : classes.dialogPaper
			}}
		>
			<DialogTitle id='form-dialog-title'>
				<ErrorIcon className={classes.errorAvatar} color='error'/>
				<FormattedMessage
					id='configError.title'
					defaultMessage='Configuration error'
				/>
			</DialogTitle>
			<DialogContent dividers>
				<FormattedMessage
					id='configError.bodyText'
					defaultMessage='The Edumeet configuration contains errors:'
				/>
				<Grid container spacing={2} alignItems='center'>
					<Grid item>
						<p className={classes.error}>{configError}</p>
					</Grid>
					<Button size='small' onClick={(e) =>
					{
						e.preventDefault();
						window.location.href = '/?config=true';
					}}
					>
						<FormattedMessage
							id='configError.link'
							defaultMessage='See the configuration documentation'
						/>
					</Button>
				</Grid>
			</DialogContent>
		</Dialog>
	);
};

ConfigError.propTypes =
{
	classes     : PropTypes.object.isRequired,
	configError : PropTypes.string.isRequired
};

export default withStyles(styles)(ConfigError);
