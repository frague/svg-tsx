import React, {useState, useEffect} from 'react'

// import {IPosition} from '../../interfaces'
import {connectionPointRadius, proximity} from '../../settings'
import {className, findIntersection} from '../../utils'
// import { 
// 	connectionCandidateSearch, connectionCandidateRegister, connectionCandidateReset,
// 	linkAdd, eptSetAcceptedTypes
// } from '../../store/actions'

import {useStore} from '../../store/useStore'
import {observer} from 'mobx-react'

import Draggable from '../draggable/draggable'
import Link from '../link/link'

function startDragging(event, setDragging, setOffset) {
	setOffset({x: event.clientX, y: event.clientY});
	setDragging(true);
}

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
		} else if (isInput && to === payload) {
			result.push(from);
			if (from && epts[from] && epts[from].outputTypes) {
				connectionsTypes.push(epts[from].outputTypes);
			}
		}
		return result;
	}, []);
	return [foundConnections, connectionsTypes];
}


const ConnectionPoint = observer(({position, isInput, types=null, isMultiple=false, 
	payload=undefined, isAnyAccepted=false}) => {

	const store = useStore();
	let { activeEpt, activeEpt: {epts, links}, connection } = store;

	let [isDragging, setDragging] = useState(false);
	let [offset, setOffset] = useState({x: 0, y: 0});
	let [myPosition, setMyPosition] = useState({x: position.x, y: position.y});

	let target = {x: position.x - myPosition.x, y: position.y - myPosition.y};

	let [myConnections, connectionsTypes] = collectConnections(payload, isInput, links, epts);
	let hasConnections = myConnections.length > 0;

	let isPotentialMatch = false;
	if (connection.isSearched	// Connection candidate is being searched
		&& isInput !== connection.isInput	// only connect different types (in-out, out-in)
		&& payload !== connection.payload	// prevent connection to itself
		&& (isMultiple || !hasConnections)	// not connected or supports multiple connections
		&& !myConnections.includes(connection.payload) // no such connections exist already
	) {
		let typesMatch =
			(isInput && !types && !hasConnections) ||
			(!isInput && !connection.types && !connection.hasConnections) ||
			(!types && !connection.types) || 
			(!types && !payload && !hasConnections) ||
			(!connection.types && !connection.payload && !connection.hasConnections) ||
			(types && connection.types && types.some(type => connection.types.includes(type))); // acceptable types intersect

		if (typesMatch) {
			// Candidate is in close proximity
			let dx = position.x - connection.position.x;
			let dy = position.y - connection.position.y;
			isPotentialMatch = (dx || dy) ? (Math.sqrt(dx * dx + dy * dy) <= proximity) : true;
		}
	}

	let typesLabel = (types && types.length) ? types.join(', ') : (isAnyAccepted ? 'any' : '');

	useEffect(() => {
		let candidate = connection.candidate;
		if (isPotentialMatch && candidate !== payload) {
			// If connection candidate is searched in close proximity
			// register myself as a connection candidate
			connection.registerCandidate(payload);
		} else if (!isPotentialMatch && candidate === payload) {
			// If has already been registered but left later
			// cancel the registration
			connection.registerCandidate(undefined);
		}

		if (!isDragging) {
			// When no linker is dragged, is's position must be preserved
			// the same as the initial one
			setMyPosition(position);

			if (isDragging === null) {
				// Triggers when linker is dropped
				setDragging(false);	// Stops dragging
				setMyPosition({x: position.x, y: position.y}) // Renews own position to the initial state
				if (candidate !== undefined) {
					// If dropped onto the connection candidate, create the link
					// to it in accordance with the isInput
					isInput ? activeEpt.addLink(candidate, payload) : activeEpt.addLink(payload, candidate);
				}
				// Stop searching for the connection candidate
				connection.stopSearching();
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
						activeEpt.setAcceptedTypes(payload, intersectedTypes, isInput);
					}
				} else if (typesLabel !== 'any') {
					// If there are connections but all of them are 'any'
					// reset type to 'any' as well
					activeEpt.setAcceptedTypes(payload, null, isInput);
				}
			} else if (types !== null) {
				// If no connections - reset to null to accept all types
				activeEpt.setAcceptedTypes(payload, null, isInput);
			}
		}
	});

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
			<Draggable key='linker' position={ myPosition } isRelative={ false }
				onStartDragging={ event => startDragging(event, setDragging, setOffset) }
				onMove={ mousePosition => {
					// When linker is being dragged:
					// * update search criteria (including current position)
					connection.startSearching({isInput, types, position: mousePosition, payload, isAnyAccepted, hasConnections});
					// * update linker position according to the mouse
					setMyPosition({x: mousePosition.x, y: mousePosition.y});
				}}
				onDrop={ () => setDragging(null) }
			>
				<circle className="linker"></circle>
			</Draggable>,

			isDragging &&
				// When linker is being dragged a temporary link to in must be shown
				(isInput ? 
					<Link key='link' to={ position } from={ myPosition } /> :
					<Link key='link' from={ position } to={ myPosition } />)

		]
	]
})

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