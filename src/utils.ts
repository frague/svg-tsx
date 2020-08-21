export function generateId(): string {
	return 'ID' + ('000000' + Math.round(1000 * Math.random())).substring(-5);
}

export function className(names: any): string {
	return Object.entries(names).filter(([name, condition]) => !!condition).map(([name]) => name).join(' ');
}

export function findIntersection(source: string[][]): string[] {
	let sets = source.length;
	let counts = source.reduce((result, subset) => {
		(subset || []).forEach(type => {
			let existing = result[type] || 0;
			result[type] = existing + 1;
		});
		return result;
	}, {});
	let intersection = Object.entries(counts).filter(([name, count]) => count === sets).map(([name]) => name).sort();
	return intersection.length ? intersection : null;
}