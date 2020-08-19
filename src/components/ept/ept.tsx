import React, { useState } from 'react'
import { connect } from 'react-redux'
import { eptMove, eptBringOnTop, eptRemove, eptLinksRemove } from '../../store/actions'

import Draggable from '../draggable/draggable'

import { IPosition, IEpt } from '../../interfaces'
import { eptWidth, eptHeight } from '../../settings'

import ConnectionPoint from '../connectionPoint/connectionPoint'

export interface IEptProps {
	data: IEpt,
	id: string,
	position?: IPosition,
	onMove: Function,
	bringOnTop: Function,
	deleteEpt: Function,
	deleteEptLinks: Function,
};

const emptyEpt = {
	title: 'Undefined',
	type: '',
	inputTypes: [],
};

const Ept = ({id, data=emptyEpt, position={x: 0, y: 0}, onMove=()=>{}, bringOnTop, deleteEpt, deleteEptLinks}: IEptProps) => {
	return [
		<Draggable key='ept' position={ position } onStartDragging={ () => bringOnTop(id) } onMove={ newPosition => onMove(id, newPosition) }>
			<g className="ept">
				<rect className="container" />
				<text className="title">{ data.title }</text>
				<text className="action" onClick={ event => {
					deleteEptLinks(id);
					deleteEpt(id)}
				}>&times;</text>
			</g>
		</Draggable>,
		data.inputTypes && 
			<ConnectionPoint key='in' isInput={ true } position={ {x: position.x + eptWidth / 2, y: position.y} }
				types={ data.inputTypes } payload={ id } />,
		data.outputType && 
			<ConnectionPoint key='out' isInput={ false } isMultiple={ true }
				position={ {x: position.x + eptWidth / 2, y: position.y + eptHeight} } types={ data.outputType ? [data.outputType] : null } 
				payload={ id } />
	]
}

const mapDispatchToProps = dispatch => {
  return {
    onMove: (id: string, position: IPosition) => {
      dispatch(eptMove(id, position))
    },
    bringOnTop: (id: string)  => {
    	dispatch(eptBringOnTop(id))
    },
    deleteEpt: (id: string) => {
    	dispatch(eptRemove(id))
    },
    deleteEptLinks: (id: string) => {
    	dispatch(eptLinksRemove(id))
    }
  }
}

const EptConnected = connect(null, mapDispatchToProps)(Ept)

export default EptConnected;