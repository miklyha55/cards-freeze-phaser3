import * as Phaser from 'phaser';

import { SCENE_NAMES } from './constants';
import { IROContextCfg } from './types';
import { Bg } from '../prefabs/bg/Bg';
import { Character } from '../prefabs/Character';
import { CameraManager } from '../managers/camera/CameraManager';
import { Window } from '../prefabs/Window';
import { Fireplace } from '../prefabs/Fireplace';

export default class GameScene extends Phaser.Scene {
    bg: Bg;
    character: Character;
    window: Window;
    fireplace: Fireplace;
    cameraManager: CameraManager;

    constructor() {
        super(SCENE_NAMES.GameScene);
    }

    create(context: IROContextCfg) {
        this.bg = new Bg({context});
        this.window = new Window({context});
        this.character = new Character({context});
        this.fireplace = new Fireplace({context});

        this.cameraManager = new CameraManager({
            name: "CameraManager",
            scene: this,
            portrait: {
                relativePosition: { x: -0.5, y: -0.5 },
                scale: { x: 1.5, y: 1.5 },
            },
            landscape: {
                relativePosition: { x: -0.5, y: -0.3 },
                scale: { x: 0.9, y: 0.9 },
            }
        });
    }
}
