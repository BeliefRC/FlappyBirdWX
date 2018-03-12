import {DataStore} from "./DataStore.js";

/**
 * 精灵类，之允许被继承使用
 */
export class Sprite {
    /**
     * image 传入Image对象
     * srcX 要剪裁的起始X坐标
     * srcY 要剪裁的起始Y坐标
     * srcW 剪裁的宽度
     * srcH 剪裁的高度
     * dx 放置的x坐标
     * dy 放置的y坐标
     * dWidth 要使用的宽度
     * dHeight 要使用的高度
     */
    constructor(image = null,
                sx = 0, sy = 0,
                sWidth = 0, sHeight = 0,
                dx = 0, dy = 0,
                dWidth = 0, dHeight = 0) {
        // this.canvas = DataStore.getInstance().canvas;
        this.image = image;
        this.sx = sx;
        this.sy = sy;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.dx = dx;
        this.dy = dy;
        this.dWidth = dWidth;
        this.dHeight = dHeight
    }

    static getImage(key) {
        return DataStore.getInstance().resourcesMap.get(key);
    }

    draw(image = this.image,
         sx = this.sx, sy = this.sy,
         sWidth = this.sWidth, sHeight = this.sHeight,
         dx = this.dx, dy = this.dy,
         dWidth = this.dWidth, dHeight = this.dHeight) {
        const ctx = DataStore.getInstance().ctx;
        ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    }
}