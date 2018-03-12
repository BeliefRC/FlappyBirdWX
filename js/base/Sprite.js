import {DataStore} from "./DataStore.js";

/**
 * 精灵类，之允许被继承使用
 */
export class Sprite {
    /**
     * img 传入Image对象
     * srcX 要剪裁的起始X坐标
     * srcY 要剪裁的起始Y坐标
     * srcW 剪裁的宽度
     * srcH 剪裁的高度
     * x 放置的x坐标
     * y 放置的y坐标
     * width 要使用的宽度
     * height 要使用的高度
     */
    constructor(image, sx = 0, sy = 0,
                sWidth = 0,
                sHeight = 0,
                dx = 0, dy = 0,
                dWidth = 0, dHeight = 0) {
        // this.canvas = DataStore.getInstance().canvas;
        this.draw(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    }

    static getImage(key) {
        return DataStore.getInstance().resourcesMap.get(key);
    }

    draw(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        const ctx = DataStore.getInstance().ctx;
        ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    }
}