import React from 'react'
import ReactDOM from 'react-dom'

import Canvas from './src/components/canvas/canvas'
import Ept from './src/components/ept/ept'
import Link from './src/components/link/link'

ReactDOM.render(
	<Canvas width={ 800 } height={ 600 }>
		<Ept title="test ept very very long title" position={ {x: 100, y: 50} }
			type="Address Type" inputTypes={ ['interface'] } outputType={ 'interface' } 
		/>
		<Link from={ {x: 100, y: 50} } to={ {x: 270, y: 190} } />
	</Canvas>,
	document.getElementById('content')
);