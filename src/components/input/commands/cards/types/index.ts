import { IROContextCfg } from "../../../../../scenes/types";

export interface IROCardCommandCfg {
    readonly context: IROContextCfg;
    readonly parent: Phaser.GameObjects.Container | Phaser.GameObjects.Sprite;
}