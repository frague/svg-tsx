import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import appReducer from './src/store/reducers'

import { canvasWidth, canvasHeight } from './src/settings'

import Canvas from './src/components/canvas/canvas'
import ConnectionPoint from './src/components/connectionPoint/connectionPoint'
import Visualizer from './src/components/visualizer/visualizer'
import Catalogue from './src/components/catalogue/catalogue'

import './styles.scss'

const store = createStore(appReducer);

const half = canvasWidth / 2;

ReactDOM.render(
	<Provider store={ store }>
		<Canvas width={ canvasWidth } height={ canvasHeight }>
			<ConnectionPoint position={ {x: half, y: 20} } isInput={ false } types={ ['any'] }
				payload={ null } isMultiple={ true } />
			<text x={ half + 13 } y="23">Begin</text>
			<ConnectionPoint position={ {x: half, y: canvasHeight - 20} } isInput={ true }
				types={ ['any'] } payload={ null } isMultiple={ true } />
			<text x={ half + 13 } y={ canvasHeight - 13 }>End</text>

			<Visualizer />
		</Canvas>
		<Catalogue />
	</Provider>,
	document.getElementById('content')
);