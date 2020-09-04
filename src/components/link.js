import React, {useState} from 'react'
import {useStore} from '../store/useStore'
import {connectionPointRadius} from '../settings'

function calcPath(from, to) {
	let {x, y} = from;
	let dx = to.x - x;
	let dy = to.y - y;
	
	let l = Math.sqrt(dx * dx + dy * dy);
	
	let rx = dx * (l ? connectionPointRadius / l : 1);
	let ry = dy * (l ? connectionPointRadius / l : 1);

	let tx = dx / 8;
	let ty = dy / 3;

	let [sx, sy] = [to.x - 2 * rx, to.y - 2 * ry];

	if (dy < 0) {
		[sx, sy] = [to.x - 2 * rx, to.y + 2 * ry];
		return `M${x + rx},${y - ry}C${x + 6 * tx},${y - 4 * ty},${sx - 6 * tx},${sy + 4 * ty},${sx},${sy}`;
	}

	return `M${x + rx},${y + ry}C${x + tx},${y + ty},${sx - tx},${sy - ty},${sx},${sy}`;
}

const Link = ({id, from, to}) => {
	const store = useStore();

	let hy = (to.y - from.y) / 2;
	return <path className="link" d={calcPath(from, to)}
		onClick={() => store.activeEpt.removeLink(id)}
	></path>
}

export default Link;