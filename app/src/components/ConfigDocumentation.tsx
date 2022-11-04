import React from 'react'; // eslint-disable-line no-use-before-define
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { formatDocs } from '../config';

const configDocs = formatDocs();

const styles = () =>
	({
		table : {
			minWidth : 700
		},
		pre : {
			fontSize : '0.8rem'
		},
		cell : {
			maxWidth : '25vw',
			overflow : 'auto'
		}
	});

const ConfigDocumentation = ({
	classes
}: {
	classes : any;
}) =>
{
	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography className={classes.title} variant='h5' component='h2'>
					<FormattedMessage
						id='configDocumentation.title'
						defaultMessage='Edumeet configuration'
					/>
				</Typography>
				<Typography variant='body2' component='div'>
					<TableContainer component={Paper}>
						<Table className={classes.table} size='small' aria-label='Configuration'>
							<TableHead>
								<TableRow>
									<TableCell>Property</TableCell>
									<TableCell align='left'>Description</TableCell>
									<TableCell align='left'>Format</TableCell>
									<TableCell align='left'>Default value</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{Object.entries(configDocs).map(([ name, value ] : [ string, any ]) =>
								{
									return (
										<TableRow key={name}>
											<TableCell component='th' scope='row' className={classes.cell}>{name}</TableCell>
											<TableCell className={classes.cell}>{value.doc}</TableCell>
											<TableCell className={classes.cell}>
												<pre>{value.format}</pre>
											</TableCell>
											<TableCell className={classes.cell}>
												<pre className={classes.pre}>{value.default}</pre>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Typography>
			</CardContent>
			<CardActions>
				<Button size='small' onClick={(e) =>
				{
					e.preventDefault();
					window.location.href = '/';
				}}
				>Home</Button>
			</CardActions>
		</Card>
	);
};

ConfigDocumentation.propTypes =
{
	classes : PropTypes.object.isRequired
};

export default withStyles(styles)(ConfigDocumentation);
