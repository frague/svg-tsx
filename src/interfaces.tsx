export interface IPosition {
	x: number,
	y: number
}

export interface IEpt {
	title: string,
	type: string,
	inputTypes: string[],
	outputType?: string,

	position?: IPosition,
	id?: string	,
	order?: number,
}

