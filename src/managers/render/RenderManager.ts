import * as Phaser from 'phaser';

import { Factory } from "./factory";
import { CameraBox } from '../../prefabs/CameraBox';

export class RenderManager
{
    private readonly layers: Array<Phaser.GameObjects.Container>;

    constructor(scene: Phaser.Scene, renderLayers: string[], caberaBox?: CameraBox) {
        this.layers = Factory.CreateLayers(scene, renderLayers, caberaBox);
    }

    getLayerByName(name: string) {
        return this.layers.find((layer) => layer.name === name);
    }
}
