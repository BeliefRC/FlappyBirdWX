import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";

export class PencilDown extends Pencil {
    constructor(top) {
        const image = Sprite.getImage('pencilDown');
        super(image, top);
    }

    draw() {
        //1/5图片高度
        let gap = this.dHeight / 5;
        this.dy = this.top + gap;
        super.draw();
    }
}