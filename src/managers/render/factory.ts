import * as Phaser from 'phaser';

import { CameraBox } from '../../prefabs/CameraBox';

export class Factory {
    static CreateLayers(scene: Phaser.Scene, layerKeys: Array<string>, caberaBox?: CameraBox) {
        const layers: Array<Phaser.GameObjects.Container> = [];

        layerKeys.forEach(key => {
            const layer: Phaser.GameObjects.Container = scene.add.container(0, 0);

            layer.name = key;
            layers.push(layer);

            if(caberaBox) {
                caberaBox.gameObject.container.add(layer);
            }
        });

        return layers;
    }
}
