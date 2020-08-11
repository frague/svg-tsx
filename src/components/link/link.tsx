import React, { useState } from 'react'
import Draggable from '../draggable/draggable'

import { IPosition } from '../../interfaces'

export interface ILinkProps {
	from: IPosition,
	to: IPosition
};

const Link = ({from, to}: ILinkProps) => {
	let hy = (to.y - from.y) / 2;
	return <path className="link" d={ `M${from.x},${from.y}C${from.x},${from.y + hy},${to.x},${to.y - hy},${to.x},${to.y}` } markerEnd="url(#arrow-marker)"></path>
}

export default Link;