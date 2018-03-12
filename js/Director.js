import {DataStore} from "./base/DataStore.js";

export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    run() {
        this.dataStore.get('land').draw();
        let timer = requestAnimationFrame(() => {
            this.run()
        })
    }
}