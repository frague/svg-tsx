import { combineReducers } from 'redux'

import { EPT_ADD, EPT_MOVE, EPT_REMOVE, LINK_ADD, LINK_MOVE, LINK_REMOVE } from './actions'
import { IPosition } from '../interfaces'

function instantiateAndPosition(ept: any={}) {
	let id = 'ID' + ('000000' + Math.round(1000 * Math.random())).substring(-5);
	ept.id = id;
	ept.position = {x: 100, y: 80};
	return {[id]: ept};
}

const dummyState = {
	'ID00001': {
		title: 'Dummy EPT',
		type: 'some type',
		inputTypes: ['interface', 'subinterface'],
		outputType: 'interface',
		position: {x: 100, y: 85},
		id: 'ID00001'
	}
};

function eptsReducer(state=dummyState, action) {
	switch (action.type) {
		case EPT_ADD:
			return Object.assign({}, state, instantiateAndPosition(action.ept));

		case EPT_MOVE:
			let ept = state[action.id];
			if (ept) {
				ept = Object.assign({}, ept, { position: action.position });
				return Object.assign({}, state, {[action.id]: ept});
			} else 
				return state;

		case EPT_REMOVE:
			if (state.hasOwnProperty(action.id)) {
				let result = Object.assign({}, state);
				delete result[action.id];
				return result;
			} else
				return state;


		default:
			return state;
	}
}

function linksReducer(state={}, action) {
	return state;
}

const appReducer = combineReducers({
	epts: eptsReducer,
	links: linksReducer,
});

export default appReducer;