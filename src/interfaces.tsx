export interface IPosition {
	x: number;
	y: number;
}

enum parameterType {
	number,
	boolean,
	string
}

export interface IParameter {
	name: string;
	values?: string[];
	type?: parameterType;
	defaultValue?: any;
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

