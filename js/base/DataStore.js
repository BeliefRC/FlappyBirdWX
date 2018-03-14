export class DataStore {
    constructor() {
        this.spritesMap = new Map();
    }

    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance
    }

    //根据key从精灵map中取出数据
    getSprite(key) {
        return this.spritesMap.get(key)
    }

    //添加精灵到精灵map中
    putSprite(key, value) {
        if (Object.prototype.toString.call(value) === '[object Function]') {
            value = new value()
        }
        this.spritesMap.set(key, value);
        return this
    }

    destroy() {
        this.spritesMap.clear()
    }
}