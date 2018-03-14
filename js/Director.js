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

    //创建两个高度随机的铅笔
    createPencils() {
        const minTop = this.dataStore.canvas.height / 5,
            maxTop = this.dataStore.canvas.height / 2,
            top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.getSprite('pencils').push(new PencilUp(top));
        this.dataStore.getSprite('pencils').push(new PencilDown(top));
    }

    //小鸟飞起来
    birdFly() {
        let birds = this.dataStore.getSprite('birds');
        birds.temporaryY = birds.dy;
        birds.time = 0;
    }


    //碰撞检查
    check() {
        const canvas = this.dataStore.canvas,
            bird = this.dataStore.getSprite('birds'),
            land = this.dataStore.getSprite('land'),
            pencils = this.dataStore.getSprite('pencils');
        //地面,天空碰撞检查
        if (bird.dy + bird.height >= land.dy || bird.dy <= 0) {
            this.isGameover = true;
        }
        // 铅笔碰撞检查
        const birdBorder = {
            top: bird.dy,
            right: bird.dx + bird.width,
            bottom: bird.dy + bird.height,
            left: bird.dx
        };
        pencils.map((pencil, index) => {
            const pencilBorder = {
                top: pencil.dy,
                right: pencil.dx + pencil.image.width,
                bottom: pencil.dy + pencil.image.height,
                left: pencil.dx
            };
            //小鸟刚好在铅笔的下方或上方
            if (birdBorder.right >= pencilBorder.left && birdBorder.left < pencilBorder.right) {
                if (index % 2 === 0) {
                    //上铅笔
                    if (birdBorder.top <= pencilBorder.bottom) {
                        this.isGameover = true;
                    }
                } else {
                    //下铅笔
                    if (birdBorder.bottom >= pencilBorder.top) {
                        this.isGameover = true;
                    }
                }
            }

        });
        //加分
        const score = this.dataStore.getSprite('score');
        if (birdBorder.left > pencils[0].dx + pencils[0].image.width&&score.isScore) {
            score.scoreNumber++;
            score.isScore = false;
            // 震动
            wx.vibrateShort({
              success: function () {
                console.log('振动成功');
              }
            });
        }
    }

    run() {
        this.check();
        if (!this.isGameover) {
            this.dataStore.getSprite('background').draw();
            let pencils = this.dataStore.getSprite('pencils');
            if (pencils[0].dx < (this.dataStore.canvas.width - pencils[0].dWidth) / 2 && pencils.length === 2) {
                this.createPencils();
            }
            //有4支铅笔&&第一支铅笔右边刚好消失在屏幕
            if (pencils.length === 4 && pencils[0].dx === -pencils[0].dWidth) {
                pencils.splice(0, 2);
                this.dataStore.getSprite('score').isScore = true;
            }
            pencils.map(pencil => {
                pencil.draw()
            });
            this.dataStore.getSprite('land').draw();
            this.dataStore.getSprite('score').draw();
            this.dataStore.getSprite('birds').draw();
            let timer = requestAnimationFrame(() => {
                this.run()
            });
            this.dataStore.putSprite('timer', timer)
        } else {
            this.dataStore.getSprite('startButton').draw();
            let timer = this.dataStore.getSprite('timer');
            cancelAnimationFrame(timer);
            this.dataStore.destroy();
            // 议在每局游戏开始或结束触发一下'垃圾回收'
            wx.triggerGC() 
        }
    }
}