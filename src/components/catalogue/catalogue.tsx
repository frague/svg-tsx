import React from 'react'
import { connect } from 'react-redux'

import { eptAdd, eptBringOnTop } from '../../store/actions'
import { IEpt } from '../../interfaces'

import { primitives } from '../../../data/test'

export interface ICatalogueProps {
	onAddClick: Function,
	bringOnTop: Function,
}

const Catalogue = ({ onAddClick, bringOnTop }) => {
	return <div className="catalogue">
		<ul>
			{
				primitives.map((ept, index) => <li key={ index }>
					<h5>{ ept.title }</h5>
					<button className="link" onClick={ () => {
						let id = onAddClick(ept);
						bringOnTop(id);
					} }>Use</button>
				</li>)
			}
		</ul>
	</div>
}

const mapDispatchToProps = dispatch => {
  return {
    onAddClick: (ept: IEpt) => {
      dispatch(eptAdd(ept))
    },
    bringOnTop: (id: string) => {
    	dispatch(eptBringOnTop(id))
    }
  }
}

const CatalogueConnected = connect(null, mapDispatchToProps)(Catalogue)

export default CatalogueConnected;