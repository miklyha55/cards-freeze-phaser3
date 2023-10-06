import * as Phaser from 'phaser';

import { Component } from '../core/Component';
import { IROTextCfg } from './types';
import { COMPONENT_EVENTS } from '../core/events';

export class Text extends Component
{
    text: Phaser.GameObjects.Text;

    constructor(props: IROTextCfg) {
        super(props);

        this.text = props.scene.add.text(0, 0, props.text);
        this.text.setFontSize(props.size);

        props.origin && this.text.setOrigin(props.origin.x, props.origin.y);
        props.position && this.text.setPosition(props.position.x, props.position.y);
        props.color && this.text.setColor(props.color);
        props.fontFamily && this.text.setFontFamily(props.fontFamily);

        this.container.add(this.text);
    }

    override onCreate() {
        this.parent.on(COMPONENT_EVENTS.SET_TEXT, this.onSetText, this);
    }

    override onRemove() {
        this.parent.off(COMPONENT_EVENTS.SET_TEXT, this.onSetText, this);
    }

    onSetText(text: string) {
        this.text.setText(text);
    }
}
