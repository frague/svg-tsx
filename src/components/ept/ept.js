import React from 'react'
// import { connect } from 'react-redux'
// import { eptMove, eptBringOnTop, eptRemove, eptLinksRemove } from '../../store/actions'

import Draggable from '../draggable/draggable'

// import { IPosition, IEpt } from '../../interfaces'
import {eptWidth, eptHeight, canvasWidth, canvasHeight} from '../../settings'
import {className} from '../../utils'

import ConnectionPoint from '../connectionPoint/connectionPoint'

// export interface IEptProps {
// 	data: IEpt;
// 	id: string;
// 	onMove: Function;
// 	bringOnTop: Function;
// 	deleteEpt: Function,
// 	deleteEptLinks: Function;
// };

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

class Ept extends React.Component {
	render() {
		const {id, data=emptyEpt, onMove=()=>{}, bringOnTop, deleteEpt, deleteEptLinks} = this.props;

		let isStandalone = !id;
		let position = data.position;

		let inPosition = isStandalone ?
			{x: canvasWidth / 2, y: canvasHeight - 20} :
			{x: position.x + eptWidth / 2, y: position.y};

		let outPosition = isStandalone ?
			{x: canvasWidth / 2, y: 20} :
			{x: position.x + eptWidth / 2, y: position.y + eptHeight};

		let classes = {
			ept: true,
			incomplete: !data.isComplete
		};

		return [
			!isStandalone &&
				<Draggable key='ept' position={position} onStartDragging={() => bringOnTop(id)}
					onMove={newPosition => onMove(id, newPosition)}>
					<g className={className(classes)}>
						<rect className="container" />
						<text className="title">{ data.title}</text>
						<text className="action" onClick={event => {
							deleteEptLinks(id);
							deleteEpt(id)}
						}>&times;</text>
					</g>
				</Draggable>,
			(!isStandalone && (data.inputTypes || data.inputIsFlexible)) &&
				<ConnectionPoint key='in' isInput={true} position={inPosition}
				 	types={data.inputTypes} payload={id} isMultiple={isStandalone}
					isAnyAccepted={data.inputIsFlexible} />,
			(data.outputTypes || data.outputIsFlexible) &&
				<ConnectionPoint key='out' isInput={false} isMultiple={true}
					position={outPosition} types={data.outputTypes}
					payload={id} isAnyAccepted={data.outputIsFlexible} />
		]
	}
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onMove: (id, position) => {
//       	dispatch(eptMove(id, position))
//     },
//     bringOnTop: (id)  => {
//     	dispatch(eptBringOnTop(id))
//     },
//     deleteEpt: (id) => {
//     	dispatch(eptRemove(id))
//     },
//     deleteEptLinks: (id) => {
//     	dispatch(eptLinksRemove(id))
//     }
//   }
// }

// const EptConnected = connect(null, mapDispatchToProps)(Ept)

export default Ept;