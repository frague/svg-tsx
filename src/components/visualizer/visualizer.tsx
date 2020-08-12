import React from 'react'

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

const Visualizer = ({epts, links, eptAdd, eptRemove}: IVisualizerProps) => {
	return [
		...Object.entries(epts).map(([id, ept]) =>  <Ept key={id} data={ ept } id={ id } position={ ept.position }></Ept>),
		...Object.entries(links).map(([id, link]) =>  <Link key={ id } from={ {x: 10, y: 100} } to={ {x: 300, y: 250} }></Link>),
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