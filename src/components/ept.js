import React, { useState } from 'react'
import {observer} from 'mobx-react'
import {useStore} from '../store/useStore'

import Draggable from './draggable'

import {eptWidth, eptHeight, canvasWidth, canvasHeight} from '../settings'
import cx from 'classnames'

import ConnectionPoint from './connectionPoint'

const emptyEpt = {
	title: 'Undefined',
	position: {x: 0, y: 0},
	type: '',
	inputTypes: null,
	outputTypes: null,
	inputIsFlexible: true,
	outputIsFlexible: true,
	epts: {},
	links: {},
	parameters: {},
	isComplete: true
};

const Ept = observer(({id, data}) => {
	let store = useStore();
	let {activeEpt} = store;
	let me = activeEpt.epts[id];

	let isStandalone = !id;
	let position = data.position;

	let inPosition = isStandalone ?
		{x: canvasWidth / 2, y: canvasHeight - 20} :
		{x: position.x + eptWidth / 2, y: position.y};

	let outPosition = isStandalone ?
		{x: canvasWidth / 2, y: 20} :
		{x: position.x + eptWidth / 2, y: position.y + eptHeight};

	let classes = cx({
		ept: true,
		incomplete: !data.isComplete
	});

	return [
		!isStandalone &&
			<Draggable key="ept" position={position} onStartDragging={() => activeEpt.bringEptOnTop(id)}
				onMove={newPosition => me.position = newPosition}>
				<g className={classes}>
					<rect className="container" />
					<text className="title">{data.title}</text>
					<text className="action" onClick={() => activeEpt.removeEpt(id)}>&times;</text>
				</g>
			</Draggable>,
		(!isStandalone && (data.inputTypes || data.inputIsFlexible)) &&
			<ConnectionPoint key="in" isInput={true} position={inPosition} types={data.inputTypes}
				payload={id} isMultiple={isStandalone} isAnyAccepted={data.inputIsFlexible} />,
		(data.outputTypes || data.outputIsFlexible) &&
			<ConnectionPoint key="out" isInput={false} isMultiple={true} position={outPosition}
				types={data.outputTypes} payload={id} isAnyAccepted={data.outputIsFlexible} />
	]
});

export default Ept;