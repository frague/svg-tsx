import React from 'react'
import {Icon} from 'semantic-ui-react'
import Parameter from './parameter'

class EptParameters extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			isCollapsed: props.ept.isComplete
		};
	}
	
	toggleCollapsed() {
		this.setState({isCollapsed: !this.state.isCollapsed})
	}

	render() {
		let ept = this.props.ept;
		let id = ept.id;

		return <ul>
			<h5 onClick={() => this.toggleCollapsed()}>
				<Icon name={'triangle ' + (this.state.isCollapsed ? 'right' : 'down')} />{ept.title}
			</h5>
			{!this.state.isCollapsed && 
				<ul>
					{Object.entries(ept.parameters)
						.map(([name, parameter], index) => 
							<Parameter key={ index } eptId={ id } name={ name } data={ parameter } /> 
						) 
					}
				</ul>
			}
		</ul>
	}
}

export default EptParameters;