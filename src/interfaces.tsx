export interface IPosition {
	x: number;
	y: number;
}

export interface IEpt {
	title: string;
	type: string;
	inputTypes: string[];
	outputTypes?: string[];

	position?: IPosition;
	id?: string	;
	order?: number;
	inputIsFlexible: boolean;
	outputIsFlexible: boolean;
}

