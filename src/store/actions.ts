import { IPosition, IEpt } from '../interfaces'

export const EPT_ADD = 'EPT_ADD';
export function eptAdd(ept: IEpt) {
	return {
		type: EPT_ADD,
		ept
	};
}

export const EPT_MOVE = 'EPT_MOVE';
export function eptMove(id, position: IPosition) {
	return {
		type: EPT_MOVE,
		id, position
	};
}

export const EPT_REMOVE = 'EPT_REMOVE';
export function eptRemove(id) {
	return {
		type: EPT_REMOVE,
		id
	};
}

export const EPT_BRING_ON_TOP = 'EPT_BRING_ON_TOP';
export function eptBringOnTop(id) {
	return {
		type: EPT_BRING_ON_TOP,
		id
	};
}


export const LINK_ADD = 'LINK_ADD';
export function linkAdd(link) {
	return {
		type: LINK_ADD,
		link
	};
}

export const LINK_MOVE = 'LINK_MOVE';
export function linkMove(id, position: IPosition) {
	return {
		type: LINK_MOVE,
		id, position
	};
}

export const LINK_REMOVE = 'LINK_REMOVE';
export function linkRemove(id) {
	return {
		type: LINK_REMOVE,
		id
	};
}



