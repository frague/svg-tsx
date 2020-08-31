import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'


const EptProperties = ({ept}) => {
	return <div className='properties'>
		<h1>Endpoint Template</h1>
		<Form>
			<section>
				<Form.Input label='Title' />
			</section>
			<section>
				<Form.TextArea label='Description' />
			</section>
			<section>
				<Button>
					<Icon name="check" /> Save 
				</Button>
				<Button>
					<Icon name="plus" /> New EPT 
				</Button>
			</section>
		</Form>
	</div>
}

export default EptProperties;