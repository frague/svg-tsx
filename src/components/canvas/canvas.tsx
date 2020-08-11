import React from 'react'

export interface ICanvasProps {
	width: number,
	height: number,
	children?: React.ReactNode
}

const Canvas = ({width, height, children}: ICanvasProps) => {
	return <svg height={ height } width={ width } viewBox={ `0 0 ${width} ${height}` } 
		xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="full">
		<defs>
			<path id="arrow" d="M5,0 0,2.5 5,5 3.5,3 3.5,2z"></path>
			<marker id="arrow-marker" markerHeight="5" markerWidth="5" orient="auto" refX="2.5" refY="2.5">
				<use href="#arrow"></use>
			</marker>
		</defs>
		{children}
	</svg>
}

export default Canvas;