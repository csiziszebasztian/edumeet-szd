import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withRoomContext } from '../../RoomContext';
import { connect } from 'react-redux';

const styles = (theme) =>
	({
		root : {
			margin         : 'auto',
			width          : '100%',
			display        : 'flex',
			justifyContent : 'center'
		},
		cardHeader : {
			padding : theme.spacing(1, 2)
		},
		list : {
			width           : 200,
			height          : 230,
			backgroundColor : theme.palette.background.paper,
			overflow        : 'auto'
		},
		button : {
			margin : theme.spacing(0.5, 0)
		}
	});

function not(a, b)
{
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b)
{
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b)
{
	return [ ...a, ...not(b, a) ];
}

const TransferList = ({
	roomClient,
	peers,
	spotlights,
	classes,
	settings
}) =>
{

	const [ checked, setChecked ] = React.useState([]);

	const [ left, setLeft ] = React.useState([]);

	const [ right, setRight ] = React.useState([]);

	React.useEffect(() =>
	{
		setChecked([]);
		setLeft([ ...Object.keys(peers).filter((peer) =>
		{
			return !spotlights.includes(peer);
		})
		]);
		setRight([ ...spotlights ]);
	}, [ peers, spotlights ]);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value) => () =>
	{
		const currentIndex = checked.indexOf(value);
		const newChecked = [ ...checked ];

		if (currentIndex === -1)
		{
			newChecked.push(value);
		}
		else
		{
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () =>
	{
		if (numberOfChecked(items) === items.length)
		{
			setChecked(not(checked, items));
		}
		else
		{
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () =>
	{
		const newSpotlight = right.concat(leftChecked);

		if (newSpotlight.length <= settings.lastN)
		{
			roomClient.updateSpotlights(newSpotlight);
		}
		else
		{
			roomClient.spotlightsIsFull();
		}
	};

	const handleCheckedLeft = () =>
	{
		const newSpotlight = left.concat(rightChecked);

		roomClient.updateSpotlights(not(spotlights, newSpotlight));
	};

	const customList = (title, items) => (
		<Card>
			<CardHeader
				className={classes.cardHeader}
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={numberOfChecked(items) === items.length && items.length !== 0}
						indeterminate={
							numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
						disabled={items.length === 0}
						inputProps={{ 'aria-label': 'all items selected' }}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} selected`}
			/>
			<Divider />
			<List className={classes.list} dense component='div' role='list'>
				{items.map((value) =>
				{
					if (peers[value] !== undefined)
					{

						const labelId = `transfer-list-all-item-${value}-label`;

						return (
							<ListItem key={value} role='listitem' button onClick={handleToggle(value)}>
								<ListItemIcon>
									<Checkbox
										checked={checked.indexOf(value) !== -1}
										tabIndex={-1}
										disableRipple
										inputProps={{ 'aria-labelledby': labelId }}
									/>
								</ListItemIcon>
								<ListItemText id={labelId} primary={peers[value].displayName} />
							</ListItem>
						);
					}
				})}
				<ListItem />
			</List>
		</Card>
	);

	return (
		<Grid
			container
			spacing={2}
			justifyContent='center'
			alignItems='center'
			className={classes.root}
		>
			<Grid item>{customList('Participants', left)}</Grid>
			<Grid item>
				<Grid container direction='column' alignItems='center'>
					<Button
						variant='outlined'
						size='small'
						className={classes.button}
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0}
						aria-label='move selected right'
					>
						&gt;
					</Button>
					<Button
						variant='outlined'
						size='small'
						className={classes.button}
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label='move selected left'
					>
						&lt;
					</Button>
				</Grid>
			</Grid>
			<Grid item>{customList('Spotlight', right)}</Grid>
		</Grid>
	);
};

TransferList.propTypes =
{
	roomClient : PropTypes.any.isRequired,
	peers      : PropTypes.object.isRequired,
	spotlights : PropTypes.array.isRequired,
	classes    : PropTypes.object.isRequired,
	settings   : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
	({
		peers      : state.peers,
		spotlights : state.room.spotlights,
		settings   : state.settings
	});

export default withRoomContext(connect(
	mapStateToProps,
	null,
	null,
	{
		areStatesEqual : (next, prev) =>
		{
			return (
				prev.peers === next.peers &&
				prev.room.spotlights === next.room.spotlights
			);
		}
	}
)(withStyles(styles)(TransferList)));