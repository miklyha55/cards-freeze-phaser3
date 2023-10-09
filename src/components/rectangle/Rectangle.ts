import * as Phaser from 'phaser';

import { Component } from '../core/Component';
import { IRORectangleCfg } from './types';

export class Rectangle extends Component
{
    rectangle: Phaser.GameObjects.Rectangle;
    private readonly props: IRORectangleCfg;

    constructor(props: IRORectangleCfg) {
        super(props);

        this.rectangle = props.scene.add.rectangle(
            props.position.x, 
            props.position.y,
            props.size.width,
            props.size.height,
            props.fillColor,
            props.fillAlpha,
        );
        this.props = props;

        this.container.add(this.rectangle);
    }
}
