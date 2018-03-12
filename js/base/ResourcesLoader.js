import {Resource} from "./Resources.js";

/**
 * 资源加载器
 */
export class ResourcesLoader {
    constructor() {
        //存放图片资源
        this.resourcesMap = new Map(Resource);
        for (let [key, value] of this.resourcesMap) {
            const image = new Image();
            image.src = value;
            this.resourcesMap.set(key, image)
        }
    }

    //确保所有图片加载完成
    onAllLoaded(cb) {
        let loadCount = 0;
        for (let image of this.resourcesMap.values()) {
            image.onload = () => {
                loadCount++;
                if (loadCount === this.resourcesMap.size) {
                    cb(this.resourcesMap)
                }
            }
        }
    }
}