import * as Phaser from 'phaser';

import { Component } from '../core/Component';
import { IROSpriteCfg } from './types';
import { COMPONENT_EVENTS } from '../core/events';
import { IROOrientationCfg } from '../resize/types';

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

        if(!this.props.resize) {
            return;
        }

        this.scene.scale.on('resize', this.onResize, this);

        this.onResize();
    }

    override onRemove() {
        this.parent.off(COMPONENT_EVENTS.SET_TEXTURE, this.onSetTexture, this);
    }

    private onSetTexture(key: string) {
        this.sprite.setTexture(key);
    }

    private onResize() {
        const { innerWidth, innerHeight } = window;
        const isLandscape: boolean = (innerWidth / innerHeight) > 1;
        const orientation: IROOrientationCfg = isLandscape ? this.props.resize.landscape : this.props.resize.portrait;

        orientation.absolutePosition && this.sprite.setPosition(orientation.absolutePosition.x, orientation.absolutePosition.y);
        orientation.scale && this.sprite.setScale(orientation.scale.x, orientation.scale.y);
        orientation.origin && this.sprite.setOrigin( orientation.origin.x, orientation.origin.y);
    }
}
