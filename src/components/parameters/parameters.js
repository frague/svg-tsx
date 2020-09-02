import React from 'react'
import {Form} from 'semantic-ui-react'
import EptParameters from './eptParameters'

class Parameters extends React.Component {

	render() {
		const activeEpt = this.props.activeEpt || {epts: []};
		
		return <div className='parameters'>
			<h1>Parameters</h1>
			<Form>
			{
				Object.values(activeEpt.epts)
					.filter(ept => ept.id && ept.parameters && Object.keys(ept.parameters).length > 0)
					.map((ept, index) => <EptParameters key={ index } ept={ ept } />)
			}
			</Form>
		</div>;
	}
}

// const mapStateToProps = state => {
// 	return {
// 		activeEpt: state.activeEpt
// 	}
// }

// const ParametersConnected = connect(mapStateToProps)(Parameters);

export default Parameters;