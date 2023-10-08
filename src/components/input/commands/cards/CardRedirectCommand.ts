import * as Phaser from 'phaser';

import { CardCommand } from './core/CardCommand';
import { IROCardCommandCfg } from './types';

export class CardRedirectCommand extends CardCommand {
    private isPressed: boolean;

    constructor(props: IROCardCommandCfg) {
        super(props);
    }

    override async onPointerDown(pointer: Phaser.Input.Pointer) {
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
