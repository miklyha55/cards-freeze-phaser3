import * as Phaser from 'phaser';

import { CardCommand } from './core/CardCommand';
import { IROCardCommandCfg } from './types';
import { COMPONENT_EVENTS } from '../../../core/events';
import { Utils } from '../../../../utils';

export class CardTapeCommand extends CardCommand {
    private isPressed: boolean;

    constructor(props: IROCardCommandCfg) {
        super(props);
    }

    override async onPointerDown(pointer: Phaser.Input.Pointer) {
        this.isPressed = true;
        this.context.scenes.gameScene.explosion.start({
            x: Utils.getWorldPosition(this.parent).x + this.context.scenes.gameScene.cameras.main.scrollX,
            y: Utils.getWorldPosition(this.parent).y + this.context.scenes.gameScene.cameras.main.scrollY,
        });

        this.context.scenes.hudScene.cardsOpen.resetCards();
        this.context.scenes.hudScene.cardsOpen.hideTutorial();

        await this.context.scenes.gameScene.window.tapAnimation();
        await Utils.delay(500);
        await this.context.scenes.gameScene.cameraManager.cameraBack(200);
        
        this.context.scenes.hudScene.uiElements.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, true);
        this.context.scenes.hudScene.uiElements.cardsSelect.showTutorial();
    }

    override onPointerUp(pointer: Phaser.Input.Pointer) {
        this.isPressed = false;
    }

    override onPointerMove(pointer: Phaser.Input.Pointer) {
        if(this.isPressed) {}
    }
}
