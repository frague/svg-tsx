import React, { useState } from 'react'
import { connect } from 'react-redux'

import Draggable from '../draggable/draggable'

import { IPosition, IEpt } from '../../interfaces'

import { eptMove, eptBringOnTop } from '../../store/actions'

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
				data.inputTypes && [
					<circle key="in" className="in" />,
					<text key="in-label" className="in">{ data.inputTypes.join(', ') }</text>
				]
			}
			{
				data.outputType && [
					<circle key="out" className="out" />,
					<text key="out-label" className="out">{ data.outputType }</text>
				]
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