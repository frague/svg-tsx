import React from 'react'
import ConnectionPoint from '../connectionPoint/connectionPoint'

class ApplicationPoint extends React.Component {
	render() {
		const {data} = this.props;
		return [
			<ConnectionPoint key='cp' isInput={ false } position={ data.position }
				types={ data.outputTypes } payload={ '' } isMultiple={ true }
				isAnyAccepted={ true } />,
			<text key='label' x={ data.position.x + 15 } y={ data.position.y - 3 }>Application Point</text>
		]
	}
}

export default ApplicationPoint;