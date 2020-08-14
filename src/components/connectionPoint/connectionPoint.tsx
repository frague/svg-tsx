import React, { useState } from 'react'

import { IPosition } from '../../interfaces'
import { connectionPointRadius } from '../../settings'

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
}

const ConnectionPoint = ({position, isInput, types=null, isMultiple=false}: IConnectionPointProps) => {
	let [isDragging, setDragging] = useState(false);
	let [offset, setOffset] = useState({x: 0, y: 0});
	let [myPosition, setMyPosition] = useState({x: position.x, y: position.y});

	let target = {x: position.x - myPosition.x, y: position.y - myPosition.y};

	return <g className={ 'connection-point ' + (isInput ? 'in' : 'out') }>
		<circle className="placeholder" cx={ position.x } cy={ position.y } radius={ connectionPointRadius } />
		<text key="in-label" className="in">{ types.join(', ') }</text>
		<Draggable position={ myPosition } 
			onStartDragging={ event => startDragging(event, setDragging, setOffset) }
			onMove={ delta => setMyPosition({x: myPosition.x + delta.x, y: myPosition.y + delta.y}) }
			onDrop={ () => drop(position, setMyPosition, setDragging) }
			isRelative={ true }
		>
			<circle className="linker"></circle>
			{
				isDragging && 
					(isInput ? 
						<Link to={ target } from={ {x: 0, y: 0} } /> :
						<Link from={ target } to={ {x: 0, y: 0} } />)
			}
		</Draggable>
	</g>
}

export default ConnectionPoint;