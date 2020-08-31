import React from 'react'
import { connect } from 'react-redux'

import ConnectionPoint from '../connectionPoint/connectionPoint'
import { IPosition } from '../../interfaces'

export interface IApplicationPointProps {
	data: any,
}

const ApplicationPoint = ({data}: IApplicationPointProps) => {
	return [
		<ConnectionPoint key='cp' isInput={ false } position={ data.position }
			types={ data.outputTypes } payload={ '' } isMultiple={ true }
			isAnyAccepted={ true } />,
		<text key='label' x={ data.position.x + 15 } y={ data.position.y - 3 }>Application Point(s)</text>
	]
}

export default ApplicationPoint;