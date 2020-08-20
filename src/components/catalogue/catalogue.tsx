import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { eptAdd,linkAdd, eptBringOnTop } from '../../store/actions'
import { IEpt } from '../../interfaces'

import { primitives } from '../../../data/test'

export interface ICatalogueProps {
	epts: any,
	links: any,
	onAddClick: Function,
	addLink: Function,
	bringOnTop: Function,
}

const Catalogue = ({ epts, links, onAddClick, bringOnTop }) => {
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

const mapStateToProps = state => {
	return {
		epts: state.epts,
		links: state.links,
	}
};

const mapDispatchToProps = dispatch => {
  return {
    onAddClick: (ept: IEpt) => {
      dispatch(eptAdd(ept))
    },
    addLink: (from: string, to: string) => {
    	dispatch(linkAdd(from, to))
    },
    bringOnTop: (id: string) => {
    	dispatch(eptBringOnTop(id))
    }
  }
}

const CatalogueConnected = connect(mapStateToProps, mapDispatchToProps)(Catalogue)

export default CatalogueConnected;