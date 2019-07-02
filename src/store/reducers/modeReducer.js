import * as Types from '../actionTypes';

const baseClassName = 'text_container';

const defaultBgColorClassName = 'defaultBgColor';
const blackBgColorClassName = 'blackBgColor';

const defaultFontSizeClassName = 'default_fontSize';

const initialState = {
    isDark: false,
    sliderValue: 4,
    lightColorClassName: defaultBgColorClassName,
    fontSizeColorName: defaultFontSizeClassName,
    textContainerClassName: `${baseClassName} ${defaultBgColorClassName} ${defaultFontSizeClassName}`
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHANGE_MODE_TO_DARK:
            return {
                ...state,
                isDark: true,
                textContainerClassName: `${baseClassName} ${blackBgColorClassName} ${state.fontSizeColorName}`
            }
        case Types.CHANGE_MODE_TO_LIGHT:
            return {
                ...state,
                isDark: false,
                textContainerClassName: `${baseClassName} ${state.lightColorClassName} ${state.fontSizeColorName}`
            }
        default:
            return state;
    }
}

export default reducer;