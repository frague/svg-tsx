import React from 'react'

import {canvasWidth, canvasHeight} from '../settings'
import EptBuilderStore from '../store/store'
import {StoreProvider} from '../store/useStore'

import Canvas from './canvas'
import Catalogue from './catalogue'
import Parameters from './parameters'
import Visualizer from './visualizer'
import EptProperties from './eptProperties'

import 'semantic-ui-css/semantic.min.css'
import '../styles.less';

const half = canvasWidth / 2;

const EptBuilder = () => {
	return <StoreProvider value={EptBuilderStore}>
		<EptProperties />
		<div className="builder">
			<Catalogue />
			<Parameters />
			<Canvas width={canvasWidth} height={canvasHeight}>
				<Visualizer />
			</Canvas>
		</div>
	</StoreProvider>
}

export default EptBuilder;
