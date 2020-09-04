import { eptWidth, eptHeight, canvasWidth, canvasHeight } from './settings'
import { findIntersection } from './utils'

export class Positioner {
	epts;
	starts;
	positions;
	connectionsCount;

	ept;

	constructor(epts, links, ept) {
		this.ept = ept;
		this.connectionsCount = {};
		this.positions = [];

		let inputTypes = ept.inputTypes;
		this.starts = Object.entries(epts)
			.filter(([id, ept]) => {
				if (id) this.positions.push(ept.position);
				let { outputTypes, outputIsFlexible } = ept;
				return (!outputTypes && outputIsFlexible) || findIntersection([inputTypes, outputTypes])
			})
			.map(([id, ept]) => {
				this.connectionsCount[id] = this._countConnections(id, links);
				return ept;
			})
			.sort((a, b) => {
				let [countA, countB] = [this.connectionsCount[a.id], this.connectionsCount[b.id]];
				return countA < countB ? -1 : 1;
			});
	}

	_countConnections(id, links) {
		return Object.values(links).filter((link) => link.from === id).length;
	}
	
	addLink() {
		if (this.starts && this.starts.length) {
			return this.starts[0];
		}
		return;
	}

	_isPositionOverlapping(position) {
		return this.positions.some(({x, y}) => {
			return Math.abs(x - position.x) < eptWidth
				&& Math.abs(y - position.y) < eptHeight;
		});
	}

	_tryPlacingTo(position) {
		if (!this._isPositionOverlapping(position)) {
			this.ept.position = position;
			return true;
		}
		return false;
	}

	position() {
		let middle = canvasWidth / 2 - eptWidth / 2;
		let basePosition;

		let connectedTo = this.addLink();
		if (connectedTo !== undefined && connectedTo.id) {
			basePosition = {x: connectedTo.position.x, y: connectedTo.position.y + eptHeight + 30};
		} else {
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