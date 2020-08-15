import React, { useState, useEffect } from 'react'
import { connect, dispatch } from 'react-redux'

import { IPosition } from '../../interfaces'
import { connectionPointRadius, proximity } from '../../settings'
import { connectionCandidateSearch, connectionCandidateRegister, connectionCandidateReset } from '../../store/actions'

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

	connectionCandidate: any,
	candidateSearch: Function,
	candidateReset: Function
}

const ConnectionPoint = ({position, isInput, types=null, isMultiple=false, connectionCandidate, candidateSearch, candidateReset}: IConnectionPointProps) => {
	let [isDragging, setDragging] = useState(false);
	let [offset, setOffset] = useState({x: 0, y: 0});
	let [myPosition, setMyPosition] = useState({x: position.x, y: position.y});

	let target = {x: position.x - myPosition.x, y: position.y - myPosition.y};

	let isApproached = false;
	if (connectionCandidate && isInput !== connectionCandidate.isInput) {
		let typesMatch = types && types.some(type => connectionCandidate.types.includes(type));
		if (typesMatch) {
			let dx = position.x - connectionCandidate.position.x;
			let dy = position.y - connectionCandidate.position.y;
			isApproached = (dx || dy) ? Math.sqrt(dx * dx + dy * dy) <= proximity : true;
		}
	}

	useEffect(() => {
		if (!isDragging) {
			setMyPosition(position);
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
				candidateSearch(isInput, types, delta, 1);
				setMyPosition({x: delta.x, y: delta.y});
			}}
			onDrop={ () => {
				drop(position, setMyPosition, setDragging);
				candidateReset();
			}}
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
    connectionCandidate: state.connectionCandidate,
  }
}

const mapDispatchToProps = dispatch => {
	return {
		candidateSearch: (isInput, types, position, payload) => {
			dispatch(connectionCandidateSearch(isInput, types, position, payload))
		},
		candidateReset: () => {
			dispatch(connectionCandidateReset())
		}
	}
}

const ConnectionPointConnected = connect(mapStateToProps, mapDispatchToProps)(ConnectionPoint)

export default ConnectionPointConnected;