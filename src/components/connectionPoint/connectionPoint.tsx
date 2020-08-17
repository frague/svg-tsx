import React, { useState, useEffect } from 'react'
import { connect, dispatch } from 'react-redux'

import { IPosition } from '../../interfaces'
import { connectionPointRadius, proximity } from '../../settings'
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

function drop(position: IPosition, setMyPosition: Function, setDragging: Function) {
	setMyPosition({x: position.x, y: position.y})
	setDragging(false);
}

export interface IConnectionPointProps {
	position: IPosition,
	isInput: boolean,
	types?: string[],
	isMultiple?: boolean,
	payload: string,

	connectionCandidate: any,
	candidateSearch: Function,
	candidateReset: Function
	candidateRegisteer: Function
	addLink: Function
}

const ConnectionPoint = ({position, isInput, types=null, isMultiple=false, payload=undefined,
	connectionSearched, candidateSearch, candidateReset, candidateRegister, addLink
}: IConnectionPointProps) => {
	let [isDragging, setDragging] = useState(false);
	let [offset, setOffset] = useState({x: 0, y: 0});
	let [myPosition, setMyPosition] = useState({x: position.x, y: position.y});

	let target = {x: position.x - myPosition.x, y: position.y - myPosition.y};

	let isApproached = false;
	if (connectionSearched && isInput !== connectionSearched.isInput && payload !== connectionSearched.payload) {
		let typesMatch = types && (
			types.includes('any') ||
			types.some(type => connectionSearched.types.includes(type))
		);
		if (typesMatch) {
			let dx = position.x - connectionSearched.position.x;
			let dy = position.y - connectionSearched.position.y;
			isApproached = (dx || dy) ? Math.sqrt(dx * dx + dy * dy) <= proximity : true;
		}
	}

	let candidate = (connectionSearched || {}).candidate;

	useEffect(() => {
		if (isApproached && candidate !== payload) {
			candidateRegister(payload);
		}

		if (!isDragging) {
			setMyPosition(position);

			if (isDragging === null) {
				setDragging(false);
				setMyPosition({x: position.x, y: position.y})
				if (candidate !== undefined) {
					isInput ? addLink(candidate, payload) : addLink(payload, candidate);
				}
				candidateReset();
			}
		}
	});

	return [
		<g key='connection-point' transform={ `translate(${position.x},${position.y})` }
			className={ 'connection-point ' + (isInput ? 'in' : 'out') + (isApproached ? ' approached' : '') }>
			<circle radius={ connectionPointRadius } />
			<text>{ types.join(', ') }</text>
		</g>,

		<Draggable key='linker' position={ myPosition } isRelative={ false }
			onStartDragging={ event => startDragging(event, setDragging, setOffset) }
			onMove={ delta => {
				candidateSearch(isInput, types, delta, payload);
				setMyPosition({x: delta.x, y: delta.y});
			}}
			onDrop={ () => setDragging(null) }
		>
			<circle className="linker"></circle>
		</Draggable>,

		isDragging && 
			(isInput ? 
				<Link key='link' to={ position } from={ myPosition } /> :
				<Link key='link' from={ position } to={ myPosition } />)
	]
}

const mapStateToProps = state => {
  return {
    connectionSearched: state.connectionSearched,
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