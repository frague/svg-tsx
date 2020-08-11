import React, { useState } from 'react'
import Draggable from '../draggable/draggable'

import { IPosition } from '../../interfaces'

export interface IEptProps {
	title: string,
	position?: IPosition,
	type: string,
	inputTypes: string[],
	outputType?: string
};

function move(position: IPosition) {
	console.log('Moving to ', position);
}

const Ept = ({title, position={x: 0, y: 0}, type, inputTypes, outputType=null}: IEptProps) => {
	return <Draggable position={ position } onDrop={ move }>
		<g className="ept">
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
	</Draggable>
}

export default Ept;