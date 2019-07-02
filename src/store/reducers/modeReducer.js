import * as Types from '../actionTypes';

const baseClassName = 'text_container';

const defaultBgColorClassName = 'defaultBgColor';
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
        default:
            return state;
    }
}

export default reducer;