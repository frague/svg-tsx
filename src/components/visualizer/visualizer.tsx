import React from 'react'

import { connect } from 'react-redux'
import { eptAdd, eptRemove } from '../../store/actions'

import { IPosition, IEpt, ILink } from '../../interfaces'
import { eptWidth, eptHeight, canvasWidth, canvasHeight } from '../../settings'

import Ept from '../ept/ept'
import ApplicationPoint from '../applicationPoint/applicationPoint'
import Link from '../link/link'


export interface IVisualizerProps {
	activeEpt: any,
};

const eptOrder = ([, ept1], [, ept2]) => ept1.order < ept2.order ? -1 : 1;

const getPosition = (id, epts, isInput): IPosition => {
	let ept = epts[id];

	if (!id) {
		// Application Point
		return ept.position;
	}

	if (!ept) return {x: 0, y: 0};
	return {x: ept.position.x + eptWidth / 2, y: ept.position.y + (isInput ? 0 : eptHeight)};
};

const Visualizer = ({activeEpt}: IVisualizerProps) => {
	let { epts, links } = activeEpt;
	return [
		...Object.entries(links)
			.map(([id, link]) =>
				<Link key={ id } id={ id } from={ getPosition((link as ILink).from, epts, false) } to={ getPosition((link as ILink).to, epts, true) } />
			),
		...Object.entries(epts)
			.sort(eptOrder)
			.map(([id, data]) =>
				id ?
					<Ept key={ id } data={ data } id={ id } /> :
					<ApplicationPoint key="ap" data={ data } />
			),
	];
}

const mapStateToProps = state => {
  return {
    activeEpt: state.activeEpt,
  }
}

const VisualizerConnected = connect(mapStateToProps)(Visualizer)

export default VisualizerConnected;