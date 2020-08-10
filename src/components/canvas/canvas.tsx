import React from 'react'

const Canvas = (props) => {
	let {width, height, children} = props;
	return <svg height={ height } width={ width } xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny">
		{children}
	</svg>
}

export default Canvas;