import React from 'react'
import ReactDOM from 'react-dom'

import {canvasWidth, canvasHeight} from './src/settings'
import EptBuilderStore from './src/store/store'
import {StoreProvider} from './src/store/useStore'

import Canvas from './src/components/canvas/canvas'
import Visualizer from './src/components/visualizer/visualizer'
import Catalogue from './src/components/catalogue/catalogue'
import Parameters from './src/components/parameters/parameters'
import EptProperties from './src/components/eptProperties/eptProperties'

import 'semantic-ui-css/semantic.min.css'
import './styles.scss';

const half = canvasWidth / 2;

ReactDOM.render(
	<StoreProvider value={EptBuilderStore}>
		<EptProperties />
		<div className="builder">
			<Catalogue />
			<Parameters />
			<Canvas width={canvasWidth} height={canvasHeight}>
				<Visualizer />
			</Canvas>
		</div>
	</StoreProvider>,
	document.getElementById('content')
);