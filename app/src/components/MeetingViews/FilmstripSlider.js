import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {
	videoBoxesSelector
} from '../../store/selectors';
import { withRoomContext } from '../../RoomContext';
import Me from '../Containers/Me';
import Peer from '../Containers/Peer';
import SpeakerPeer from '../Containers/SpeakerPeer';
import Grid from '@material-ui/core/Grid';
import { Fab } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const PADDING_V = 64;
const FILMSTRING_PADDING_V = 0;
const FILMSTRING_PADDING_H = 10;

const FILL_RATE = 0.95;

const styles = () =>
	({
		root :
		{
			height   : '100%',
			width    : '100%',
			display  : 'grid',
			overflow : 'hidden'
		},
		filmStripDown : {
			gridTemplateColumns : '1fr',
			gridTemplateRows    : '1fr 0.25fr',
			gridTemplateAreas   : `
			"speaker"
			"filmItem"
			`
		},
		filmStripUp : {
			gridTemplateColumns : '1fr',
			gridTemplateRows    : '0.25fr 1fr',
			gridTemplateAreas   : `
			"filmItem"
			"speaker"
			`
		},
		filmStripLeft : {
			gridTemplateColumns : '0.25fr 1fr',
			gridTemplateRows    : '1fr',
			gridTemplateAreas   : `
			"filmItem speaker" 
			`
		},
		filmStripRight : {
			gridTemplateColumns : '1fr 0.25fr',
			gridTemplateRows    : '1fr',
			gridTemplateAreas   : `
			"speaker filmItem"
			`
		},
		speaker :
		{
			display        : 'flex',
			justifyContent : 'center',
			alignItems     : 'center',
			gridArea       : 'speaker'
		},

		filmItem :
		{
			gridArea     : 'filmItem',
			display      : 'flex',
			border       : 'var(--peer-border)',
			'&.selected' :
			{
				borderColor : 'var(--selected-peer-border-color)'
			},
			'&.active' :
			{
				borderColor : 'var(--selected-peer-border-color)'
			}
		},
		ShareScreenItemV :
		{
			display       : 'flex',
			flexDirection : 'column'
		},
		ShareScreenItemH :
		{
			display       : 'flex',
			flexDirection : 'row'
		},
		hiddenToolBar :
		{
			paddingTop : 0,
			transition : 'padding .5s'
		},
		showingToolBar :
		{
			paddingTop : PADDING_V,
			transition : 'padding .5s'
		},
		styledArrow :
		{
			backgroundColor : 'white'
		}
	});

class FilmstripSlider extends React.PureComponent
{
	constructor(props)
	{
		super(props);

		this.resizeTimeout = null;

		this.rootContainer = React.createRef();

		this.activePeerContainer = React.createRef();

		this.filmStripContainer = React.createRef();
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
			aspectRatio,
			mode
		} = this.props;

		const newState = {};

		const root = this.rootContainer.current;

		if (!root)
			return;

		const availableWidth = root.clientWidth;
		const availableHeight = root.clientHeight;
		// Grid is:
		// 4/5 speaker
		// 1/5 filmstrip
		const availableSpeakerHeight = (availableHeight * 0.8) -
			(toolbarsVisible || permanentTopBar ? PADDING_V : 0);
		const availableSpeakerWidth = availableWidth * 0.8;

		const availableFilmstripHeight = availableHeight * 0.2;
		const availableFilmstripWidth = availableWidth * 0.2;

		const speaker = this.activePeerContainer.current;

		if (speaker)
		{

			let speakerWidth;

			let speakerHeight;

			if (mode.includes('up') || mode.includes('down'))
			{
				speakerWidth = availableWidth;

				speakerHeight = speakerWidth / aspectRatio;

				if (this.isSharingCamera(this.getActivePeerId()))
				{
					speakerWidth /= 2.5;
					speakerHeight = speakerWidth / aspectRatio;
				}

				if (speakerHeight > availableSpeakerHeight)
				{
					speakerHeight = availableSpeakerHeight;
					speakerWidth = speakerHeight * aspectRatio;
				}
			}
			else
			{
				speakerHeight = availableSpeakerHeight;

				speakerWidth = speakerHeight * aspectRatio;

				if (this.isSharingCamera(this.getActivePeerId()))
				{
					speakerHeight /= 1.8;
					speakerWidth = speakerHeight * aspectRatio;
				}

				if (speakerWidth > availableSpeakerWidth)
				{
					speakerWidth = availableSpeakerWidth;
					speakerHeight = speakerWidth / aspectRatio;
				}
			}

			newState.speakerWidth = speakerWidth;
			newState.speakerHeight = speakerHeight;
		}

		const filmStrip = this.filmStripContainer.current;

		if (filmStrip)
		{
			let filmStripHeight;

			let filmStripWidth;

			if (mode.includes('up') || mode.includes('down'))
			{
				filmStripHeight = availableFilmstripHeight - FILMSTRING_PADDING_V;

				filmStripWidth = filmStripHeight * aspectRatio;

				if (
					(filmStripWidth * (boxes+1.5)) >
					(availableWidth - FILMSTRING_PADDING_H)
				)
				{
					filmStripWidth = (availableWidth - FILMSTRING_PADDING_H) /
						(boxes + 1.5);
					filmStripHeight = filmStripWidth / aspectRatio;
				}
			}
			else
			{
				filmStripWidth = availableFilmstripWidth - FILMSTRING_PADDING_V;

				filmStripHeight = filmStripWidth / aspectRatio;

				if (
					(filmStripHeight * (boxes+2.5)) >
					(availableHeight - FILMSTRING_PADDING_H)
				)
				{
					filmStripHeight = (availableHeight - FILMSTRING_PADDING_H) / (boxes+2.5);
					filmStripWidth = filmStripHeight * aspectRatio;
				}
			}

			newState.filmStripWidth = filmStripWidth * FILL_RATE;
			newState.filmStripHeight = filmStripHeight * FILL_RATE;
		}

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

			// start timing for event "completion"
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

	handleNextPeer = (e) =>
	{

		e.preventDefault();

		const {
			spotlights,
			peers,
			roomClient
		} = this.props;

		const peerIdList = Object.keys(peers);
		const newSpotlights = [ ...spotlights ];

		if (peerIdList.length > spotlights.length)
		{

			let peerIndex = peerIdList.findIndex(
				(peerElement) => peerElement === spotlights.at(-1));

			peerIndex = (peerIndex + 1) % peerIdList.length;

			newSpotlights.shift();

			newSpotlights.push(peerIdList[peerIndex]);

			roomClient.updateSpotlights(newSpotlights);
		}
	}

	handlePrevPeer = (e) =>
	{

		e.preventDefault();

		const {
			spotlights,
			peers,
			roomClient
		} = this.props;

		const peerIdList = Object.keys(peers);
		const newSpotlights = [ ...spotlights ];

		if (peerIdList.length > spotlights.length)
		{

			let peerIndex = peerIdList.findIndex(
				(peerElement) => peerElement === spotlights[0]);

			peerIndex = (peerIndex || peerIdList.length) - 1;

			newSpotlights.pop();

			newSpotlights.unshift(peerIdList[peerIndex]);
			roomClient.updateSpotlights(newSpotlights);
		}
	}

	render()
	{
		const {
			peers,
			myId,
			advancedMode,
			spotlights,
			toolbarsVisible,
			permanentTopBar,
			hideSelfView,
			classes,
			mode
		} = this.props;

		const peerIdList = Object.keys(peers);

		const activePeerId = this.getActivePeerId();

		const speakerStyle =
		{
			width  : this.state.speakerWidth,
			height : this.state.speakerHeight
		};

		const peerStyle =
		{
			width  : this.state.filmStripWidth,
			height : this.state.filmStripHeight
		};

		let template;

		let shareScreenItem;

		let gridDirection;

		switch (mode)
		{
			case 'filmstripup':
				template = classes.filmStripUp;
				shareScreenItem = classes.ShareScreenItemH;
				gridDirection = 'row';
				break;
			case 'filmstripleft':
				template = classes.filmStripLeft;
				shareScreenItem = classes.ShareScreenItemV;
				gridDirection = 'column';
				break;
			case 'filmstripright':
				template = classes.filmStripRight;
				shareScreenItem = classes.ShareScreenItemV;
				gridDirection = 'column';
				break;
			default :
				template = classes.filmStripDown;
				shareScreenItem = classes.ShareScreenItemH;
				gridDirection = 'row';
				break;
		}

		return (
			<div
				className={classnames(
					classes.root, template,
					toolbarsVisible || permanentTopBar ?
						classes.showingToolBar : classes.hiddenToolBar
				)}
				ref={this.rootContainer}
			>
				<div className={classnames(classes.speaker, shareScreenItem)}
					ref={this.activePeerContainer}
				>
					{ peers[activePeerId] &&
						<SpeakerPeer
							advancedMode={advancedMode}
							id={activePeerId}
							style={speakerStyle}
						/>
					}
				</div>
				<div
					className={classnames(classes.filmItem)}
					ref={this.filmStripContainer}
				>
					<Grid direction={gridDirection} wrap='nowrap' container alignItems='center' justify='center' spacing={2}>
						<Grid item>
							<div
								className={classnames(shareScreenItem, {
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
						</Grid>
						{
							peerIdList.length > spotlights.length &&
							<Fab size='medium' onClick={(event) => this.handlePrevPeer(event)}>
								{
									gridDirection === 'row' ? (
										<KeyboardArrowLeftIcon/>
									) : (
										<KeyboardArrowUpIcon/>
									)
								}
							</Fab>
						}
						{
							spotlights.length > 0 ? (
								spotlights.map((peerId) =>
								{
									return (
										<Grid key={peerId} item>
											<div
												key={peerId}
												className={classnames(shareScreenItem, {
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
										</Grid>
									)
								})
							) : ('')
						}
						{
							peerIdList.length > spotlights.length &&
							<Fab size='medium' onClick={(event) => this.handleNextPeer(event)}>
								{
									gridDirection === 'row' ? (
										<KeyboardArrowRightIcon/>
									) : (
										<KeyboardArrowDownIcon/>
									)
								}
							</Fab>
						}
					</Grid>
				</div>
			</div>
		);
	}
}

FilmstripSlider.propTypes = {
	roomClient      : PropTypes.any.isRequired,
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
	classes         : PropTypes.object.isRequired,
	mode            : PropTypes.string.isRequired
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
		permanentTopBar : state.settings.permanentTopBar,
		mode            : state.room.mode
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
				prev.room.mode === next.room.mode &&
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
)(withStyles(styles)(FilmstripSlider)));