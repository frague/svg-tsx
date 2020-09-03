import React from 'react'
import {useStore} from '../../store/useStore'
import {observer} from 'mobx-react'

import {Positioner} from '../../positioner'
import {generateId, className} from '../../utils'
import {Ept} from '../../store/store'

const Catalogue = observer((props) => {
	const store = useStore();
	let { epts, links, id } = store.activeEpt;

	// const addEpt = (ept, targetEpt) => {
	// 	let newEpt = new Ept(Object.assign({}, ept, {
	// 		id: generateId(),
	// 		order: 0
	// 	}));
	// 	let connectionEpt = new Positioner(targetEpt.epts, targetEpt.links, newEpt).position();
	// 	state.epts = bringEptOnTop(Object.assign({}, state.epts, {[newEpt.id]: newEpt}), newEpt.id);
	// 	if (connectionEpt) {
	// 		let link = {
	// 			id: generateId(),
	// 			from: connectionEpt.id,
	// 			to: newEpt.id
	// 		}
	// 		state.links = Object.assign({}, state.links, {[link.id]: link});
	// 	}
	// }

	const useEpt = ept => {
		store.activeEpt.useEpt(ept);
	}

	const viewEpt = ept => {

	}

	return <div className="catalogue">
		<h1>Catalogue</h1>
		<ul>
			{
				store.catalogue.map((ept, index) => {
					let isActive = ept.id === id;
					let isPrimitive = ept.type === 'primitive';

					return <li key={ index } className={ className({active: isActive}) }>
						<h5>{ept.title}</h5>
						{ !isActive && 
							<button className="link" onClick={ () => useEpt(ept) }>Use</button>
						}
						{ !isPrimitive && 
							<button className="link" onClick={ () => viewEpt(ept) }>View</button>

						}
					</li>
				})
			}
		</ul>
	</div>
})

// const mapStateToProps = state => {
// 	return {
// 		activeEpt: state.activeEpt,
// 		catalogue: state.catalogue,
// 	}
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddClick: ept => {
//       	dispatch(eptAdd(ept))
//     },
//     addLink: (from, to) => {
//     	dispatch(linkAdd(from, to))
//     },
//     viewEpt: (ept) => {
//     	dispatch(activeEptSet(ept));
//     }
//   }
// }

// const CatalogueConnected = connect(mapStateToProps, mapDispatchToProps)(Catalogue)

export default Catalogue;