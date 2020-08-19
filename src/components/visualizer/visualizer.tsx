import React from 'react'

import { connect } from 'react-redux'
import { eptAdd, eptRemove } from '../../store/actions'

import { IPosition, IEpt } from '../../interfaces'
import { eptWidth, eptHeight, canvasWidth, canvasHeight } from '../../settings'

import Ept from '../ept/ept'
import Link from '../link/link'


export interface IVisualizerProps {
	epts: Object,
	links: Object,
	eptAdd: Function,
	eptRemove: Function,
};

const eptOrder = ([, ept1], [, ept2]) => ept1.order < ept2.order ? -1 : 1;

const getPosition = (id, epts, isInput): IPosition => {
	if (id === null) {
		// Global input && output
		return isInput ? {x: canvasWidth / 2, y: canvasHeight - 20} : {x: canvasWidth / 2, y: 20};
	}

	let ept = epts[id];
	if (!ept) return {x: 0, y: 0};
	return {x: ept.position.x + eptWidth / 2, y: ept.position.y + (isInput ? 0 : eptHeight)};
};

const Visualizer = ({epts, links, eptAdd, eptRemove}: IVisualizerProps) => {
	return [
		...Object.entries(links)
			.map(([id, link]) =>
				<Link key={ id } id={ id } from={ getPosition(link.from, epts, false) } to={ getPosition(link.to, epts, true) } />
			),
		...Object.entries(epts)
			.sort(eptOrder)
			.map(([id, ept]) =>
				<Ept key={ id } data={ ept } id={ id } position={ ept.position } />
			),
	];
}

const mapStateToProps = state => {
  return {
    epts: state.epts,
    links: state.links,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    eptAdd: (ept: IEpt) => {
      dispatch(eptAdd(ept))
    },
    eptRemove: (id: string) => {
      dispatch(eptRemove(id))
    },
  }
}

const VisualizerConnected = connect(mapStateToProps, mapDispatchToProps)(Visualizer)

export default VisualizerConnected;