import React, { useState } from 'react'

function startDragging(event, setDragging, setStartedAt) {
	setDragging(true);
	setStartedAt([event.clientX, event.clientY]);
}

function drag(event, startedAt, setOffset) {
	event.preventDefault();
	let result = [event.clientX - startedAt[0], event.clientY - startedAt[1]];
	setOffset(result);
}

function drop(position, offset, setDragging) {
	console.log(`Update position to (${position.x + offset[0]}, ${position.y + offset[1]})`);
	setDragging(false);
}

const Ept = ({title, position, type, inputTypes, outputType=null}) => {
	let [isDragging, setDragging] = useState(false);
	let [offset, setOffset] = useState([0, 0]);
	let [startedAt, setStartedAt] = useState([0, 0]);

	return <g className={ 'ept' + (isDragging ? ' drag' : '') } transform={ `translate(${offset[0] + position.x},${offset[1] + position.y})` }
		onMouseDown={ (event) => startDragging(event, setDragging, setStartedAt) }
		onMouseMove={ (event) => {if (isDragging) drag(event, startedAt, setOffset)} }
		onMouseUp={ () => drop(position, offset, setDragging) } onMouseLeave={ () => setDragging(false) } 
	>
		<g>
			<rect className="container" />
			<text className="title">{ title }</text>
			{
				inputTypes && [
					<circle key="in" className="in" />,
					<text key="in-label" className="in">{ inputTypes.join(', ') }</text>
				]
			}
			{
				outputType && [
					<circle key="out" className="out" />,
					<text key="out-label" className="out">{ outputType }</text>
				]
			}
		</g>
	</g>
}

export default Ept;