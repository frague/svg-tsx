import { IPosition, IEpt } from '../interfaces'

export const EPT_ADD = 'EPT_ADD';
export function eptAdd(ept: IEpt) {
	return {
		type: EPT_ADD,
		ept
	};
}


export const EPT_MOVE = 'EPT_MOVE';
export function eptMove(id: string, position: IPosition) {
	return {
		type: EPT_MOVE,
		id, position
	};
}

export const EPT_REMOVE = 'EPT_REMOVE';
export function eptRemove(id: string) {
	return {
		type: EPT_REMOVE,
		id
	};
}

export const EPT_BRING_ON_TOP = 'EPT_BRING_ON_TOP';
export function eptBringOnTop(id: string) {
	return {
		type: EPT_BRING_ON_TOP,
		id
	};
}

export const EPT_SET_ACCEPTED_TYPES = 'EPT_SET_ACCEPTED_TYPES';
export function eptSetAcceptedTypes(id: string, types: string[]|string, isInput: boolean) {
	return {
		type: EPT_SET_ACCEPTED_TYPES,
		id, types, isInput
	};
}

export const EPT_SET_PARAMETER = 'EPT_SET_PARAMETER';
export function eptSetParameter(id: string, name: string, value: any) {
	return {
		type: EPT_SET_PARAMETER,
		id, name, value
	};
}

export const EPT_SET_PROPERTIES = 'EPT_SET_PROPERTIES';
export function eptSetProperties(title: string, description: any) {
	return {
		type: EPT_SET_PROPERTIES,
		title, description
	};
}

export const LINK_ADD = 'LINK_ADD';
export function linkAdd(from: string, to: string) {
	return {
		type: LINK_ADD,
		from, to
	};
}

export const LINK_MOVE = 'LINK_MOVE';
export function linkMove(id: string, position: IPosition) {
	return {
		type: LINK_MOVE,
		id, position
	};
}

export const LINK_REMOVE = 'LINK_REMOVE';
export function linkRemove(id: string) {
	return {
		type: LINK_REMOVE,
		id
	};
}

export const EPT_LINKS_REMOVE = 'EPT_LINKS_REMOVE';
export function eptLinksRemove(id: string) {
	return {
		type: EPT_LINKS_REMOVE,
		id
	};
}

export const CONNECTION_CANDIDATE_SEARCH = 'CONNECTION_CANDIDATE_SEARCH';
export function connectionCandidateSearch(isInput: boolean, types: string[], position: IPosition, 
	payload: string, isAnyAccepted: boolean, hasConnections: boolean) {
	return {
		type: CONNECTION_CANDIDATE_SEARCH,
		isInput, types, position, payload, isAnyAccepted, hasConnections
	};
}

export const CONNECTION_CANDIDATE_RESET = 'CONNECTION_CANDIDATE_RESET';
export function connectionCandidateReset() {
	return {
		type: CONNECTION_CANDIDATE_RESET
	};
}

export const CONNECTION_CANDIDATE_REGISTER = 'CONNECTION_CANDIDATE_REGISTER';
export function connectionCandidateRegister(candidate: string) {
	return {
		type: CONNECTION_CANDIDATE_REGISTER,
		candidate
	};
}

export const ACTIVE_EPT_SET = 'ACTIVE_EPT_SET';
export function activeEptSet(ept: IEpt) {
	return {
		type: ACTIVE_EPT_SET,
		ept
	};
}

export const ACTIVE_EPT_RESET = 'ACTIVE_EPT_RESET';
export function activeEptReset() {
	return {
		type: ACTIVE_EPT_RESET
	};
}



export const CATALOGUE_EPT_SAVE = 'CATALOGUE_EPT_SAVE';
export function catalogueEptSave(ept: IEpt) {
	return {
		type: CATALOGUE_EPT_SAVE,
		ept
	};
}
