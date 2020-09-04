import React from 'react'
import {observer} from 'mobx-react'
import {Form} from 'semantic-ui-react'
import {useStore} from '../store/useStore'
import EptParameters from './eptParameters'

const Parameters = observer((props) => {
	const store = useStore();

	return <div className="parameters">
		<h1>Parameters</h1>
		<Form>
		{Object.values(store.activeEpt.epts)
			.filter(ept => ept.id && ept.parameters && Object.keys(ept.parameters).length > 0)
			.map(ept => <EptParameters key={ept.id} ept={ept} />)
		}
		</Form>
	</div>
});

export default Parameters;