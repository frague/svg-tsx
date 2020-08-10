import React from 'react'
import ReactDOM from 'react-dom'

import Canvas from './src/components/canvas/canvas'
import Ept from './src/components/ept/ept'

ReactDOM.render(
	<Canvas width="800" height="600">
		<Ept title="test ept very very long title" position={ {x: 100, y: 50} }
			type="Some EPT type very very long title" inputTypes={ ['interface'] } outputType={ 'interface' } 
		/>
	</Canvas>,
	document.getElementById('content')
);