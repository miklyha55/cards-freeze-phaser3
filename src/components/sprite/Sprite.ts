import * as Phaser from 'phaser';

import { Component } from '../core/Component';
import { IROSpriteCfg } from './types';
import { COMPONENT_EVENTS } from '../core/events';

export class Sprite extends Component
{
    sprite: Phaser.GameObjects.Sprite;
    private readonly props: IROSpriteCfg;

    constructor(props: IROSpriteCfg) {
        super(props);

        this.sprite = props.scene.add.sprite(0, 0, props.texture);
        this.props = props;

        this.container.add(this.sprite);
    }

    override onCreate() {
        this.parent.on(COMPONENT_EVENTS.SET_TEXTURE, this.onSetTexture, this);
    }

    override onRemove() {
        this.parent.off(COMPONENT_EVENTS.SET_TEXTURE, this.onSetTexture, this);
    }

    onSetTexture(key: string) {
        this.sprite.setTexture(key);
    }
}
