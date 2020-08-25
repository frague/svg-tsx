import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { eptAdd,linkAdd, eptBringOnTop } from '../../store/actions'
import { IEpt } from '../../interfaces'
import { Positioner } from '../../positioner'
import { generateId } from '../../utils'

import { primitives } from '../../../data/test'
import { IPosition } from '../../interfaces'

export interface ICatalogueProps {
	activeEpt: any,
	applicationPointPosition: IPosition,
	onAddClick: Function,
	addLink: Function,
}

const Catalogue = ({ activeEpt, onAddClick, addLink, applicationPointPosition }) => {
	let { epts, links } = activeEpt;
	return <div className="catalogue">
		<ul>
			{
				primitives.map((ept, index) => <li key={ index }>
					<h5>{ ept.title }</h5>
					<button className="link" onClick={ () => {
						let newEpt = Object.assign({}, ept, {id: generateId()})
						let connectionEpt = new Positioner(epts, links, newEpt, applicationPointPosition).position();
						onAddClick(newEpt);

						if (connectionEpt) {
							addLink(connectionEpt.id, newEpt.id);
						}
					} }>Use</button>
				</li>)
			}
		</ul>
	</div>
}

const mapStateToProps = state => {
	return {
		activeEpt: state.activeEpt,
	}
};

const mapDispatchToProps = dispatch => {
  return {
    onAddClick: (ept: IEpt) => {
      dispatch(eptAdd(ept))
    },
    addLink: (from: string, to: string) => {
    	dispatch(linkAdd(from, to))
    }
  }
}

const CatalogueConnected = connect(mapStateToProps, mapDispatchToProps)(Catalogue)

export default CatalogueConnected;