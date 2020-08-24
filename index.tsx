import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import appReducer from './src/store/reducers'

import { canvasWidth, canvasHeight } from './src/settings'

import EptProperties from './src/components/eptProperties/eptProperties'
import Canvas from './src/components/canvas/canvas'
import Visualizer from './src/components/visualizer/visualizer'
import Catalogue from './src/components/catalogue/catalogue'

import 'fomantic-ui/dist/semantic.min.css';
import './styles.scss';

const store = createStore(appReducer);

const half = canvasWidth / 2;

ReactDOM.render(
	<Provider store={ store }>
		<EptProperties ept={ {title: 'Test'} }  />
		<div className="builder">
			<Canvas width={ canvasWidth } height={ canvasHeight }>
				<text x={ half + 13 } y="23">Application Point(s)</text>
				{/*<text x={ half + 13 } y={ canvasHeight - 17 }>End</text>*/}

				<Visualizer />
			</Canvas>
			<Catalogue />
		</div>
	</Provider>,
	document.getElementById('content')
);