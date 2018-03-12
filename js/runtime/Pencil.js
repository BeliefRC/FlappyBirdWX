import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Pencil extends Sprite {
    constructor(image, top) {
        const canvas = DataStore.getInstance().canvas;
        super(image, 0, 0, image.width, image.height, 0, canvas.height - image.height, image.width, image.height);
        //陆地移动的速度
        this.moveSpeed = 2;
        this.dx = 0;
        this.image = image;
    }

    draw() {
        const canvas = DataStore.getInstance().canvas;
        const image = Sprite.getImage('land');
        this.dx += this.moveSpeed;
        if (this.dx >= image.width - canvas.width) {
            this.dx = 0;
        }
        super.draw(image, 0, 0, image.width, image.height, -this.dx, canvas.height - image.height, image.width, image.height)
    }
}