import React from 'react'
import {observer} from 'mobx-react'
import {useStore} from '../../store/useStore'

import {className} from '../../utils'
import {Ept} from '../../store/store'

const Catalogue = observer((props) => {
	const store = useStore();
	let {activeEpt: {id}, catalogue: {epts}} = store;

	return <div className="catalogue">
		<h1>Catalogue</h1>
		<ul>
			{epts.map((ept, index) => {
				let isActive = ept.id === id;

				return <li key={index} className={className({active: isActive})}>
					<h5>{ept.title}</h5>
					{!isActive && 
						<button className="link" onClick={() => store.activeEpt.useEpt(ept)}>Use</button>
					}
					{!ept.isPrimitive && 
						<button className="link" onClick={() => store.catalogue.activate(ept)}>View</button>

					}
				</li>
			})}
		</ul>
	</div>
})

export default Catalogue;