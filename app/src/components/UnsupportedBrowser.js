import React from 'react';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import ErrorIcon from '@mui/icons-material/Error';
import Hidden from '@mui/material/Hidden';

const styles = (theme) =>
	({
		dialogPaper :
		{
			width                          : '40vw',
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
			// display       : 'flex',
			// flexDirection : 'column'
		},
		list : {
			backgroundColor : theme.palette.background.paper
		},
		errorAvatar : {
			width  : theme.spacing(20),
			height : theme.spacing(20)
		}
	});

let dense = false;

const supportedBrowsers=[
	{ name: 'Chrome/Chromium', version: '74', vendor: 'Google' },
	{ name: 'Edge', version: '18', vendor: 'Microsoft' },
	{ name: 'Firefox', version: '60', vendor: 'Mozilla' },
	{ name: 'Safari', version: '12', vendor: 'Apple' },
	{ name: 'Opera', version: '62', vendor: '' },
	//	{ name: 'Brave', version: '1.5', vendor: '' },
	//  { name: 'Vivaldi', version: '3', vendor: '' },
	{ name: 'Samsung Internet', version: '11.1.1.52', vendor: '' }
];

const UnsupportedBrowser = ({
	platform,
	webrtcUnavailable,
	classes
}) =>
{
	if (platform !== 'desktop')
		dense = true;

	return (
		<Dialog
			open
			scroll={'body'}
			classes={{
				paper : classes.dialogPaper
			}}
		>
			<DialogTitle id='form-dialog-title'>
				{!webrtcUnavailable &&
				<FormattedMessage
					id='unsupportedBrowser.titleUnsupportedBrowser'
					defaultMessage='Browser not supported'
				/>
				}
				{webrtcUnavailable &&
				<FormattedMessage
					id='unsupportedBrowser.titlewebrtcUnavailable'
					defaultMessage='Required functionality not availble in your browser'
				/>
				}
			</DialogTitle>
			<DialogContent dividers>
				<FormattedMessage
					id='unsupportedBrowser.bodyText'
					defaultMessage='This meeting service requires
						functionality not supported by your browser.
						Please upgrade, switch to a different browser, or
						check your settings. Supported browsers:'
				/>
				<Grid container spacing={2} justify='center' alignItems='center'>
					<Grid item xs={12} md={7}>

						<div className={classes.list}>
							<List dense={dense}>
								{supportedBrowsers.map((browser, index) =>
								{
									const supportedBrowser = `${browser.vendor} ${browser.name}`;
									const supportedVersion = `${browser.version}+`;

									return (
										<ListItem key={index}>
											<ListItemAvatar>
												<Avatar>
													<WebAssetIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={supportedBrowser}
												secondary={supportedVersion}
											/>
										</ListItem>
									);
								})}
							</List>
						</div>
					</Grid>
					<Grid item xs={12} md={5} align='center'>
						<Hidden mdDown>
							<ErrorIcon className={classes.errorAvatar} color='error'/>
						</Hidden>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
};

UnsupportedBrowser.propTypes =
{
	webrtcUnavailable : PropTypes.bool.isRequired,
	platform          : PropTypes.string.isRequired,
	classes           : PropTypes.object.isRequired
};

export default withStyles(styles)(UnsupportedBrowser);
