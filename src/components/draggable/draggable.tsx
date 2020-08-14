import React, { useState } from 'react'
import { connect } from 'react-redux'

import { IPosition } from '../../interfaces'

export interface IDraggableProps {
	position: IPosition,
	onStartDragging?: Function
	onMove?: (position: IPosition) => void,
	onDrop?: Function,
	isRelative?: boolean,
	children?: React.ReactNode,
}

const Draggable = ({position={x: 0, y: 0}, children, isRelative=false, 
	onStartDragging=()=>{}, onMove=(position: IPosition)=>{}, onDrop=()=>{}}: IDraggableProps) => {
	let [isDragging, setDragging] = useState(false);
	let [mousePosition, setMousePosition] = useState({x: 0, y: 0});
	let [previousPosition, setPreviousPosition] = useState({x: 0, y: 0});

	let {x, y} = position;

	if (isDragging) {
		let offset: IPosition = {x: mousePosition.x - previousPosition.x, y: mousePosition.y - previousPosition.y};
		if (offset.x || offset.y) {
			setTimeout(() => {
				isRelative ? 
					onMove({x: offset.x, y: offset.y}) :
					onMove({x: position.x + offset.x, y: position.y + offset.y});
			}, 0);
			setPreviousPosition(mousePosition);
		}
	}

	return <g className={ 'draggable ' + (isDragging ? 'drag' : '') }
		transform={ `translate(${x},${y})` }
		onMouseDown={ event => {
			event.stopPropagation();
			setDragging(true);
			onStartDragging(event);
			
			setMousePosition({x: event.clientX, y: event.clientY});
			setPreviousPosition({x: event.clientX, y: event.clientY});

			document.getElementById('canvas').onmousemove = event => {
				event.preventDefault();
				setMousePosition({x: event.clientX, y: event.clientY});
			}
		}}
		onMouseUp={ () => {
			document.getElementById('canvas').onmousemove = undefined;

			setDragging(false);
			onDrop();
		}}
	>{ children }</g>
};

export default Draggable;