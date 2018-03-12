import {ResourcesLoader} from "./js/base/ResourcesLoader.js";
import {DataStore} from "./js/base/DataStore.js";
import {Background} from "./js/runtime/Background.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";

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
        this.dataStore
            .put('background', Background)
            .put('land', Land)
            .put('pencil', []);
        //运行动画
        this.director.run();
    }
}
