import React, { useState } from 'react'
import { connect } from 'react-redux'
import { eptMove, eptBringOnTop } from '../../store/actions'

import Draggable from '../draggable/draggable'

import { IPosition, IEpt } from '../../interfaces'
import { eptWidth, eptHeight } from '../../settings'

import ConnectionPoint from '../connectionPoint/connectionPoint'

export interface IEptProps {
	data: IEpt,
	id: string,
	position?: IPosition,
	onMove: Function,
	bringOnTop: Function
};

const emptyEpt = {
	title: 'Undefined',
	type: '',
	inputTypes: [],
};

const Ept = ({id, data=emptyEpt, position={x: 0, y: 0}, onMove=()=>{}, bringOnTop=()=>{}}: IEptProps) => {
	return <Draggable position={ position } onStartDragging={ () => bringOnTop(id) } onMove={ newPosition => onMove(id, newPosition) }>
		<g className="ept">
			<rect className="container" />
			<text className="title">{ data.title }</text>
			{
				data.inputTypes && 
					<ConnectionPoint isInput={ true } position={ {x: eptWidth / 2, y: 0} } types={ data.inputTypes } />
			}
			{
				data.outputType && 
					<ConnectionPoint isInput={ false } position={ {x: eptWidth / 2, y: eptHeight} } types={ data.outputType ? [data.outputType] : null } />
			}
		</g>
	</Draggable>
}

const mapDispatchToProps = dispatch => {
  return {
    onMove: (id: string, position: IPosition) => {
      dispatch(eptMove(id, position))
    },
    bringOnTop: (id: string)  => {
    	dispatch(eptBringOnTop(id))
    }
  }
}

const EptConnected = connect(null, mapDispatchToProps)(Ept)

export default EptConnected;