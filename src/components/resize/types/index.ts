import { ISize, IVec2 } from "../../../utils/types";
import { IROComponentCfg } from "../../core/types";

export interface IROResizeCfg extends IROComponentCfg {
    landscape: IOrientationCfg;
    portrait: IOrientationCfg;
    parent?: Phaser.GameObjects.Container| Phaser.GameObjects.Sprite | Phaser.GameObjects.Text,
}

export interface IOrientationCfg {
    relativePosition?: IVec2;
    absolutePosition?: IVec2;
    scale?: IVec2;
    size?: ISize;
    origin?: IVec2;
}
