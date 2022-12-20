import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { videoBoxesSelector } from '../../store/selectors';
import { withRoomContext } from '../../RoomContext';
import Me from '../Containers/Me';
import Peer from '../Containers/Peer';
import SpeakerPeer from '../Containers/SpeakerPeer';

const PADDING_V = 64;
const ROUND_PADDING_V = 0;
const ROUND_PADDING_H = 10;

const FILL_RATE = 0.95;

const styles = () => ({
	root : {
		height              : '100%',
		width               : '100%',
		display             : 'grid',
		overflow            : 'hidden',
		gridTemplateColumns : 'repeat(4, 1fr)',
		gridTemplateRows    : 'repeat(4, 1fr)',
		gridTemplateAreas   : ` 
		"A B C D"
		"E speaker speaker F"
		"G speaker speaker H"
		"I J K L"
		`
	},
	speaker : {
		gridArea       : 'speaker',
		display        : 'flex',
		justifyContent : 'center',
		alignItems     : 'center'
	},
	RoundItem : {
		display        : 'flex',
		justifyContent : 'center',
		alignItems     : 'center'
		// border       : 'var(--peer-border)',
		/* '&.selected' : {
			borderColor : 'var(--selected-peer-border-color)'
		},
		'&.active' : {
			borderColor : 'var(--selected-peer-border-color)'
		}*/
	},
	hiddenToolBar : {
		paddingTop : 0,
		transition : 'padding .5s'
	},
	showingToolBar : {
		paddingTop : PADDING_V,
		transition : 'padding .5s'
	}
});

class Round extends React.PureComponent
{
	constructor(props)
	{
		super(props);

		this.resizeTimeout = null;

		this.rootContainer = React.createRef();

		this.activePeerContainer = React.createRef();

		// this.ROUNDContainer = React.createRef();
	}

	state = {
		lastSpeaker : null
	};

	// Find the name of the peer which is currently speaking. This is either
	// the latest active speaker, or the manually selected peer, or, if no
	// person has spoken yet, the first peer in the list of peers.
	getActivePeerId = () =>
	{
		const {
			selectedPeerId,
			peers
		} = this.props;

		const { lastSpeaker } = this.state;

		if (selectedPeerId && peers[selectedPeerId])
		{
			return this.props.selectedPeerId;
		}

		if (lastSpeaker && peers[lastSpeaker])
		{
			return this.state.lastSpeaker;
		}

		const peerIds = Object.keys(peers);

		if (peerIds.length > 0)
		{
			return peerIds[0];
		}
	};

	isSharingCamera = (peerId) => this.props.peers[peerId] &&
		this.props.peers[peerId].consumers.some((consumer) =>
			this.props.consumers[consumer].source === 'screen');

	updateDimensions = () =>
	{
		const {
			toolbarsVisible,
			permanentTopBar,
			boxes,
			aspectRatio
		} = this.props;

		const newState = {};

		const root = this.rootContainer.current;

		if (!root)
			return;

		const availableWidth = root.clientWidth;

		const availableHeight = root.clientHeight;

		const speaker = this.activePeerContainer.current;

		const availableSpeakerHeight = (root.clientHeight * 0.4) -
		(toolbarsVisible || permanentTopBar ? ROUND_PADDING_V : 0);

		if (speaker)
		{
			let speakerWidth = availableWidth;

			let speakerHeight = speakerWidth / aspectRatio;

			if (this.isSharingCamera(this.getActivePeerId()))
			{
				speakerWidth /= 2;
				speakerHeight = speakerWidth / aspectRatio;
			}

			if (speakerHeight > availableSpeakerHeight)
			{
				speakerHeight = availableSpeakerHeight;
				speakerWidth = speakerHeight * aspectRatio;
			}

			newState.speakerWidth = speakerWidth;
			newState.speakerHeight = speakerHeight;

		}

		let ROUNDHeight = availableHeight - ROUND_PADDING_V;

		let ROUNDWidth = ROUNDHeight * aspectRatio;

		if (
			(ROUNDWidth * boxes) >
			(availableWidth - ROUND_PADDING_H)
		)
		{
			ROUNDWidth = (availableWidth - ROUND_PADDING_H) /
				boxes;
			ROUNDHeight = ROUNDWidth / aspectRatio;
		}

		newState.ROUNDWidth = ROUNDWidth * FILL_RATE;
		newState.ROUNDHeight = ROUNDHeight * FILL_RATE;

		this.setState({
			...newState
		});
	};

	componentDidMount()
	{
		// window.resize event listener
		window.addEventListener('resize', () =>
		{
			// clear the timeout
			clearTimeout(this.resizeTimeout);

			// start timing for event 'completion'
			this.resizeTimeout = setTimeout(() => this.updateDimensions(), 250);
		});

		this.updateDimensions();
	}

	componentWillUnmount()
	{
		window.removeEventListener('resize', this.updateDimensions);
	}

	componentDidUpdate(prevProps)
	{
		if (prevProps !== this.props)
		{
			if (
				this.props.activeSpeakerId != null &&
				this.props.activeSpeakerId !== this.props.myId
			)
			{
				// eslint-disable-next-line react/no-did-update-set-state
				this.setState({
					lastSpeaker : this.props.activeSpeakerId
				});
			}

			this.updateDimensions();
		}
	}

	render()
	{
		const {
			// roomClient,
			peers,
			myId,
			advancedMode,
			spotlights,
			toolbarsVisible,
			permanentTopBar,
			hideSelfView,
			classes
		} = this.props;

		const activePeerId = this.getActivePeerId();

		// const positionNumber = hideSelfView ? 0 : 1;

		/* const gridAreas= [
			'1 / 1 / 2 / 2',
			'1 / 2 / 2 / 3',
			'1 / 3 / 2 / 4',
			'1 / 4 / 2 / 5',
			'2 / 4 / 3 / 5',
			'3 / 4 / 4 / 5',
			'4 / 4 / 5 / 5',
			'4 / 3 / 5 / 4',
			'4 / 2 / 5 / 3',
			'4 / 1 / 5 / 2',
			'3 / 1 / 4 / 2',
			'2 / 1 / 3 / 2'
		];*/

		// let index = 0;

		const speakerStyle =
		{
			width  : this.state.speakerWidth,
			height : this.state.speakerHeight
		};

		const peerStyle =
		{
			width  : this.state.ROUNDWidth,
			height : this.state.ROUNDHeigh
		};

		return (
			<div
				className={classnames(
					classes.root,
					toolbarsVisible || permanentTopBar ?
						classes.showingToolBar : classes.hiddenToolBar
				)}
				ref={this.rootContainer}
			>
				<div className={classes.speaker} ref={this.activePeerContainer}>
					{ peers[activePeerId] &&
						<SpeakerPeer
							advancedMode={advancedMode}
							id={activePeerId}
							style={speakerStyle}
						/>
					}
				</div>

				<div
					className={classnames(classes.RoundItem, {
						active : myId === activePeerId
					})}
				>
					{ !hideSelfView &&
						<Me
							advancedMode={advancedMode}
							style={peerStyle}
							smallContainer
						/>
					}
				</div>

				{ Object.keys(peers).map((peerId) =>
				{

					if (spotlights.find((spotlightsElement) => spotlightsElement === peerId))
					{
						/* peerStyle.gridArea = gridAreas[index];

						index++;*/

						return (
							<div
								key={peerId}
								// onClick={() => roomClient.setSelectedPeer(peerId)}
								className={classnames(classes.RoundItem, {
									selected : this.props.selectedPeerId === peerId,
									active   : peerId === activePeerId
								})}
							>
								<Peer
									advancedMode={advancedMode}
									id={peerId}
									style={peerStyle}
									smallContainer
								/>
							</div>
						);
					}
					else
					{
						return ('');
					}
				})}
			</div>
		);

		/* return (
			<div
				className={classnames(
					classes.root,
					toolbarsVisible || permanentTopBar ?
						classes.showingToolBar : classes.hiddenToolBar
				)}
				ref={this.rootContainer}
			>
				<div className={classes.speaker} ref={this.activePeerContainer}>
					<Peer
						style={speakerStyle}
						value={1}
					/>
				</div>
				{ !hideSelfView &&
				<Me
					advancedMode={advancedMode}
					style={mePeer}
					value={2}
				/>
				}
				{ spotlights.map((peer) =>
				{
					const peerStyle =
					{
						width    : this.state.ROUNDWidth,
						height   : this.state.ROUNDHeight,
						gridArea : gridAreas[positionNumber]
					};

					positionNumber++;

					return (
						<Peer
							key={peer}
							advancedMode={advancedMode}
							id={peer}
							style={peerStyle}
							value={positionNumber+1}
						/>
					);
				})}
			</div>
		);*/
	}
}

Round.propTypes = {
	// roomClient      : PropTypes.any.isRequired,
	activeSpeakerId : PropTypes.string,
	advancedMode    : PropTypes.bool,
	peers           : PropTypes.object.isRequired,
	consumers       : PropTypes.object.isRequired,
	myId            : PropTypes.string.isRequired,
	selectedPeerId  : PropTypes.string,
	spotlights      : PropTypes.array.isRequired,
	boxes           : PropTypes.number,
	toolbarsVisible : PropTypes.bool.isRequired,
	hideSelfView    : PropTypes.bool.isRequired,
	toolAreaOpen    : PropTypes.bool.isRequired,
	permanentTopBar : PropTypes.bool.isRequired,
	aspectRatio     : PropTypes.number.isRequired,
	classes         : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
{
	return {
		activeSpeakerId : state.room.activeSpeakerId,
		selectedPeerId  : state.room.selectedPeerId,
		peers           : state.peers,
		consumers       : state.consumers,
		myId            : state.me.id,
		spotlights      : state.room.spotlights,
		boxes           : videoBoxesSelector(state),
		toolbarsVisible : state.room.toolbarsVisible,
		hideSelfView    : state.room.hideSelfView,
		toolAreaOpen    : state.toolarea.toolAreaOpen,
		aspectRatio     : state.settings.aspectRatio,
		permanentTopBar : state.settings.permanentTopBar
	};
};

export default withRoomContext(connect(
	mapStateToProps,
	null,
	null,
	{
		areStatesEqual : (next, prev) =>
		{
			return (
				prev.room.activeSpeakerId === next.room.activeSpeakerId &&
				prev.room.selectedPeerId === next.room.selectedPeerId &&
				prev.room.toolbarsVisible === next.room.toolbarsVisible &&
				prev.room.hideSelfView === next.room.hideSelfView &&
				prev.toolarea.toolAreaOpen === next.toolarea.toolAreaOpen &&
				prev.settings.permanentTopBar === next.settings.permanentTopBar &&
				prev.settings.aspectRatio === next.settings.aspectRatio &&
				prev.peers === next.peers &&
				prev.consumers === next.consumers &&
				prev.room.spotlights === next.room.spotlights &&
				prev.me.id === next.me.id
			);
		}
	}
)(withStyles(styles)(Round)));