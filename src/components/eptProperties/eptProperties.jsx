import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { eptSetProperties, catalogueEptSave, activeEptReset } from '../../store/actions'

class EptProperties extends React.Component {

	updateProperties(title, description) {
		this.props.setEptProperties(title, description);
	}

	render() {
		let { title, description } = this.props.activeEpt;
		return <div className='properties'>
			<h1>Endpoint Template</h1>
			<Form>
				<section>
					<Form.Input label='Title' value={ title }
						onChange={ event => this.updateProperties(event.target.value, description) } />
				</section>
				<section>
					<Form.TextArea label='Description' value={ description }
						onChange={ event => this.updateProperties(title, event.target.value) }  />
				</section>
				<section>
					<Button onClick={ () => this.props.saveEpt(this.props.activeEpt) }>
						<Icon name="check" /> Save 
					</Button>
					<Button onClick={ () => this.props.resetActiveEpt() }>
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
		setEptProperties: (title, description) => {
			return dispatch(eptSetProperties(title, description));
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