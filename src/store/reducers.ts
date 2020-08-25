import { combineReducers } from 'redux'

import { EPT_ADD, EPT_MOVE, EPT_REMOVE, EPT_BRING_ON_TOP,
	LINK_ADD, LINK_MOVE, LINK_REMOVE, EPT_LINKS_REMOVE, EPT_SET_ACCEPTED_TYPES,
	CONNECTION_CANDIDATE_SEARCH, CONNECTION_CANDIDATE_REGISTER, CONNECTION_CANDIDATE_RESET,
	ACTIVE_EPT_SET,
	APPLICATION_POINT_SET_ACCEPTED_TYPES,
} from './actions'

import { IPosition, IEpt, ILink } from '../interfaces'
import { canvasWidth } from '../settings'
import { generateId } from '../utils'

function instantiateAndPosition(ept: IEpt) {
	ept.position = ept.position || {x: 100, y: 80};
	ept.order = 0;
	return ept;
}

function bringEptOnTop(epts: any, id: string) {
	let newOrder = 1 + Math.max(...Object.values(epts).map((ept: IEpt) => +ept.order || 0));
	epts[id] = Object.assign({}, epts[id], {order: newOrder});
	return epts;
}


function connectionCandidateReducer(state=null, action) {
	switch (action.type) {
		case CONNECTION_CANDIDATE_SEARCH:
			return {
				isInput: action.isInput,
				types: action.types,
				position: action.position,
				payload: action.payload,
				isAnyAccepted: action.isAnyAccepted,
				hasConnections: action.hasConnections,

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

const applicationPoint = {
	position: {x: canvasWidth / 2, y: 23},
	isInput: false,
	outputTypes: null,
	outputIsFlexible: true,
	id: ''
};

const dummyState = {
	title: 'New EPT',
	type: 'new',
	inputTypes: null,
	inputIsFlexible: true,
	outputTypes: null,
	outputIsFlexible: true,
	position: {x: 100, y: 85},
	id: '',
	epts: {
		'': applicationPoint
	},
	links: {},
	parameters: {},
};

function activeEptReducer(state=dummyState as any, action) {
	switch (action.type) {
		case ACTIVE_EPT_SET:
			let { epts, links, parameters } = action.ept;
			let result = Object.assign({}, action.ept, {
				epts: Object.assign({}, epts),
				links: Object.assign({}, links),
				parameters: Object.assign({}),
			});
			return result;

		// EPTs
		case EPT_ADD:
			let newEpt = instantiateAndPosition(action.ept);
			state.epts = bringEptOnTop(Object.assign({}, state.epts, {[newEpt.id]: newEpt}), newEpt.id);
			return Object.assign({}, state);

		case EPT_MOVE:
			let ept = state.epts[action.id];
			if (ept) {
				ept = Object.assign({}, ept, { position: action.position });
				state.epts = Object.assign({}, state.epts, {[action.id]: ept});
				return Object.assign({}, state);
			}
			return state;

		case EPT_REMOVE:
			if (state.epts.hasOwnProperty(action.id)) {
				let result = Object.assign({}, state.epts);
				delete result[action.id];
				return Object.assign({}, state, {epts: result});
			}
			return state;

		case EPT_BRING_ON_TOP:
			if (state.epts.hasOwnProperty(action.id)) {
				state.epts = bringEptOnTop(Object.assign({}, state.epts), action.id);
				return Object.assign({}, state);
			}
			return state;

		case EPT_SET_ACCEPTED_TYPES:
			if (state.epts.hasOwnProperty(action.id)) {
				let ept1 = Object.assign({}, state.epts[action.id]);
				ept1[action.isInput ? 'inputTypes' : 'outputTypes'] = action.types;
				state.epts = Object.assign({}, state.epts, {[action.id]: ept1})
				return Object.assign({}, state);
			}
			return state;

		// links

		case LINK_ADD:
			let link = {
				id: generateId(),
				from: action.from,
				to: action.to
			}
			state.links = Object.assign({}, state.links, {[link.id]: link});
			return Object.assign({}, state);

		case LINK_REMOVE:
			if (state.links.hasOwnProperty(action.id)) {
				let result = Object.assign({}, state.links);
				delete result[action.id];
				state.links = result;
				return Object.assign({}, state);
			}
			return state;

		case EPT_LINKS_REMOVE:
			let hasChanges = false;
			let result1 = Object.assign({}, state.links);
			Object.entries(result1).forEach(([id, link]) => {
				if ((link as ILink).from === action.id || (link as ILink).to === action.id) {
					hasChanges = true;
					delete result[id];
				}
			});
			if (hasChanges) {
				state.links = result1;
				return Object.assign({}, state);
			}
			return state;

		default:
			return state;
	}
}

const appReducer = combineReducers({
	// epts: eptsReducer,
	// links: linksReducer,
	connectionSearched: connectionCandidateReducer,
	activeEpt: activeEptReducer,
});

export default appReducer;