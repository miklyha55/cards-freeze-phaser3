import { IROPrefabCfg } from "../../../managers/gameObject/types";

export interface IROTimerCfg extends IROPrefabCfg {
    readonly minutes: number,
    readonly seconds: number,
}