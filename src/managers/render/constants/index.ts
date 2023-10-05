export const enum RENDER_LAYERS_NAME {
    Bg = "Bg",
    UiElements = "UiElements",
    Popup = "Popup",
    Character = "Character",
    Enviroment = "Enviroment",
    CardsStack = "CardsStack",
}

export const RENDER_GAME_LAYERS: string[] = [
    RENDER_LAYERS_NAME.Bg,
    RENDER_LAYERS_NAME.Enviroment,
    RENDER_LAYERS_NAME.Character,
]

export const RENDER_UI_LAYERS: string[] = [
    RENDER_LAYERS_NAME.UiElements,
    RENDER_LAYERS_NAME.CardsStack,
    RENDER_LAYERS_NAME.Popup,
]
