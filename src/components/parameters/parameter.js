import React, {useState} from 'react'
import {observer} from 'mobx-react'
import {useStore} from '../../store/useStore'
import {Form} from 'semantic-ui-react'
import {className} from '../../utils'

const Parameter = ({name, data, onChange}) => {
	let [value, setValue] = useState(data.defaultValue || '');

	const childrenProps = {
		name,
		value,
		data,
		onChange: (value) => {
			onChange(name, value);
			setValue(value);
		}
	};

	if (data.type === 'boolean') {
		return <CheckboxParameter {...childrenProps} />;
	} else if (data.values) {
		return <EnumParameter {...childrenProps} />;
	}
	return <InputParameter {...childrenProps} />;
}

const CheckboxParameter = observer(({name, data, value, onChange}) => {
	let classes = className({
		'checkbox': true,
		'mandatory': data.isMandatory
	});
	return <li className={classes}>
		<Form.Checkbox label={name} value={value}
			onChange={event => onChange(event.tartget.value)} />
	</li>;
})

const EnumParameter = observer(({name, data, value, onChange}) => {
	let classes = className({
		'enum': true,
		'mandatory': data.isMandatory
	});
	return <li className={classes}>
		<Form.Input type="hidden" label={name} value={value} />
		<ul>
			{data.values.map((value, index) =>
				<li key={index} 
					className={data.value === value ? 'selected' : ''}
					onClick={() => onChange(data.value === value ? '' : value)}
				>{ value }</li>)
			}
		</ul>
	</li>;
})

const InputParameter = observer(({name, data, value, onChange}) => {
	let classes = className({
		'mandatory': data.isMandatory
	});
	return <li className={classes}>
		<Form.Input label={name}
			type={data.type}
			value={value}
			onChange={event => onChange(event.target.value)} />
	</li>;
})

export default Parameter;