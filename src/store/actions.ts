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

export const CONNECTION_CANDIDATE_SEARCH = 'CONNECTION_CANDIDATE_SEARCH';
export function connectionCandidateSearch(isInput: boolean, types: string[], position: IPosition, payload: string) {
	return {
		type: CONNECTION_CANDIDATE_SEARCH,
		isInput, types, position, payload,
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
