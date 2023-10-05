import * as Phaser from 'phaser';

import { InputCatcher } from "../InputCatcher";
import { IROContextCfg } from '../../../scenes/types';

export class RedirectCommand extends InputCatcher {
    private isPressed: boolean;

    constructor(context: IROContextCfg, parent: Phaser.GameObjects.Sprite) {
        super({ scene: context.scenes.gameScene, context, parent });
    }

    override onPointerDown(pointer: Phaser.Input.Pointer) {
        this.isPressed = true;
    }

    override onPointerUp(pointer: Phaser.Input.Pointer) {
        this.isPressed = false;

        const url: string = 'https://play.google.com/store/apps/details?id=com.bfk.cards';

        window.open(url, '_blank');
    }

    override onPointerMove(pointer: Phaser.Input.Pointer) {
        if(this.isPressed) {}
    }
}
