import {DataStore} from "./base/DataStore.js";
import {PencilUp} from "./runtime/PencilUp.js";
import {PencilDown} from "./runtime/PencilDown.js";

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

    createPencils() {
        const minTop = this.dataStore.canvas.height / 5,
            maxTop = this.dataStore.canvas.height / 2,
            top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new PencilUp(top));
        this.dataStore.get('pencils').push(new PencilDown(top));
    }

    run() {
        this.dataStore.get('background').draw();
        let pencils = this.dataStore.get('pencils');

        if (pencils[0].dx < (this.dataStore.canvas.width - pencils[0].dWidth) / 2 && pencils.length === 2) {
            this.createPencils();
        }
        if (pencils.length === 4 && pencils[0].dx === -pencils[0].dWidth) {
            pencils.splice(0, 2);
        }
        pencils.map(pencil => {
            pencil.draw()
        });
        this.dataStore.get('land').draw();
        let timer = requestAnimationFrame(() => {
            this.run()
        })
    }
}