import React from 'react';
import { withStyles } from '@mui/styles';

const styles = (/* theme */) =>
	({
		root :
		{
			height : '100%',
			width  : '100%'
		}
	});

const LoadingView = ({
	classes
}) =>
{
	return (
		<div className={classes.root} />
	);
};

export default withStyles(styles)(LoadingView);
