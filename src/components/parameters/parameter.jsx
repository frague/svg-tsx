import React from 'react'
import {observer} from 'mobx-react'
import {useStore} from '../../store/useStore'
// import {connect} from 'react-redux'
import {Form} from 'semantic-ui-react'
// import {eptSetParameter} from '../../store/actions'
import {className} from '../../utils'

const Parameter = (props) => {
	console.log('Parameter render');
	if (props.data.type === 'boolean') {
		return <CheckboxParameter {...props} />;
	} else if (props.data.values) {
		return <EnumParameter {...props} />;
	}
	return <InputParameter {...props} />;
}

const CheckboxParameter = observer(({name, data, onChange}) => {
	let classes = {
		'checkbox': true,
		'mandatory': data.isMandatory
	};
	return <li className={className(classes)}>
		<Form.Checkbox label={name} value={data.value}
			onChange={event => this.onChange(name, event.tartget.value)} />
	</li>;
})

const EnumParameter = observer(({name, data, onChange}) => {
	let classes = {
		'enum': true,
		'mandatory': data.isMandatory
	};
	return <li className={className(classes)}>
		<Form.Input type="hidden" label={name} />
		<ul>
			{data.values.map((value, index) =>
				<li key={index} 
					className={data.value === value ? 'selected' : ''}
					onClick={() => onChange(name, data.value === value ? '' : value)}
				>{ value }</li>)
			}
		</ul>
	</li>;
})

const InputParameter = observer(({name, data, onChange}) => {
	let classes = {
		'mandatory': data.isMandatory
	};
	return <li className={className(classes)}>
		<Form.Input label={name}
			type={data.type}
			value={data.value}
			onChange={event => onChange(name, event.target.value)} />
	</li>;
})

export default Parameter;