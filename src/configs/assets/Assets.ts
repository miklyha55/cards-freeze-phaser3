import { IROResourceCfg } from "./types";

export const enum ASSETS_NAME {
    GameCfg = "gameCfg",
}

export const Assets: ReadonlyArray<IROResourceCfg> = [
    {
        name: ASSETS_NAME.GameCfg,
        path: "assets/jsons/game.json",
        type: "json",
    },
];
