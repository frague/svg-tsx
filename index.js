import React from 'react'
import ReactDOM from 'react-dom'

import {canvasWidth, canvasHeight} from './src/settings'
import EptBuilderStore from './src/store/store'
import {StoreProvider} from './src/store/useStore'

import Canvas from './src/components/canvas'
import Catalogue from './src/components/catalogue'
import Parameters from './src/components/parameters'
import Visualizer from './src/components/visualizer'
import EptProperties from './src/components/eptProperties'

import 'semantic-ui-css/semantic.min.css'
import './styles.less';

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