import React from 'react'
import { Form } from 'semantic-ui-react'
import EptParameters from './eptParameters'
import {observer} from 'mobx-react'
import {useStore} from '../../store/useStore'

const Parameters = observer((props) => {
	const store = useStore();
	console.log('Parameters render');

	return <div className='parameters'>
		<h1>Parameters</h1>
		<Form>
		{
			Object.values(store.activeEpt.epts)
				.filter(ept => ept.id && ept.parameters && Object.keys(ept.parameters).length > 0)
				.map((ept, index) => <EptParameters key={ index } ept={ ept } />)
		}
		</Form>
	</div>
});

export default Parameters;