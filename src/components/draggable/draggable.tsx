import React, { useState, useEffect } from 'react'
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
	let [initialOffset, setInitialOffset] = useState({x: 0, y: 0});

	useEffect(() => {
		if (isDragging) {
			let offset: IPosition = {x: mousePosition.x - previousPosition.x, y: mousePosition.y - previousPosition.y};
			if (offset.x || offset.y) {
				if (isRelative) {
					onMove({x: position.x + offset.x, y: position.y + offset.y});
				} else {
					onMove({x: mousePosition.x - initialOffset.x, y: mousePosition.y - initialOffset.y});
				}
				setPreviousPosition(mousePosition);
			}
		}
	});

	let {x, y} = position;

	return <g className={ 'draggable' + (isDragging ? ' drag' : '') }
		transform={ `translate(${x},${y})` }
		onMouseDown={ event => {
			event.stopPropagation();
			setDragging(true);
			onStartDragging(event);
			
			let clickPosition = {x: event.clientX, y: event.clientY};
			setMousePosition(clickPosition);
			setInitialOffset({x: clickPosition.x - position.x, y: clickPosition.y - position.y});
			setPreviousPosition(clickPosition);

			let canvas = document.getElementById('canvas');
			canvas.onmousemove = event => {
				event.preventDefault();
				setMousePosition({x: event.clientX, y: event.clientY});
			}
			canvas.onmouseup = event => {
				canvas.onmouseup = undefined;
				canvas.onmousemove = undefined;

				setDragging(false);
				onDrop();
			}
		}}
	>{ children }</g>
};

export default Draggable;