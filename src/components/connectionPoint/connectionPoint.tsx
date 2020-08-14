import React, { useState } from 'react'

import { IPosition } from '../../interfaces'
import { connectionPointRadius } from '../../settings'

import Linker from '../linker/linker'

export interface IConnectionPointProps {
	position: IPosition,
	isInput: boolean,
	types?: string[],
	isMultiple?: boolean,
}

const ConnectionPoint = ({position, isInput, types=null, isMultiple=false}: IConnectionPointProps) => {
	return <g className={ 'connection-point ' + (isInput ? 'in' : 'out') }>
		<circle className="placeholder" cx={ position.x } cy={ position.y } radius={ connectionPointRadius } />
		<text key="in-label" className="in">{ types.join(', ') }</text>
		<Linker position={ {x: position.x, y: position.y} } />
	</g>
}

export default ConnectionPoint;