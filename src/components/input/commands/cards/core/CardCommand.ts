import * as Phaser from 'phaser';

import { InputCatcher } from "../../../InputCatcher";
import { IROContextCfg } from '../../../../../scenes/types';

export class CardCommand extends InputCatcher {
    constructor(context: IROContextCfg, parent: Phaser.GameObjects.Sprite) {
        super({ scene: context.scenes.gameScene, context, parent });
    }
}
