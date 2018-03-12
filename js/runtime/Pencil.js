import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Pencil extends Sprite {
    constructor(image, top) {
        const canvas = DataStore.getInstance().canvas;
        super(image,
            0, 0,
            image.width, image.height,
            canvas.width, 0,
            image.width, image.height);
        //陆地移动的速度
        this.moveSpeed = 2;
        this.top = top;
    }

    draw() {
        this.dx -= this.moveSpeed;
        super.draw(this.image,
            0, 0,
            this.image.width, this.image.height,
            this.dx, this.dy,
            this.image.width, this.image.height)
    }
}