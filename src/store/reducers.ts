import { combineReducers } from 'redux'

import { EPT_ADD, EPT_MOVE, EPT_REMOVE, EPT_BRING_ON_TOP,
	LINK_ADD, LINK_MOVE, LINK_REMOVE, EPT_LINKS_REMOVE,
	CONNECTION_CANDIDATE_SEARCH, CONNECTION_CANDIDATE_REGISTER, CONNECTION_CANDIDATE_RESET 
} from './actions'

import { IPosition, IEpt } from '../interfaces'
import { generateId } from '../utils'

function instantiateAndPosition(ept: IEpt) {
	let id = generateId();
	ept.id = id;
	ept.position = {x: 100, y: 80};
	ept.order = 0;
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
	},
	'ID00002': {
		title: 'Dummy EPT #2',
		type: 'some type 2',
		inputTypes: ['interface', 'subinterface'],
		outputType: 'interface',
		position: {x: 150, y: 190},
		id: 'ID00002'
	},
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

		case EPT_BRING_ON_TOP:
			if (state.hasOwnProperty(action.id)) {
				let result1 = Object.assign({}, state);
				let newOrder = 1 + Math.max(...Object.values(result1).map((ept: IEpt) => +ept.order || 0));
				result1[action.id] = Object.assign({}, result1[action.id], {order: newOrder});
				return result1;
			} else
				return state;


		default:
			return state;
	}
}

const dummyLinks = {
	'ID00010': {
		from: 'ID00001',
		to: 'ID00002',
		id: 'ID00010',
	}
};

function linksReducer(state=dummyLinks, action) {
	switch (action.type) {
		case LINK_ADD:
			let link = {
				id: generateId(),
				from: action.from,
				to: action.to
			}
			return Object.assign({}, state, {[link.id]: link});

		case LINK_REMOVE:
			if (state.hasOwnProperty(action.id)) {
				let result = Object.assign({}, state);
				delete result[action.id];
				return result;
			} else
				return state;

		case EPT_LINKS_REMOVE:
			let hasChanges = false;
			let result = Object.assign({}, state);
			Object.entries(state).forEach(([id, link]) => {
				if (link.from === action.id || link.to === action.id) {
					hasChanges = true;
					delete result[id];
				}
			});
			return hasChanges ? result : state;
		default:
			return state;
	}
}

function connectionCandidateReducer(state=null, action) {
	switch (action.type) {
		case CONNECTION_CANDIDATE_SEARCH:
			return {
				isInput: action.isInput,
				types: action.types,
				position: action.position,
				payload: action.payload,
				candidate: undefined
			};

		case CONNECTION_CANDIDATE_RESET:
			return null;

		case CONNECTION_CANDIDATE_REGISTER:
			return Object.assign({}, state, {candidate: action.candidate});

		default:
			return state;
	}
}

const appReducer = combineReducers({
	epts: eptsReducer,
	links: linksReducer,
	connectionSearched: connectionCandidateReducer,
});

export default appReducer;