import React from 'react'
import {Form, Button, Icon} from 'semantic-ui-react'
// import {eptSetProperties, catalogueEptSave, activeEptReset} from '../../store/actions'
import {generateId} from '../../utils'
import {action} from 'mobx'
import {observer} from 'mobx-react'
import {useStore} from '../../store/useStore'
import {Ept} from '../../store/store'

const EptProperties = observer((props) => {

	const store = useStore();
	let {id, title, description} = store.activeEpt;
	
	const save = () => {
		if (!id) {
			store.activeEpt.id = generateId();
		}
		let met = false;
		store.catalogue = store.catalogue.map(ept => {
			if (ept.id === id) {
				met = true;
				return store.activeEpt;
			}
			return ept;
		});
		if (!met) {
			store.catalogue.push(new Ept(store.activeEpt));
		}
	}

	const reset = () => {
		store.activeEpt = new Ept();
	}

	return <div className='properties'>
		<h1>Endpoint Template</h1>
		<Form>
			<section>
				<Form.Input label='Title' value={title}
					onChange={event => store.activeEpt.title = event.target.value} />
			</section>
			<section>
				<Form.TextArea label='Description' value={description}
					onChange={event => store.activeEpt.description = event.target.value}  />
			</section>
			<section>
				<Button onClick={() => save()}>
					<Icon name="check" /> Save 
				</Button>
				<Button onClick={() => reset()}>
					<Icon name="plus" /> New EPT 
				</Button>
			</section>
		</Form>
	</div>
});

// const mapStateToProps = state => {
// 	return {
// 		activeEpt: state.activeEpt
// 	}
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		setEptProperties: (id, title, description) => {
// 			return dispatch(eptSetProperties(id, title, description));
// 		},
// 		saveEpt: (ept) => {
// 			return dispatch(catalogueEptSave(ept));
// 		},
// 		resetActiveEpt: () => {
// 			return dispatch(activeEptReset())
// 		}
// 	}
// }

// const EptPropertiesConnected = connect(mapStateToProps, mapDispatchToProps)(EptProperties);

export default EptProperties;