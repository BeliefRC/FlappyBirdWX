import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";

export class PencilDown extends Pencil {
    constructor(top) {
        const image = Sprite.getImage('pencilDown');
        super(image, top);
    }

    draw() {
        //1/4图片高度
        let gap = (this.dHeight / 4) + 10;
        this.dy = this.top + gap;
        super.draw();
    }
}