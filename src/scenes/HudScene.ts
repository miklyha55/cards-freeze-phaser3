import * as Phaser from 'phaser';

import { SCENE_NAMES } from './constants';
import { IROContextCfg } from './types';
import { UiElements } from '../screens/UiElements';
import { Popup } from '../screens/Popup';
import { COMPONENT_EVENTS } from '../components/core/events';
import { Utils } from '../utils';
import { Tutorial } from '../prefabs/tutorial/Tutorial';
import { UiRedirect } from '../screens/UiRedirect';
import { Timer } from '../prefabs/timer/Timer';
import { CardsOpen } from '../prefabs/openCard/CardsOpen';

export default class HudScene extends Phaser.Scene {
    uiRedirect: UiRedirect;
    uiElements: UiElements;
    popup: Popup;
    tutorial: Tutorial;
    timer: Timer;
    cardsOpen: CardsOpen;

    constructor() {
        super(SCENE_NAMES.HudScene);
    }

    async create(context: IROContextCfg) {
        this.uiRedirect = new UiRedirect({ context });
        this.uiElements = new UiElements({ context });
        this.popup = new Popup({ context });
        this.tutorial = new Tutorial({ context });
        this.timer = new Timer({ context, minutes: 0, seconds: 30 });
        this.cardsOpen = new CardsOpen({ context });

        this.popup.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, false, false);
        this.uiElements.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, false, false);
        
        this.timer.toggleTimer(false);
        await this.popupShow();
        this.uiElements.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, true);
    }

    private async popupShow() {
        await Utils.delay(700);

        this.popup.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, true);
        await this.popup.showEffect();

        await Utils.delay(2000);

        this.popup.hideEffect();
        this.popup.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, false);
    }
}
