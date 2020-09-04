import React from 'react'
import {observer} from 'mobx-react'
import ConnectionPoint from './connectionPoint'

const ApplicationPoint = observer(({data}) => {
	return [
		<ConnectionPoint key="cp" isInput={false} position={data.position}
			types={data.outputTypes} payload={''} isMultiple={true}
			isAnyAccepted={true} />,
		<text key="label" x={data.position.x + 15} y={data.position.y - 3}>Application Point(s)</text>
	]
})

export default ApplicationPoint;