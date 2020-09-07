import {observable, computed, action, toJS} from 'mobx';
import {canvasWidth} from '../settings'
import {generateId} from '../utils'
import {primitives} from '../data/test'
import {Positioner} from '../positioner'

const applicationPoint = {
    position: {x: canvasWidth / 2, y: 23},
    isInput: false,
    outputTypes: null,
    outputIsFlexible: true,
    id: ''
};

// class Parameter {
//     type = '';
//     defaultValue = '';
//     values = [];
//     isMandatory = false;
//     @observable value = '';
// }

const emptyEpt = {
    id: '',
    title: 'The New EPT',
    description: '',
    order: 0,
    type: 'custom',
    inputTypes: null,
    inputIsFlexible: false,
    outputTypes: null,
    outputIsFlexible: false,
    position: {x: 0, y: 0},
    epts: {
        '': applicationPoint
    },
    links: {},
    parameters: {},
}

export class Ept {
    @observable id;
    @observable title;
    @observable description;
    @observable order;
    @observable type;
    @observable inputTypes;
    inputIsFlexible;
    @observable outputTypes;
    outputIsFlexible;
    @observable position;
    @observable epts;
    @observable links;
    @observable parameters;
    
    @computed get isComplete() {
        return !Object.values(this.parameters)
            .some(parameter => parameter.isMandatory && !parameter.value);
    }

    @computed get isPrimitive() {
        return this.type === 'primitive';
    }

    @action
    setParameter(name, value) {
        if (this.parameters[name]) {
            this.parameters[name].value = value;
        }
    }

    clone(data={}) {
        let {id, title, description, type, inputTypes, inputIsFlexible, 
            outputTypes, outputIsFlexible, position, epts, links, parameters} = toJS(this);

        return new Ept(Object.assign({
                id, title, description, type, inputTypes, inputIsFlexible,
                outputTypes, outputIsFlexible,
                epts: Object.values(epts).reduce((result, ept) => {
                    result[ept.id] = new Ept(ept);
                    return result;
                }, {}),
                links: Object.values(links).reduce((result, link) => {
                    let newLink = new Link(link);
                    result[newLink.id] = newLink;
                    return result;
                }, {}),
                parameters: Object.entries(parameters).reduce((result, [name, data]) => {
                    result[name] = Object.assign({}, data);
                    return result;
                }, {})
            }, data
        ));
    }

    constructor(data={}) {
        Object.assign(this, emptyEpt, data);
    }
}

class Link {
    get id() {
        return `${this.from}-${this.to}`;
    };
    @observable from = null;
    @observable to = null;

    constructor(data={}) {
        Object.assign(this, data);
    }
}

class ActiveEptStore extends Ept {
    constructor(rootStore, data={}) {
        super();

        this.rootStore = rootStore;
        Object.assign(this, data);
    }

    @action
    reset() {
        Object.assign(this, emptyEpt);
    }

    @action
    bringEptOnTop(id) {
        if (!this.epts[id]) return;
        this.epts[id].order = 1 + Math.max(...Object.values(this.epts).map(ept => +ept.order || 0));
    }

    @action
    addEpt(ept) {
        let newEpt = ept.clone({
            id: generateId(),
            order: 0
        });
        this.bringEptOnTop(newEpt);
        this.epts[newEpt.id] = newEpt;

        let connectionEpt = new Positioner(this.epts, this.links, newEpt).position();
        if (connectionEpt) {
            this.addLink(connectionEpt.id, newEpt.id);
        }
    }

    @action
    addLink(fromId, toId) {
        let link = new Link({
            from: fromId,
            to: toId
        });
        this.links[link.id] = link;
    }

    @action
    removeLink(id) {
        delete this.links[id];
    }

    @action
    removeEpt(id) {
        Object.values(this.links).forEach(link => {
            if (link.from === id || link.to === id) {
                delete this.links[link.id];
            }
        });
        delete this.epts[id];
    }

    @action
    useEpt(ept) {
        if (ept.isPrimitive) {
            this.addEpt(ept);
        } else {
            Object.values(ept.epts).forEach(e => e.id && this.addEpt(e));
        }
    }

    @action
    setAcceptedTypes(eptId, types, isInput) {
        let ept = this.epts[eptId];
        if (!ept) return;
        ept[isInput ? 'inputTypes' : 'outputTypes'] = types;
    }
}

class CatalogueStore {
    @observable epts = [];

    @action
    save() {
        let activeEpt = this.rootStore.activeEpt;
        if (!activeEpt.id) {
            activeEpt.id = generateId();
        }
        let clonedEpt = activeEpt.clone();
        let index = this.epts.findIndex((ept) => ept.id === clonedEpt.id);
        if (index < 0) {
            this.epts.push(new Ept(clonedEpt));
        } else {
            this.epts[index] = clonedEpt;
        }
    }

    @action
    activate(ept) {
        Object.assign(this.rootStore.activeEpt, ept.clone());
    }

    constructor(rootStore, epts=[]) {
        this.epts = epts;
        this.rootStore = rootStore;
    }
}

class ConnectionCandidateStore {
    @observable isSearched = false;
    @observable position;
    isInput;
    types;
    payload;
    isAnyAccepted;
    hasConnections;

    @observable candidate = undefined;

    @action
    startSearching(conditions) {
        Object.assign(this, conditions, {isSearched: true});
    }

    @action
    stopSearching() {
        Object.assign(this, {
            isSearched: false,
            candidate: undefined
        });
    }

    @action
    registerCandidate(candidate) {
        this.candidate = candidate;
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
    }
}

class EptBuilderStore {
    @observable activeEpt;
    @observable connection;
    @observable catalogue;

    constructor() {
        this.activeEpt = new ActiveEptStore(this);
        this.catalogue = new CatalogueStore(this, primitives.map(ept => new Ept(ept)));
        this.connection = new ConnectionCandidateStore(this);
    }
}

export default new EptBuilderStore();

// Schemas will go below