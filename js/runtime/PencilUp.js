import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";

export class PencilUp extends Pencil {
    constructor(top) {
        const image = Sprite.getImage('pencilUp');
        super(image, top);
    }

    draw() {
        this.dy = this.top - this.dHeight;
        super.draw();
    }
}