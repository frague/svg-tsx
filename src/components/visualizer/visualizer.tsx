import React from 'react'
import { IPosition } from '../../interfaces'

import Ept, { IEpt } from '../ept/ept'
import Link from '../link/link'

import { eptAdd, eptRemove } from '../../store/actions'
import { connect } from 'react-redux'

export interface IVisualizerProps {
	epts: Object,
	links: Object,
	eptAdd: Function,
	eptRemove: Function,
};

const eptOrder = ([, ept1], [, ept2]) => ept1.order > ept2.order ? -1 : 1;

const getPosition = (id, epts, isInput): IPosition => {
	let ept = epts[id];
	if (!ept) return {x: 0, y: 0};
	return {x: ept.position.x + 75, y: ept.position.y + (isInput ? 0 : 50)};
};

const Visualizer = ({epts, links, eptAdd, eptRemove}: IVisualizerProps) => {
	return [
		...Object.entries(epts)
			.sort(eptOrder)
			.map(([id, ept]) =>
				<Ept key={ id } data={ ept } id={ id } position={ ept.position } />
			),
		...Object.entries(links)
			.map(([id, link]) =>
				<Link key={ id } from={ getPosition(link.from, epts, false) } to={ getPosition(link.to, epts, true) } />
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
    eptAdd: (ept: Object) => {
      dispatch(eptAdd(ept))
    },
    eptRemove: (id: string) => {
      dispatch(eptRemove(id))
    },
  }
}

const VisualizerConnected = connect(mapStateToProps, mapDispatchToProps)(Visualizer)

export default VisualizerConnected;