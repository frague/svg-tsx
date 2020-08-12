import React from 'react'
import { connect } from 'react-redux'

import { eptAdd } from '../../store/actions'
import { IEpt } from '../../interfaces'

import { primitives } from '../../../data/test'

export interface ICatalogueProps {
	onAddClick: Function
}

const Catalogue = ({ onAddClick }) => {
	return <div className="catalogue">
		<ul>
			{
				primitives.map((ept, index) => <li key={ index }>
					<h5>{ ept.title }</h5>
					<button className="link" onClick={ () => onAddClick(ept) }>Use</button>
				</li>)
			}
		</ul>
	</div>
}

const mapDispatchToProps = dispatch => {
  return {
    onAddClick: (ept: IEpt) => {
      dispatch(eptAdd(ept))
    }
  }
}

const CatalogueConnected = connect(null, mapDispatchToProps)(Catalogue)

export default CatalogueConnected;