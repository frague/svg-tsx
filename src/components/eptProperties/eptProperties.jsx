import React from 'react'
import {Form, Button, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {eptSetProperties, catalogueEptSave, activeEptReset} from '../../store/actions'
import {generateId} from '../../utils'

class EptProperties extends React.Component {

	updateProperties(id, title, description) {
		this.props.setEptProperties(id, title, description);
	}

	save() {
		let eptCopy = Object.assign({}, this.props.activeEpt);
		if (!this.props.activeEpt.id) {
			let id = generateId();
			let {title, description} = this.props.activeEpt;
			this.props.setEptProperties(id, title, description);
			eptCopy.id = id;
		}
		this.props.saveEpt(eptCopy);
	}

	render() {
		let {id, title, description} = this.props.activeEpt;
		return <div className='properties'>
			<h1>Endpoint Template</h1>
			<Form>
				<section>
					<Form.Input label='Title' value={title}
						onChange={event => this.updateProperties(id, event.target.value, description)} />
				</section>
				<section>
					<Form.TextArea label='Description' value={description}
						onChange={ event => this.updateProperties(id, title, event.target.value) }  />
				</section>
				<section>
					<Button onClick={() => this.save()}>
						<Icon name="check" /> Save 
					</Button>
					<Button onClick={() => this.props.resetActiveEpt()}>
						<Icon name="plus" /> New EPT 
					</Button>
				</section>
			</Form>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		activeEpt: state.activeEpt
	}
};

const mapDispatchToProps = dispatch => {
	return {
		setEptProperties: (id, title, description) => {
			return dispatch(eptSetProperties(id, title, description));
		},
		saveEpt: (ept) => {
			return dispatch(catalogueEptSave(ept));
		},
		resetActiveEpt: () => {
			return dispatch(activeEptReset())
		}
	}
}

const EptPropertiesConnected = connect(mapStateToProps, mapDispatchToProps)(EptProperties);

export default EptPropertiesConnected;