import React from 'react'

import {connectionPointRadius, proximity} from '../../settings'
import {className, findIntersection} from '../../utils'
// import { 
// 	connectionCandidateSearch, connectionCandidateRegister, connectionCandidateReset,
// 	linkAdd, eptSetAcceptedTypes
// } from '../../store/actions'
import activeEpt from '../../store/store'

import Draggable from '../draggable/draggable'
import Link from '../link/link'

function collectConnections(payload, isInput, links, epts) {
	// Collecting all connected EPTs in order to determine 
	// * if further connections are possible (isMultiple === false)
	// * what are the accepted types if initial type is 'any'
	let connectionsTypes = [];
	let foundConnections = Object.values(links).reduce((result, {from, to}) => {
		if (!isInput && from === payload) {
			result.push(to);
			if (to && epts[to] && epts[to].inputTypes) {
				connectionsTypes.push(epts[to].inputTypes);
			}
		}
		else if (isInput && to === payload) {
			result.push(from);
			if (from && epts[from] && epts[from].outputTypes) {
				connectionsTypes.push(epts[from].outputTypes);
			}
		}
		return result;
	}, []);
	return [foundConnections, connectionsTypes];
}

// export interface IConnectionPointProps {
// 	position: IPosition;
// 	isInput: boolean;
// 	types?: string[];
// 	isMultiple?: boolean;
// 	payload: string;
// 	isAnyAccepted: boolean;
	
// 	activeEpt: any;
// 	connectionSearched: any;

// 	candidateSearch: Function;
// 	candidateReset: Function;
// 	candidateRegister: Function;
// 	addLink: Function;
// 	eptSetTypes: Function;
// }

class ConnectionPoint extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isDragging: false,
			offset: {x: 0, y: 0},
			myPosition: {x: props.position, y: props.position.y}
		};
	}

	componentDidUpdate() {
		if (isPotentialMatch && candidate !== payload) {
			// If connection candidate is searched in close proximity
			// register myself as a connection candidate
			candidateRegister(payload);
		}

		if (!this.state.isDragging) {
			if (this.state.isDragging === null) {
				// Triggers when linker is dropped
				this.setState({
					isDragging: false,	// Stops dragging
					myPosition: {x: position.x, y: position.y} // Renews own position to the initial state
				});

				if (candidate !== undefined) {
					// If dropped onto the connection candidate, create the link
					// to it in accordance with the isInput
					isInput ? addLink(candidate, payload) : addLink(payload, candidate);
				}
				// Stop searching for the connection candidate
				candidateReset();
			} else {
				// When no linker is dragged, is's position must be preserved
				// the same as the initial one
				this.setState({
					myPosition: position
				});
			}
		}

		if (isAnyAccepted && !payload) {
			// If point accepts any type it must change its type after connection
			if (hasConnections) {
				let intersectedTypes = findIntersection(connectionsTypes);
				// If there are connections and 
				if (intersectedTypes) {
					if (intersectedTypes.join(', ') !== typesLabel) {
						// the set differs from the currently registered -
						// register it in EPT
						eptSetTypes(payload, intersectedTypes, isInput);
					}
				} else if (typesLabel !== 'any') {
					// If there are connections but all of them are 'any'
					// reset type to 'any' as well
					eptSetTypes(payload, null, isInput);
				}
			} else if (types !== null) {
				// If no connections - reset to null to accept all types
				eptSetTypes(payload, null, isInput);
			}
		}
	}

	render() {
		let {position, isInput, types=null, isMultiple=false, payload=undefined, isAnyAccepted=false,
		connectionSearched, candidateSearch, candidateReset, candidateRegister, eptSetTypes,
		addLink} = this.props; 
		let { epts, links } = activeEpt;

		let target = {
			x: position.x - this.state.myPosition.x,
			y: position.y - this.state.myPosition.y
		};

		let [myConnections, connectionsTypes] = collectConnections(payload, isInput, links, epts);
		let hasConnections = myConnections.length > 0;

		let isPotentialMatch = false;
		if (connectionSearched	// Connection candidate is being searched
			&& isInput !== connectionSearched.isInput	// only connect different types (in-out, out-in)
			&& payload !== connectionSearched.payload	// prevent connection to itself
			&& (isMultiple || !hasConnections)	// not connected or supports multiple connections
			&& !myConnections.includes(connectionSearched.payload) // no such connections exist already
		) {
			let typesMatch =
				(isInput && !types && !hasConnections) ||
				(!isInput && !connectionSearched.types && !connectionSearched.hasConnections) ||
				(!types && !connectionSearched.types) || 
				(!types && !payload && !hasConnections) ||
				(!connectionSearched.types && !connectionSearched.payload && !connectionSearched.hasConnections) ||
				(types && connectionSearched.types && types.some(type => connectionSearched.types.includes(type))); // acceptable types intersect

			if (typesMatch) {
				// Candidate is in close proximity
				let dx = position.x - connectionSearched.position.x;
				let dy = position.y - connectionSearched.position.y;
				isPotentialMatch = (dx || dy) ? Math.sqrt(dx * dx + dy * dy) <= proximity : true;
			}
		}

		let candidate = (connectionSearched || {}).candidate;

		let typesLabel = (types && types.length) ? types.join(', ') : (isAnyAccepted ? 'any' : '');


		let classNames = className({
			'connection-point': true,
			'in': isInput,
			'out': !isInput,
			'approached': isPotentialMatch,
			'standalone': !payload
		});


		return [
			<g key='connection-point' transform={ `translate(${position.x},${position.y})` } className={ classNames }>
				<circle radius={ connectionPointRadius } />
				<text>{ typesLabel }</text>
			</g>,

			(isMultiple || !hasConnections) && [
				// Don't show dragger for single-connection points already connected
				<Draggable key='linker' position={ this.state.myPosition } isRelative={ false }
					onStartDragging={event => {
						this.setState({
							offset: {x: event.clientX, y: event.clientY}, isDragging: true
						});
					}}
					onMove={mousePosition => {
						// When linker is being dragged:
						// * update search criteria (including current position)
						candidateSearch(isInput, types, mousePosition, payload, isAnyAccepted, hasConnections);
						// * update linker position according to the mouse
						this.setState({
							myPosition: {x: mousePosition.x, y: mousePosition.y}
						});
					}}
					onDrop={ () => this.setState({isDragging: null}) }
				>
					<circle className="linker"></circle>
				</Draggable>,

				this.state.isDragging &&
					// When linker is being dragged a temporary link to in must be shown
					(isInput ? 
						<Link key='link' to={ position } from={ this.state.myPosition } /> :
						<Link key='link' from={ position } to={ this.state.myPosition } />)

			]
		]
	}
}
// const mapStateToProps = state => {
//   return {
//     connectionSearched: state.connectionSearched,
//     activeEpt: state.activeEpt,
//   }
// }

// const mapDispatchToProps = dispatch => {
// 	return {
// 		candidateSearch: (isInput: boolean, types: string[], position: IPosition, 
// 			payload: string, isAnyAccepted: boolean, hasConnections: boolean) => {
// 			dispatch(connectionCandidateSearch(isInput, types, position, payload, isAnyAccepted, hasConnections))
// 		},
// 		candidateReset: () => {
// 			dispatch(connectionCandidateReset())
// 		},
// 		candidateRegister: (candidate) => {
// 			dispatch(connectionCandidateRegister(candidate))
// 		},
// 		addLink: (from: string, to: string) => {
// 			dispatch(linkAdd(from, to))
// 		},
// 		eptSetTypes: (id: string, types: string[]|string, isInput: boolean) => {
// 			dispatch(eptSetAcceptedTypes(id, types, isInput))
// 		}
// 	}
// }

// const ConnectionPointConnected = connect(mapStateToProps, mapDispatchToProps)(ConnectionPoint)

export default ConnectionPoint;