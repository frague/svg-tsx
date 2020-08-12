import React, { useState } from 'react'
import Draggable from '../draggable/draggable'

import { IPosition } from '../../interfaces'

export interface ILinkProps {
	from: IPosition,
	to: IPosition
};

const radius = 5;

function calcPath(from: IPosition, to: IPosition) {
	let {x, y} = from;
	let dx = to.x - x;
	let dy = to.y - y;
	
	let l = Math.sqrt(dx * dx + dy * dy);
	
	let rx = dx * (l ? radius / l : 1);
	let ry = dy * (l ? radius / l : 1);

	let tx = dx / 8;
	let ty = dy / 3;

	let [sx, sy] = [to.x - 2 * rx, to.y - 2 * ry];

	if (dy < 0) {
		[sx, sy] = [to.x - 2 * rx, to.y + 2 * ry];
		return `M${x + rx},${y - ry}C${x + 6 * tx},${y - 4 * ty},${sx - 6 * tx},${sy + 4 * ty},${sx},${sy}`;
	}

	return `M${x + rx},${y + ry}C${x + tx},${y + ty},${sx - tx},${sy - ty},${sx},${sy}`;
}

const Link = ({from, to}: ILinkProps) => {
	let hy = (to.y - from.y) / 2;
	return <path className="link" d={ calcPath(from, to) } markerEnd="url(#arrow-marker)"></path>
}

export default Link;