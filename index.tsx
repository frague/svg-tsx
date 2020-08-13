import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import appReducer from './src/store/reducers'

import Canvas from './src/components/canvas/canvas'
import Visualizer from './src/components/visualizer/visualizer'
import Catalogue from './src/components/catalogue/catalogue'

import './styles.scss'

const store = createStore(appReducer);

ReactDOM.render(
	<Provider store={ store }>
		<Canvas width={ 800 } height={ 600 }>
			<Visualizer />
		</Canvas>
		<Catalogue />
	</Provider>,
	document.getElementById('content')
);