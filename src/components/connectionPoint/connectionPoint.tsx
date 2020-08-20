import React, { useState, useEffect } from 'react'
import { connect, dispatch } from 'react-redux'

import { IPosition } from '../../interfaces'
import { connectionPointRadius, proximity } from '../../settings'
import { className, findIntersection } from '../../utils'
import { 
	connectionCandidateSearch, connectionCandidateRegister, connectionCandidateReset,
	linkAdd, eptSetAcceptedTypes
} from '../../store/actions'

import Draggable from '../draggable/draggable'
import Link from '../link/link'

function startDragging(event: MouseEvent, setDragging: Function, setOffset: Function) {
	setOffset({x: event.clientX, y: event.clientY});
	setDragging(true);
}

export interface IConnectionPointProps {
	position: IPosition;
	isInput: boolean;
	types?: string[];
	isMultiple?: boolean;
	payload: string;
	isAnyAccepted: boolean;
	
	links: any;
	epts: any;
	connectionSearched: any;

	candidateSearch: Function;
	candidateReset: Function;
	candidateRegister: Function;
	addLink: Function;
	eptSetTypes: Function;
}

const ConnectionPoint = ({position, isInput, types=null, isMultiple=false, payload=undefined, isAnyAccepted=false,
	connectionSearched, candidateSearch, candidateReset, candidateRegister, eptSetTypes,
	links, addLink, epts
}: IConnectionPointProps) => {
	let [isDragging, setDragging] = useState(false);
	let [offset, setOffset] = useState({x: 0, y: 0});
	let [myPosition, setMyPosition] = useState({x: position.x, y: position.y});

	let target = {x: position.x - myPosition.x, y: position.y - myPosition.y};

	// Collecting all connected EPTs in order to determine 
	// * if further connections are possible (isMultiple === false)
	// * what are the accepted types if initial type is 'any'
	let connectionsTypes = [];
	let myConnections: string[] = Object.values(links).reduce((result: string[], {from, to}) => {
		if (!isInput && from === payload) {
			result.push(to);
			if (to && epts[to]) connectionsTypes.push(epts[to].inputTypes);
		}
		else if (isInput && to === payload) {
			result.push(from);
			if (from && epts[from]) connectionsTypes.push(epts[from].outputTypes);
		}
		return result;
	}, []) as string[];
	let hasConnections = myConnections.length > 0;

	let isApproached = false;
	if (connectionSearched	// Connection candidate is being searched
		&& isInput !== connectionSearched.isInput	// only connect different types (in-out, out-in)
		&& payload !== connectionSearched.payload	// prevent connection to itself
		&& (isMultiple || !hasConnections)	// not connected or supports multiple connections
		&& !(myConnections as string[]).includes(connectionSearched.payload) // no such connections exist already
	) {
		let typesMatch =
			(isAnyAccepted && !types) || // I support 'any' type with no external typisation OR
			(connectionSearched.isAnyAccepted && !connectionSearched.types) || // searcher supports 'any' type with no external typisation OR
			(types && connectionSearched.types && types.some(type => connectionSearched.types.includes(type))); // acceptable types intersect

		if (typesMatch) {
			// Candidate is in close proximity
			let dx = position.x - connectionSearched.position.x;
			let dy = position.y - connectionSearched.position.y;
			isApproached = (dx || dy) ? Math.sqrt(dx * dx + dy * dy) <= proximity : true;
		}
	}

	let candidate = (connectionSearched || {}).candidate;

	let typesLabel = (types && types.length) ? types.join(', ') : (isAnyAccepted ? 'any' : '');

	useEffect(() => {
		if (isApproached && candidate !== payload) {
			// If connection candidate is searched in close proximity
			// register myself as a connection candidate
			candidateRegister(payload);
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
					isInput ? addLink(candidate, payload) : addLink(payload, candidate);
				}
				// Stop searching for the connection candidate
				candidateReset();
			}
		}

		if (isAnyAccepted) {
			// If point accepts any type it must change its type after connection
			if (hasConnections) {
				let myTypes = findIntersection(connectionsTypes);
				// If there are connections and 
				if (myTypes.join(', ') !== typesLabel) {
					// the set differs from the currently registered - 
					// register it in EPT
					eptSetTypes(payload, myTypes, isInput);
				}
			} else if (types !== null) {
				// If no connections - reset to null to accept all types
				eptSetTypes(payload, null, isInput);
			}
		}
	});

	let classNames = className({
		'connection-point': true,
		'in': isInput,
		'out': !isInput,
		'approached': isApproached,
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
					candidateSearch(isInput, types, mousePosition, payload, isAnyAccepted);
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
}

const mapStateToProps = state => {
  return {
    connectionSearched: state.connectionSearched,
    links: state.links,
    epts: state.epts,
  }
}

const mapDispatchToProps = dispatch => {
	return {
		candidateSearch: (isInput: boolean, types: string[], position: IPosition, payload: string, isAnyAccepted: boolean) => {
			dispatch(connectionCandidateSearch(isInput, types, position, payload, isAnyAccepted))
		},
		candidateReset: () => {
			dispatch(connectionCandidateReset())
		},
		candidateRegister: (candidate) => {
			dispatch(connectionCandidateRegister(candidate))
		},
		addLink: (from: string, to: string) => {
			dispatch(linkAdd(from, to))
		},
		eptSetTypes: (id: string, types: string[]|string, isInput: boolean) => {
			dispatch(eptSetAcceptedTypes(id, types, isInput))
		}
	}
}

const ConnectionPointConnected = connect(mapStateToProps, mapDispatchToProps)(ConnectionPoint)

export default ConnectionPointConnected;