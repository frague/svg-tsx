import React from 'react'
import ReactDOM from 'react-dom'

import { canvasWidth, canvasHeight } from './src/settings'

import EptProperties from './src/components/eptProperties/eptProperties'
import Canvas from './src/components/canvas/canvas'
import Visualizer from './src/components/visualizer/visualizer'
import Catalogue from './src/components/catalogue/catalogue'
import Parameters from './src/components/parameters/parameters'

import 'semantic-ui-css/semantic.min.css'
import './styles.less';

ReactDOM.render(
	<div>
		<EptProperties ept={ {title: 'Test'} }  />
		<div className="builder">
			<Catalogue />
			<Parameters />
			<Canvas width={ canvasWidth } height={ canvasHeight }>
				<Visualizer />
			</Canvas>
		</div>
	</div>,
	document.getElementById('content')
);