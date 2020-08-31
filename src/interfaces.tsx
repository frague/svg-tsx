export interface IPosition {
	x: number;
	y: number;
}

export enum parameterType {
	number,
	boolean,
	string
}

export interface IParameter {
	values?: string[];
	type?: parameterType;
	defaultValue?: any;
	value: any;
}

export interface ILink {
	from: string;
	to: string;
}

export interface IEpt {
	title: string;
	type: string;
	inputTypes: string[];
	outputTypes?: string[];
	epts: any,
	links: any,
	parameters: any,

	position?: IPosition;
	id?: string	;
	order?: number;

	inputIsFlexible: boolean;	// Obsolete
	outputIsFlexible: boolean;	// Obsolete
}

