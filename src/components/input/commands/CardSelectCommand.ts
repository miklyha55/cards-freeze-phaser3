import * as Phaser from 'phaser';

import { InputCatcher } from "../InputCatcher";
import { IROContextCfg } from '../../../scenes/types';
import { Indexes } from '../../../prefabs/cardsSelect/types';

export class CardSelectCommand extends InputCatcher {
    private isPressed: boolean;
    private commandHandler: () => (indexes: Indexes) => void;

    constructor(
        context: IROContextCfg,
        parent: Phaser.GameObjects.Sprite,
        commandHandler: () => (indexes: Indexes) => void
    ) {
        super({ scene: context.scenes.gameScene, context, parent });

        this.commandHandler = commandHandler;
    }

    override onPointerDown(pointer: Phaser.Input.Pointer) {
        this.isPressed = true;

        if(!this.active) {
            return;
        }
        
        this.commandHandler();
    }

    override onPointerUp(pointer: Phaser.Input.Pointer) {
        this.isPressed = false;
    }

    override onPointerMove(pointer: Phaser.Input.Pointer) {
        if(this.isPressed) {}
    }
}
