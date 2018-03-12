import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Background extends Sprite {
    constructor() {
        const image = Sprite.getImage('background');
        const canvas = DataStore.getInstance().canvas;
        super(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
    }
}