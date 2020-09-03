import { eptWidth, eptHeight, canvasWidth, canvasHeight } from './settings'
import { IEpt, IPosition } from './interfaces'
import { findIntersection } from './utils'

export class Positioner {
	epts;
	starts;
	positions;
	connectionsCount;

	ept: IEpt;

	constructor(epts: any, links: any, ept: IEpt) {
		this.ept = ept;
		this.connectionsCount = {};
		this.positions = [];

		let inputTypes = ept.inputTypes;
		this.starts = Object.entries(epts)
			.filter(([id, ept]) => {
				if (id) this.positions.push((ept as IEpt).position);
				let { outputTypes, outputIsFlexible } = ept as IEpt;
				return (!outputTypes && outputIsFlexible) || findIntersection([inputTypes, outputTypes])
			})
			.map(([id, ept]) => {
				this.connectionsCount[id] = this._countConnections(id, links);
				return ept;
			})
			.sort((a, b) => {
				let [countA, countB] = [this.connectionsCount[(a as IEpt).id], this.connectionsCount[(b as IEpt).id]];
				if (countA === countB) {
					return (a as IEpt).id < (b as IEpt).id ? -1 : 1;
				}
				return countA < countB ? -1 : 1;
			});
	}

	_countConnections(id: string, links: any) {
		return Object.values(links).filter((link: any) => link.from === id).length;
	}
	
	addLink() {
		if (this.starts && this.starts.length) {
			return this.starts[0] as IEpt;
		}
		return;
	}

	_isPositionOverlapping(position: IPosition) {
		return this.positions.some(({x, y}) => {
			return Math.abs(x - position.x) < eptWidth
				&& Math.abs(y - position.y) < eptHeight;
		});
	}

	_tryPlacingTo(position: IPosition) {
		if (!this._isPositionOverlapping(position)) {
			this.ept.position = position;
			return true;
		}
		return false;
	}

	position(): IEpt {
		let middle = canvasWidth / 2 - eptWidth / 2;
		let basePosition;

		let connectedTo = this.addLink();
		if (connectedTo !== undefined && connectedTo.id) {
			basePosition = {x: connectedTo.position.x, y: connectedTo.position.y + eptHeight + 30};
		} else {
			// let maxY = Math.max(...this.positions.map(p => p.y), 20);
			basePosition = {x: middle, y: 80}
		}

		for (let ky = 0; ky < 6; ky++) {
			for (let kx = 0; kx < 300; kx+=27) {
				if (
					this._tryPlacingTo({x: basePosition.x + kx, y: basePosition.y + (eptHeight + 30) * ky})
					|| this._tryPlacingTo({x: basePosition.x - kx, y: basePosition.y + (eptHeight + 30) * ky})
				) return connectedTo;
			}
		}
		return connectedTo;
	}
}