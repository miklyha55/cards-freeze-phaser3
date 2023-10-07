import * as Phaser from 'phaser';

import { SCENE_NAMES } from './constants';
import { IROContextCfg } from './types';
import { UiElements } from '../screens/UiElements';
import { Popup } from '../screens/Popup';
import { COMPONENT_EVENTS } from '../components/core/events';
import { Utils } from '../utils';
import { CardsStack } from '../prefabs/cardStack/CardsStack';
import { CardsOpen } from '../prefabs/openCard/CardsOpen';
import { Timer } from '../prefabs/timer/Timer';
import { Tutorial } from '../prefabs/tutorial/Tutorial';
import { CardsSelect } from '../prefabs/selectCard/CardsSelect';

export default class HudScene extends Phaser.Scene {
    uiElements: UiElements;
    popup: Popup;
    cardsStack: CardsStack;
    cardsOpen: CardsOpen;
    timer: Timer;
    tutorial: Tutorial;
    cardsSelect: CardsSelect;

    constructor() {
        super(SCENE_NAMES.HudScene);
    }

    create(context: IROContextCfg) {
        this.uiElements = new UiElements({ context });

        this.popup = new Popup({ context });
        this.popup.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, false, false);
        
        this.cardsStack = new CardsStack({ context });
        this.cardsOpen = new CardsOpen({ context });
        this.tutorial = new Tutorial({ context });
        this.timer = new Timer({ context, minutes: 2, seconds: 14 });
        this.cardsSelect = new CardsSelect({ context });
        
        // this.popupShow();
    }

    private async popupShow() {
        await Utils.delay(1000);

        this.popup.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, true);
        await this.popup.showEffect();

        await Utils.delay(2000);

        this.popup.hideEffect();
        this.popup.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, false);
    }
}
