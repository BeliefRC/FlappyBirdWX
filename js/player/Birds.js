import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Birds extends Sprite {
    constructor() {
        const image = Sprite.getImage('birds');
        super(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
        //小鸟的三种状态需要一个数组去存储
        //小鸟的宽是34，小鸟的高度是24，上下边距是10，小鸟左右边距是9
        const canvas = DataStore.getInstance().canvas;
        this.sxArr = [9, 9 + 34 + 18, 9 + 34 + 18 + 34 + 19];
        this.sy = 10;
        this.width = 34;
        this.height = 24;
        this.dx = canvas.width / 4;
        this.dy = canvas.height / 2;
        this.temporaryY = canvas.height / 2;
        //需要使用小鸟的序号;每过count帧更换一次小鸟;下落的时间
        this.index = 0;
        this.count = 0;
        this.time = 0;
    }

    draw() {
        const image = Sprite.getImage('birds'), g = 0.4, offsetUp = 30;
        this.time++;
        this.count++;
        if (this.count === 5) {
            this.index++;
            this.count = 0;
        }
        if (this.index === 3) {
            this.index = 0;
        }
        let offsetY = (g * this.time * (this.time - offsetUp)) / 2;
        this.dy = this.temporaryY + offsetY;
        super.draw(image,
            this.sxArr[this.index], this.sy,
            this.width, this.height,
            this.dx, this.dy,
            this.width, this.height)
    }
}