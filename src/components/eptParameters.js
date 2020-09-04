import React, {useState} from 'react'
import {observer} from 'mobx-react'
import {Icon} from 'semantic-ui-react'
import Parameter from './parameter'

const EptParameters = observer(({ept}) => {
	let [isCollapsed, setCollapsed] = useState(ept.isComplete);
	let onChange = (name, value) => ept.setParameter(name, value);

	return <ul>
		<h5 onClick={() => setCollapsed(!isCollapsed)}>
			<Icon name={'triangle ' + (isCollapsed ? 'right' : 'down')} />{ept.title}
		</h5>
		{!isCollapsed && 
			<ul>
				{Object.entries(ept.parameters)
					.map(([name, parameter], index) => 
						<Parameter key={index} name={name} data={parameter} onChange={onChange} />) 
				}
			</ul>
		}
	</ul>
})

export default EptParameters;