import React from 'react'

export interface ICanvasProps {
	width: number,
	height: number,
	children?: React.ReactNode
}

const Canvas = ({width, height, children}: ICanvasProps) => {
	return <svg height={ height } width={ width } xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny">
		{children}
	</svg>
}

export default Canvas;