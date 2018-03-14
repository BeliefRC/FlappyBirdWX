import {ResourcesLoader} from "./js/base/ResourcesLoader.js";
import {DataStore} from "./js/base/DataStore.js";
import {Background} from "./js/runtime/Background.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    constructor() {
      this.canvas = wx.createCanvas()
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const resourcesLoader = new ResourcesLoader();
        resourcesLoader.onAllLoaded((resourceMap) => {
            this.onFirstLoaded(resourceMap);
        });
    }

    //资源第一次加载完成
    onFirstLoaded(resourceMap) {
        const dataStore = this.dataStore;
        dataStore.canvas = this.canvas;
        dataStore.ctx = this.ctx;
        dataStore.resourcesMap = resourceMap;
        this.init()
    }

    //注册时间
    registerEvent() {
      wx.onTouchStart( e => {
            if (!this.director.isGameover) {
                this.director.birdFly();
            } else {
                const x = e.changedTouches[0].pageX, y = e.changedTouches[0].pageY;
                const width = this.dataStore.resourcesMap.get('startButton').width;
                const height = this.dataStore.resourcesMap.get('startButton').height;
                const minx = (DataStore.getInstance().canvas.width - width) / 2;
                const maxX = (DataStore.getInstance().canvas.width - width) / 2 + width;
                const minY = (DataStore.getInstance().canvas.height - width) / 2.5;
                const maxY = (DataStore.getInstance().canvas.height - width) / 2.5 + height;
                if (x >= minx && x < maxX && y <= maxY && y >= minY) {
                    this.init();
                }
            }
        })
    }

    //项目初始化，将精灵存储到到dataStore中
    init() {
      // 播放音频
      const audio = wx.createInnerAudioContext()
      audio.src = './audios/bgm.mp3' 
      audio.play()
        //初始化游戏未结束
        this.director.isGameover = false;
        this.dataStore
            .putSprite('background', Background)
            .putSprite('land', Land)
            .putSprite('pencils', [])
            .putSprite('birds', Birds)
            .putSprite('score', Score)
            .putSprite('startButton', StartButton);
        this.registerEvent();
        //游戏运行前创建一组铅笔
        this.director.createPencils();
        //运行动画
        this.director.run();
    }
}
