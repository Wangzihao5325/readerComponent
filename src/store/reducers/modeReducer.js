import * as Types from '../actionTypes';

const baseClassName = 'text_container';

const defaultBgColorClassName = 'defaultBgColor';
const blueBgColorClassName = 'blurBgColor';
const greenBgColorClassName = 'greenBgColor';
const whiteBgColorClassName = 'whiteBgColor';
const blackBgColorClassName = 'blackBgColor';

const defaultFontSizeClassName = 'default_fontSize';
const defaultFontSizeClassNamePlus = 'default_fontSizeP1';
const defaultFontSizeClassNamePlus2 = 'default_fontSizeP2';
const defaultFontSizeClassNamePlus3 = 'default_fontSizeP3';

const defaultFontSizeClassNameMinus = 'default_fontSizeM1';
const defaultFontSizeClassNameMinus2 = 'default_fontSizeM2';
const defaultFontSizeClassNameMinus3 = 'default_fontSizeM3';


const initialState = {
    isDark: false,
    sliderValue: 4,
    lightColorSelectIndex: 0,
    lightColorClassName: defaultBgColorClassName,
    fontSizeClassName: defaultFontSizeClassName,
    textContainerClassName: `${baseClassName} ${defaultBgColorClassName} ${defaultFontSizeClassName}`
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHANGE_MODE_TO_DARK:
            return {
                ...state,
                isDark: true,
                textContainerClassName: `${baseClassName} ${blackBgColorClassName} ${state.fontSizeClassName}`
            }
        case Types.CHANGE_MODE_TO_LIGHT:
            return {
                ...state,
                isDark: false,
                textContainerClassName: `${baseClassName} ${state.lightColorClassName} ${state.fontSizeClassName}`
            }
        case Types.UPDATE_SLIDER_VALUE:
            let fontSizeClassName = state.fontSizeClassName;
            switch (action.sliderValue) {
                case 1:
                    fontSizeClassName = defaultFontSizeClassNameMinus3;
                    break;
                case 2:
                    fontSizeClassName = defaultFontSizeClassNameMinus2;
                    break;
                case 3:
                    fontSizeClassName = defaultFontSizeClassNameMinus;
                    break;
                case 4:
                    fontSizeClassName = defaultFontSizeClassName;
                    break;
                case 5:
                    fontSizeClassName = defaultFontSizeClassNamePlus;
                    break;
                case 6:
                    fontSizeClassName = defaultFontSizeClassNamePlus2;
                    break;
                case 7:
                    fontSizeClassName = defaultFontSizeClassNamePlus3;
                    break;
            }
            return {
                ...state,
                fontSizeClassName,
                sliderValue: action.sliderValue,
                textContainerClassName: `${baseClassName} ${state.isDark ? blackBgColorClassName : state.lightColorClassName} ${fontSizeClassName}`
            }

        case Types.CHANGE_LIGHT_BG_COLOR:
            let lightBgColorClassName = defaultBgColorClassName;
            switch (action.index) {
                case 0:
                    lightBgColorClassName = defaultBgColorClassName;
                    break;
                case 1:
                    lightBgColorClassName = blueBgColorClassName;
                    break;
                case 2:
                    lightBgColorClassName = greenBgColorClassName;
                    break;
                case 3:
                    lightBgColorClassName = whiteBgColorClassName;
                    break;
            }
            return {
                ...state,
                isDark: false,
                lightColorSelectIndex: action.index,
                lightColorClassName: lightBgColorClassName,
                textContainerClassName: `${baseClassName} ${lightBgColorClassName} ${state.fontSizeClassName}`
            }
        default:
            return state;
    }
}

export default reducer;