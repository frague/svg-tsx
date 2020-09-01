import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { eptAdd,linkAdd, eptBringOnTop, activeEptSet } from '../../store/actions'
import { Positioner } from '../../positioner'
import { generateId } from '../../utils'

class Catalogue extends React.Component {
	render() {
		let { epts, links, id } = this.props.activeEpt;

		return <div className="catalogue">
			<h1>Catalogue</h1>
			<ul>
				{
					this.props.catalogue.map((ept, index) => {
						let isActive = ept.id === id;
						let isPrimitive = ept.type === 'primitive';

						return <li key={ index }>
							<h5>{ ept.title }</h5>
							{ !isActive && 
								<button className="link" onClick={ () => this.injectEpt(ept) }>Use</button>
							}
							{ !isPrimitive && 
								<button className="link" onClick={ () => this.props.viewEpt(ept) }>View</button>

							}
						</li>
					})
				}
			</ul>
		</div>
	}

	injectEpt(ept) {
		let { epts, links, id } = this.props.activeEpt;
		let newEpt = Object.assign({}, ept, {id: generateId()})
		let connectionEpt = new Positioner(epts, links, newEpt).position();
		this.props.onAddClick(newEpt);

		if (connectionEpt) {
			this.props.addLink(connectionEpt.id, newEpt.id);
		}
	} 
}

const mapStateToProps = state => {
	return {
		activeEpt: state.activeEpt,
		catalogue: state.catalogue,
	}
};

const mapDispatchToProps = dispatch => {
  return {
    onAddClick: ept => {
      	dispatch(eptAdd(ept))
    },
    addLink: (from, to) => {
    	dispatch(linkAdd(from, to))
    },
    viewEpt: (ept) => {
    	dispatch(activeEptSet(ept));
    }
  }
}

const CatalogueConnected = connect(mapStateToProps, mapDispatchToProps)(Catalogue)

export default CatalogueConnected;