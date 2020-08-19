import React, { useState, useEffect } from 'react'
import { connect, dispatch } from 'react-redux'

import { IPosition } from '../../interfaces'
import { connectionPointRadius, proximity } from '../../settings'
import { className, findIntersection } from '../../utils'
import { 
	connectionCandidateSearch, connectionCandidateRegister, connectionCandidateReset,
	linkAdd
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
	
	// Injected from store
	links: any;
	epts: any;
	connectionSearched: any;

	candidateSearch: Function;
	candidateReset: Function;
	candidateRegister: Function;
	addLink: Function;
}

const ConnectionPoint = ({position, isInput, types=null, isMultiple=false, payload=undefined,
	connectionSearched, candidateSearch, candidateReset, candidateRegister, links, addLink, epts
}: IConnectionPointProps) => {
	let [isDragging, setDragging] = useState(false);
	let [offset, setOffset] = useState({x: 0, y: 0});
	let [myPosition, setMyPosition] = useState({x: position.x, y: position.y});
	let [flexibleTypes, setFlexibleTypes] = useState(null);

	let target = {x: position.x - myPosition.x, y: position.y - myPosition.y};

	let isAnyAccepted = types.includes('any');
	
	let acceptedTypes = flexibleTypes || types;

	// Collecting all connected EPTs in order to determine 
	// * if further connections are possible (isMultiple === false)
	// * what are the accepted types if initial type is 'any'
	let connectionsTypes = [];
	let myConnections = Object.values(links).reduce((result: string[], {from, to}) => {
		if (!isInput && from === payload) {
			result.push(to);
			if (to && epts[to]) connectionsTypes.push(epts[to].inputTypes);
		}
		else if (isInput && to === payload) {
			result.push(from);
			if (from && epts[from]) connectionsTypes.push([epts[from].outputType]);
		}
		return result;
	}, []);
	let hasConnections = (myConnections as string[]).length > 0;

	let isApproached = false;
	if (connectionSearched	// Connection candidate is being searched
		&& isInput !== connectionSearched.isInput	// only connect different types (in-out, out-in)
		&& payload !== connectionSearched.payload	// prevent connection to itself
		&& (isMultiple || !hasConnections)	// not connected or supports multiple connections
	) {
		let typesMatch = types && (
			acceptedTypes.includes('any') || connectionSearched.types.includes('any') || // either support 'any' connection
			acceptedTypes.some(type => connectionSearched.types.includes(type)) // or acceptable types intersect
		);
		if (typesMatch) {
			// Candidate is in close proximity
			let dx = position.x - connectionSearched.position.x;
			let dy = position.y - connectionSearched.position.y;
			isApproached = (dx || dy) ? Math.sqrt(dx * dx + dy * dy) <= proximity : true;
		}
	}

	let candidate = (connectionSearched || {}).candidate;

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
				if (myTypes.join(' ') !== (flexibleTypes || []).join(' ')) {
					setFlexibleTypes(myTypes);
				}
			} else if (flexibleTypes !== null) {
				// ... or reset back after disconnection
				setFlexibleTypes(null);
			}
		}
	});

	let classNames = className({
		'connection-point': true,
		'in': isInput,
		'out': !isInput,
		'approached': isApproached
	});

	return [
		<g key='connection-point' transform={ `translate(${position.x},${position.y})` } className={ classNames }>
			<circle radius={ connectionPointRadius } />
			<text>{ acceptedTypes.join(', ') }</text>
		</g>,

		(isMultiple || !hasConnections) && [
			// Don't show dragger for single-connection points already connected
			<Draggable key='linker' position={ myPosition } isRelative={ false }
				onStartDragging={ event => startDragging(event, setDragging, setOffset) }
				onMove={ mousePosition => {
					// When linker is being dragged:
					// * update search criteria (including current position)
					candidateSearch(isInput, acceptedTypes, mousePosition, payload);
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
		candidateSearch: (isInput: boolean, types: string[], position: IPosition, payload: string) => {
			dispatch(connectionCandidateSearch(isInput, types, position, payload))
		},
		candidateReset: () => {
			dispatch(connectionCandidateReset())
		},
		candidateRegister: (candidate) => {
			dispatch(connectionCandidateRegister(candidate))
		},
		addLink: (from: string, to: string) => {
			dispatch(linkAdd(from, to))
		}
	}
}

const ConnectionPointConnected = connect(mapStateToProps, mapDispatchToProps)(ConnectionPoint)

export default ConnectionPointConnected;