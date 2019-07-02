import * as Types from '../actionTypes';

const baseClassName = 'text_container';
const defaultBgColorClassName = 'defaultBgColor';
const blackBgColorClassName = 'blackBgColor';

const initialState = {
    isDark: false,
    lightColorClassName: defaultBgColorClassName,
    textContainerClassName: `${baseClassName} ${defaultBgColorClassName}`
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHANGE_MODE_TO_DARK:
            return {
                ...state,
                isDark: true,
                textContainerClassName: `${baseClassName} ${blackBgColorClassName}`
            }
        case Types.CHANGE_MODE_TO_LIGHT:
            return {
                ...state,
                isDark: false,
                textContainerClassName: `${baseClassName} ${state.lightColorClassName}`
            }
        default:
            return state;
    }
}

export default reducer;