import * as Phaser from 'phaser';

import { SCENE_NAMES } from './constants';
import { IROContextCfg } from './types';
import { Logo } from '../prefabs/Logo';
import { Button } from '../prefabs/Button';
import { UiElements } from '../screens/UiElements';

export default class HudScene extends Phaser.Scene {
   private uiElements: UiElements;

    constructor() {
        super(SCENE_NAMES.HudScene);
    }

    create(context: IROContextCfg) {
        this.uiElements = new UiElements({ context });
    }
}
