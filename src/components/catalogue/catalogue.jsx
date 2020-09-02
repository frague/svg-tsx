import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { eptAdd,linkAdd, eptBringOnTop, activeEptSet } from '../../store/actions'
import { Positioner } from '../../positioner'
import { generateId, className } from '../../utils'

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

						return <li key={ index } className={ className({active: isActive}) }>
							<h5>{ept.title}</h5>
							{ !isActive && 
								<button className="link" onClick={ () => this.props.onAddClick(ept) }>Use</button>
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