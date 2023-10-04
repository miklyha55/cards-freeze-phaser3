import * as Phaser from 'phaser';

import { SCENE_NAMES } from './constants';
import { IROContextCfg } from './types';
import { UiElements } from '../screens/UiElements';
import { Popup } from '../prefabs/Popup';

export default class HudScene extends Phaser.Scene {
    uiElements: UiElements;
    popup: Popup;

    constructor() {
        super(SCENE_NAMES.HudScene);
    }

    create(context: IROContextCfg) {
        this.uiElements = new UiElements({ context });
        this.popup = new Popup({ context });
    }
}
