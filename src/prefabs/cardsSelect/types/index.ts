import { CardSelectCommand } from "../../../components/input/commands/CardSelectCommand";
import { IOrientationCfg } from "../../../components/resize/types";
import { Glow } from "../../../effects/glow/Glow";
import { IROPrefabCfg } from "../../../managers/gameObject/types";

export interface IROCardSelectCfg extends IROPrefabCfg {
    readonly resize: IROCardSelectOrientationCfg;
    readonly texture: string;
    glowEffect?: Glow;
    interractive?: IROCardInterractiveCfg;
    IsUnknow?: true;
}

export interface IROCardSelectOrientationCfg {
    readonly portrait?: IOrientationCfg;
    readonly landscape?: IOrientationCfg;
}

export interface IROCardInterractiveCfg {
    readonly commandHandler: () => (indexes: Indexes) => void;
    readonly command: typeof CardSelectCommand;
}

export type Indexes = number[];

