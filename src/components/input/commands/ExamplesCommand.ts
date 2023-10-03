import * as Phaser from 'phaser';

import { InputCatcher } from "../InputCatcher";
import { IROContextCfg } from '../../../scenes/types';

export class CompareCommand extends InputCatcher {
    private isPressed: boolean;

    constructor(context: IROContextCfg) {
        super(context.scenes.gameScene, context);
    }

    override onPointerDown(pointer: Phaser.Input.Pointer) {
        this.isPressed = true;
    }

    override onPointerUp(pointer: Phaser.Input.Pointer) {
        this.isPressed = false;
    }

    override onPointerMove(pointer: Phaser.Input.Pointer) {
        if(this.isPressed) {}
    }
}
