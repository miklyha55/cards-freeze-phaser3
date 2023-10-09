import { ISize, IVec2 } from "../../../utils/types";
import { IROComponentCfg } from "../../core/types";

export interface IROResizeCfg extends IROComponentCfg {
    readonly landscape: IOrientationCfg;
    readonly portrait: IOrientationCfg;
    readonly parent?: Phaser.GameObjects.Container | Phaser.GameObjects.Sprite | Phaser.GameObjects.Text | Phaser.GameObjects.TileSprite,
}

export interface IOrientationCfg {
    readonly relativePosition?: IVec2;
    readonly absolutePosition?: IVec2;
    readonly scale?: IVec2;
    readonly size?: ISize;
    readonly origin?: IVec2;
}
