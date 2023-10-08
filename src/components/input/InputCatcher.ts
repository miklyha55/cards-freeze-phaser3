import * as Phaser from 'phaser';

import { Component } from '../core/Component';
import { IROContextCfg } from '../../scenes/types';
import { IROCommandCfg } from './types';

export class InputCatcher extends Component {
    protected readonly context: IROContextCfg;

    constructor({ scene, context, parent }: IROCommandCfg) {
        super({
            name: "InputCatcher",
            scene,
        })

        if(parent) {
            this.parent = parent;
        }

        this.context = context;
    }

    override onCreate() {
        this.parent.setInteractive();

        this.parent.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
        this.parent.on(Phaser.Input.Events.POINTER_UP , this.onPointerUp, this);
        this.parent.on(Phaser.Input.Events.POINTER_MOVE , this.onPointerMove, this);
    }

    override onRemove() {
        this.parent.off(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
        this.parent.off(Phaser.Input.Events.POINTER_UP , this.onPointerUp, this);
        this.parent.off(Phaser.Input.Events.POINTER_MOVE , this.onPointerMove, this);
    }

    protected onPointerDown(pointer: Phaser.Input.Pointer) {}
    protected onPointerUp(pointer: Phaser.Input.Pointer) {}
    protected onPointerMove(pointer: Phaser.Input.Pointer) {}
}
