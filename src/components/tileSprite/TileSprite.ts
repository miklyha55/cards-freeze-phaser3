import * as Phaser from 'phaser';

import { Component } from '../core/Component';
import { IROTileSpriteCfg } from './types';
import { COMPONENT_EVENTS } from '../core/events';

export class TileSprite extends Component
{
    sprite: Phaser.GameObjects.TileSprite;
    private readonly props: IROTileSpriteCfg;

    constructor(props: IROTileSpriteCfg) {
        super(props);

        this.sprite = props.scene.add.tileSprite(0, 0, props.size.width, props.size.height, props.texture);
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
