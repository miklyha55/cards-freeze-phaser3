import * as Phaser from 'phaser';

import { IROComponentCfg } from './types';

export class Component {
    name: string;
    container: Phaser.GameObjects.Container;
    parent: Phaser.GameObjects.Container | Phaser.GameObjects.Sprite | Phaser.GameObjects.Text | Phaser.GameObjects.TileSprite;
    active: boolean;
    
    protected scene: Phaser.Scene;

    constructor(props: IROComponentCfg) {
        this.name = props.name;
        this.scene = props.scene;
        this.container = props.scene.add.container(0, 0);
        this.active = true;
    }

    remove() {}

    onRemove() {}
    onCreate() {}
}
