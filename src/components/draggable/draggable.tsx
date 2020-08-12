import React, { useState } from 'react'

import { IPosition } from '../../interfaces'

function startDragging(
	event: MouseEvent,
	setDragging: Function,
	setStartedAt: Function) 
{
	event.stopPropagation();
	setDragging(true);
	setStartedAt([event.clientX, event.clientY]);
}

function drag(
	event: MouseEvent,
	startedAt: [number, number],
	setStartedAt: Function,
	position: IPosition,
	onMove: (position: IPosition) => void
) {
	event.preventDefault();
	let offset = [event.clientX - startedAt[0], event.clientY - startedAt[1]];
	if (offset[0] || offset[1]) {
		onMove({x: position.x + offset[0], y: position.y + offset[1]});
		setStartedAt([event.clientX, event.clientY]);
	}
}

export interface IDraggableProps {
  position: IPosition,
  onMove?: (position: IPosition) => void,
  children?: React.ReactNode
}

const Draggable = ({position={x: 0, y: 0}, children, onMove=(position: IPosition)=>{}}: IDraggableProps) => {
	let [isDragging, setDragging] = useState(false);
	let [startedAt, setStartedAt] = useState([0, 0]);

	let {x, y} = position;

	return <g className={ 'draggable ' + (isDragging ? 'drag' : '') }
		transform={ `translate(${x},${y})` }
		onMouseDown={ (event) => startDragging(event, setDragging, setStartedAt) }
		onMouseMove={ (event) => {if (isDragging) drag(event, startedAt, setStartedAt, position, onMove)} }
		onMouseUp={ () => setDragging(false) }
	>{ children }</g>
};

export default Draggable;