import { IROResourceCfg } from "./types";

export const enum ASSETS_NAME {
    GameCfg = "gameCfg",
    Character = "Character",
    FreezeEffect = "FreezeEffect",
    Steam = "Steam",
    Fireplace = "Fireplace",
    Match = "Match",
    Smoke = "Smoke",
    Tape = "Tape",
    TapeWindow = "TapeWindow",
    Window = "Window",
    Bg = "Bg",
    Card2 = "Card2",
    Card3 = "Card3",
    Card4 = "Card4",
    Card5 = "Card5",
    Card6 = "Card6",
    Card7 = "Card7",
    Card8 = "Card8",
    Card9 = "Card9",
    CardBack = "CardBack",
    CardUncknow = "CardUncknow",
    IconMatch = "IconMatch",
    IconTape = "IconTape",
    IconTnt = "IconTnt",
    IconWindow = "IconWindow",
    Button = "Button",
    Hand = "Hand",
    Logo = "Logo",
    Popup = "Popup",
}

export const Assets: ReadonlyArray<IROResourceCfg> = [
    {
        name: ASSETS_NAME.GameCfg,
        path: "assets/jsons/game.json",
        type: "json",
    },
    {
        name: ASSETS_NAME.Character,
        path: "assets/images/game/character/character.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.FreezeEffect,
        path: "assets/images/game/character/freeze_effect.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Steam,
        path: "assets/images/game/character/steam.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Fireplace,
        path: "assets/images/game/interactive/fireplace.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Match,
        path: "assets/images/game/interactive/match.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Smoke,
        path: "assets/images/game/interactive/smoke.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Tape,
        path: "assets/images/game/interactive/tape.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.TapeWindow,
        path: "assets/images/game/interactive/tape_window.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Window,
        path: "assets/images/game/interactive/window.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Bg,
        path: "assets/images/game/bg.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Card2,
        path: "assets/images/ui/cards/card_2.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Card3,
        path: "assets/images/ui/cards/card_3.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Card4,
        path: "assets/images/ui/cards/card_4.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Card5,
        path: "assets/images/ui/cards/card_5.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Card6,
        path: "assets/images/ui/cards/card_6.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Card7,
        path: "assets/images/ui/cards/card_7.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Card8,
        path: "assets/images/ui/cards/card_8.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Card9,
        path: "assets/images/ui/cards/card_9.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.CardBack,
        path: "assets/images/ui/cards/card_back.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.CardUncknow,
        path: "assets/images/ui/cards/card_uncknow.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.IconMatch,
        path: "assets/images/ui/icon/icon_match.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.IconTape,
        path: "assets/images/ui/icon/icon_tape.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.IconTnt,
        path: "assets/images/ui/icon/icon_tnt.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.IconWindow,
        path: "assets/images/ui/icon/icon_window.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Button,
        path: "assets/images/ui/button.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Hand,
        path: "assets/images/ui/hand.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Logo,
        path: "assets/images/ui/logo.png",
        type: "image",
    },
    {
        name: ASSETS_NAME.Popup,
        path: "assets/images/ui/popup.png",
        type: "image",
    },
];
