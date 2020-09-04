import React from 'react'
import {observer} from 'mobx-react'
import {useStore} from '../store/useStore'
import {eptWidth, eptHeight, canvasWidth, canvasHeight} from '../settings'
import Ept from './ept'
import Link from './link'
import ApplicationPoint from './applicationPoint'

const eptOrder = ([, ept1], [, ept2]) => ept1.order < ept2.order ? -1 : 1;

const getPosition = (id, epts, isInput) => {
	let ept = epts[id];

	if (!id && ept) {
		// Application Point
		return ept.position;
	}

	if (!ept) return {x: 0, y: 0};
	return {x: ept.position.x + eptWidth / 2, y: ept.position.y + (isInput ? 0 : eptHeight)};
};

const Visualizer = observer((props) => {
	const store = useStore();
	let {epts, links} = store.activeEpt;
	
	return [
		...Object.entries(links)
			.map(([id, link]) =>
				<Link key={id} id={id} from={getPosition(link.from, epts, false)} 
					to={getPosition(link.to, epts, true)} />
			),
		...Object.entries(epts)
			.sort(eptOrder)
			.map(([id, data]) =>
				id ?
					<Ept key={id} data={data} id={id} /> :
					<ApplicationPoint key="ap" data={data} />
			),
	];
})

export default Visualizer;