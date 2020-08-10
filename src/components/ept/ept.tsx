import React from 'react'

const Ept = ({title, position, type, inputTypes, outputType=null}) => {

	return <g className="ept" transform={ `translate(${position.x},${position.y})` }>
		<rect className="container" />
		<text className="title">{ title }</text>
		{
			inputTypes && [
				<circle key="in" className="in" />,
				<text key="in-label" className="in">{ inputTypes.join(', ') }</text>
			]
		}
		{
			outputType && [
				<circle key="out" className="out" />,
				<text key="out-label" className="out">{ outputType }</text>
			]
		}
	</g>
}

export default Ept;