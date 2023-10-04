import * as Phaser from 'phaser';

import { InputCatcher } from "../InputCatcher";
import { IROContextCfg } from '../../../scenes/types';

export class UiElementsCommand extends InputCatcher {
    private isPressed: boolean;

    constructor(context: IROContextCfg, parent: Phaser.GameObjects.Sprite) {
        super({ scene: context.scenes.gameScene, context, parent });
    }

    override onPointerDown(pointer: Phaser.Input.Pointer) {
        this.isPressed = true;

        console.log("Redirect");
    }

    override onPointerUp(pointer: Phaser.Input.Pointer) {
        this.isPressed = false;
    }

    override onPointerMove(pointer: Phaser.Input.Pointer) {
        if(this.isPressed) {}
    }
}
