import React from 'react'
// import {connect} from 'react-redux'
import {Form} from 'semantic-ui-react'
// import {eptSetParameter} from '../../store/actions'
import {className} from '../../utils'

class Parameter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.defaultValue || ''
		};
	}

	onValueChange(value) {
		value = value === this.state.value ? '' : value;
		this.setState({value});
		this.props.setEptParameter(this.props.eptId, this.props.name, value);
	}

	render() {
		let parameter = this.props.data;
		if (this.props.type === 'boolean') {
			return this.renderCheckbox();
		} else if (parameter.values) {
			return this.renderEnum();
		}
		return this.renderInput();
	}

	renderCheckbox() {
		let parameter = this.props.data;
		let classes = {
			'checkbox': true,
			'mandatory': parameter.isMandatory
		};
		return <li className={className(classes)}>
			<Form.Checkbox label={ this.props.name } value={ parameter.value }
				onChange={ event => this.onValueChange(event.tartget.value) } />
		</li>;
	}

	renderEnum() {
		let parameter = this.props.data;
		let classes = {
			'enum': true,
			'mandatory': parameter.isMandatory
		};
		return <li className={className(classes)}>
			<Form.Input type="hidden" label={ this.props.name } value={ this.state.value } />
			<ul>
				{ parameter.values.map((value, index) =>
					<li key={ index } 
						className={ parameter.value === value ? 'selected' : '' }
						onClick={ () => this.onValueChange(value) }
					>{ value }</li>)
				}
			</ul>
		</li>;
	}

	renderInput() {
		let parameter = this.props.data;
		let classes = {
			'mandatory': parameter.isMandatory
		};
		return <li className={className(classes)}>
			<Form.Input label={ this.props.name }
				type={ parameter.type }
				value={ this.state.value }
				onChange={ event => this.onValueChange(event.target.value) } />
		</li>;
	}
}

// const mapDispatchToProps = dispatch => {
// 	return {
// 		setEptParameter: (id, name, value) => dispatch(eptSetParameter(id, name, value))
// 	}
// }

// const ParameterConnected = connect(null, mapDispatchToProps)(Parameter);


export default Parameter;