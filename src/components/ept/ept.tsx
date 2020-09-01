import React, { useState } from 'react'
import { connect } from 'react-redux'
import { eptMove, eptBringOnTop, eptRemove, eptLinksRemove } from '../../store/actions'

import Draggable from '../draggable/draggable'

import { IPosition, IEpt } from '../../interfaces'
import { eptWidth, eptHeight, canvasWidth, canvasHeight } from '../../settings'

import ConnectionPoint from '../connectionPoint/connectionPoint'

export interface IEptProps {
	data: IEpt;
	id: string;
	onMove: Function;
	bringOnTop: Function;
	deleteEpt: Function,
	deleteEptLinks: Function;
};

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
	parameters: {}
};

const Ept = ({id, data=emptyEpt, onMove=()=>{}, bringOnTop, deleteEpt, deleteEptLinks}: IEptProps) => {
	let isStandalone = !id;
	let position: IPosition = data.position;

	let inPosition = isStandalone ?
		{x: canvasWidth / 2, y: canvasHeight - 20} :
		{x: position.x + eptWidth / 2, y: position.y};

	let outPosition = isStandalone ?
		{x: canvasWidth / 2, y: 20} :
		{x: position.x + eptWidth / 2, y: position.y + eptHeight};

	return [
		!isStandalone &&
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
		(!isStandalone && (data.inputTypes || data.inputIsFlexible)) &&
			<ConnectionPoint key='in' isInput={ true } position={ inPosition }
				types={ data.inputTypes } payload={ id } isMultiple={ isStandalone }
				isAnyAccepted={ data.inputIsFlexible } />,
		(data.outputTypes || data.outputIsFlexible) &&
			<ConnectionPoint key='out' isInput={ false } isMultiple={ true }
				position={ outPosition } types={ data.outputTypes }
				payload={ id } isAnyAccepted={ data.outputIsFlexible } />
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