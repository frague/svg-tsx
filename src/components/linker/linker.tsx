import React, { useState } from 'react'

import { IPosition } from '../../interfaces'

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

export interface ILinkerProps {
	position: IPosition,
	onDrop?: (position: IPosition) => void
}

const Linker = ({position}: ILinkerProps) => {
	let [isDragging, setDragging] = useState(false);
	let [offset, setOffset] = useState({x: 0, y: 0});
	let [myPosition, setMyPosition] = useState({x: position.x, y: position.y});

	return <Draggable position={ myPosition } 
		onStartDragging={ event => startDragging(event, setDragging, setOffset) }
		onMove={ delta => setMyPosition({x: myPosition.x + delta.x, y: myPosition.y + delta.y}) }
		onDrop={ () => drop(position, setMyPosition, setDragging) }
		isRelative={ true }
	>
		<circle className="linker"></circle>
		{
			isDragging && 
				<Link from={ {x: position.x-myPosition.x, y: position.y-myPosition.y} } to={ {x: 0, y: 0} } />
		}
	</Draggable>
}

export default Linker;