import React from 'react'
import {observer} from 'mobx-react'
import {useStore} from '../../store/useStore'
import {Form, Button, Icon} from 'semantic-ui-react'

const EptProperties = observer((props) => {
	const store = useStore();
	let {activeEpt, catalogue} = store;

	return <div className='properties'>
		<h1>Endpoint Template</h1>
		<Form>
			<section>
				<Form.Input label='Title' value={activeEpt.title}
					onChange={event => activeEpt.title = event.target.value} />
			</section>
			<section>
				<Form.TextArea label='Description' value={activeEpt.description}
					onChange={event => activeEpt.description = event.target.value}  />
			</section>
			<section>
				<Button onClick={() => catalogue.save()}>
					<Icon name="check" /> Save 
				</Button>
				<Button onClick={() => activeEpt.reset()}>
					<Icon name="plus" /> New EPT 
				</Button>
			</section>
		</Form>
	</div>
});

export default EptProperties;