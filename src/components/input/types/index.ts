import { IROContextCfg } from "../../../scenes/types";

export interface IROCommandCfg {
    readonly scene: Phaser.Scene,
    readonly context: IROContextCfg,
    readonly parent?: Phaser.GameObjects.Container | Phaser.GameObjects.Sprite
}