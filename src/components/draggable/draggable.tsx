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
	setOffset: Function)
{
	event.preventDefault();
	setOffset([event.clientX - startedAt[0], event.clientY - startedAt[1]]);
}

function stopDragging(
	setDragging: Function,
	setOffset: Function,
) {
	setDragging(false);
	setOffset([0, 0]);
}

function drop(
	position: IPosition,
	offset: [number, number],
	setDragging: Function,
	setOffset: Function,
	onDrop: Function)
{
	console.log(`Update position to (${position.x + offset[0]}, ${position.y + offset[1]})`);
	onDrop({x: position.x + offset[0], y: position.y + offset[1]});
	stopDragging(setDragging, setOffset);
}

export interface IDraggableProps {
  position: IPosition,
  onDrop?: (position: IPosition) => void,
  children?: React.ReactNode
}

const Draggable = ({position={x: 0, y: 0}, children, onDrop=()=>{}}: IDraggableProps) => {
	let [isDragging, setDragging] = useState(false);
	let [offset, setOffset] = useState([0, 0]);
	let [startedAt, setStartedAt] = useState([0, 0]);

	let {x, y} = position;

	return <g className={ 'draggable ' + (isDragging ? 'drag' : '') }
		transform={ `translate(${offset[0] + x},${offset[1] + y})` }
		onMouseDown={ (event) => startDragging(event, setDragging, setStartedAt) }
		onMouseMove={ (event) => {if (isDragging) drag(event, startedAt, setOffset)} }
		onMouseUp={ () => drop(position, offset, setDragging, setOffset, onDrop) }
	>{ children }</g>
};

export default Draggable;