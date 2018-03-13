import {ResourcesLoader} from "./js/base/ResourcesLoader.js";
import {DataStore} from "./js/base/DataStore.js";
import {Background} from "./js/runtime/Background.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";

export class Main {
    constructor() {
        this.canvas = document.querySelector('#game_canvas');
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

    //项目初始化，将精灵存储到到dataStore中
    init() {
        //初始化游戏未结束
        this.director.isGameover = false;
        this.dataStore
            .put('background', Background)
            .put('land', Land)
            .put('pencils', [])
            .put('birds', Birds);
        //游戏运行前创建一组铅笔
        this.director.createPencils();
        //运行动画
        this.director.run();
    }
}
