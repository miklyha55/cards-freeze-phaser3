import { CardCommand } from "../../../components/input/commands/cards/core/CardCommand";

export interface IROOpenCardsCfg {
    readonly target: Phaser.GameObjects.Container | Phaser.GameObjects.Sprite;
    readonly textureLeft: string;
    readonly textureRight: string;

    readonly commandLeft: typeof CardCommand;
    readonly commandRight: typeof CardCommand;
}