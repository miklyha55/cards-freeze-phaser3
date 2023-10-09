import * as Phaser from 'phaser';

import { SCENE_NAMES } from './constants';
import { IROContextCfg } from './types';
import { Bg } from '../prefabs/bg/Bg';
import { Character } from '../prefabs/Character';
import { CameraManager } from '../managers/camera/CameraManager';
import { Window } from '../prefabs/Window';
import { Fireplace } from '../prefabs/Fireplace';
import { ASSETS_NAME } from '../configs/assets/Assets';
import { Snow } from '../effects/snow/Snow';
import { Explosion } from '../effects/explosion/Explosion';

export default class GameScene extends Phaser.Scene {
    bg: Bg;
    character: Character;
    window: Window;
    fireplace: Fireplace;
    cameraManager: CameraManager;
    snow: Snow;
    explosion: Explosion;

    constructor() {
        super(SCENE_NAMES.GameScene);
    }

    async create(context: IROContextCfg) {
        this.bg = new Bg({context});
        this.window = new Window({context});
        this.character = new Character({context});
        this.fireplace = new Fireplace({context});

        this.cameraManager = new CameraManager(this);
        this.snow = new Snow(this);
        this.explosion = new Explosion(this, ASSETS_NAME.Snow);
    }
}
