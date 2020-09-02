import React from 'react'
// import { connect } from 'react-redux'

// import { IPosition } from '../../interfaces'

// export interface IDraggableProps {
// 	position: IPosition,
// 	onStartDragging?: Function
// 	onMove?: (position: IPosition) => void,
// 	onDrop?: Function,
// 	isRelative?: boolean,
// 	children?: React.ReactNode,
// }

class Draggable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isDragging: false,
			mousePosition: {x: 0, y: 0},
			previousPosition: {x: 0, y: 0},
			initialOffset: {x: 0, y: 0}
		};
	}

	render({position={x: 0, y: 0}, children, isRelative=false, 
	onStartDragging=()=>{}, onMove=position=>{}, onDrop=()=>{}}) {
		// let [, setDragging] = useState(false);
		// let [, setMousePosition] = useState();
		// let [, setPreviousPosition] = useState();
		// let [, setInitialOffset] = useState();

		// useEffect(() => {
			if (isDragging) {
				let offset = {x: mousePosition.x - previousPosition.x, y: mousePosition.y - previousPosition.y};
				if (offset.x || offset.y) {
					if (isRelative) {
						onMove({x: position.x + offset.x, y: position.y + offset.y});
					} else {
						onMove({x: mousePosition.x - initialOffset.x, y: mousePosition.y - initialOffset.y});
					}
					setPreviousPosition(mousePosition);
				}
			}
		// });

		let {x, y} = position;

		return <g className={ 'draggable' + (isDragging ? ' drag' : '') }
			transform={ `translate(${x},${y})` }
			onMouseDown={ event => {
				event.stopPropagation();
				onStartDragging(event);
				
				let clickPosition = {x: event.clientX, y: event.clientY};
				this.setState({
					isDragging: true,
					mousePosition: clickPosition,
					initialOffset: {x: clickPosition.x - x, y: clickPosition.y - y},
					previousPosition: clickPosition
				});

				let canvas = document.getElementById('canvas');
				canvas.onmousemove = event => {
					event.preventDefault();
					this.setState({
						mousePosition: {x: event.clientX, y: event.clientY}
					});
				}
				canvas.onmouseup = event => {
					canvas.onmouseup = undefined;
					canvas.onmousemove = undefined;
					this.setState({
						isDragging: false
					});
					onDrop();
				}
			}}
		>{ children }</g>
	};
}

export default Draggable;