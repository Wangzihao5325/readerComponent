import * as Types from '../actionTypes';
const initialState = {
    isDark: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHANGE_MODE_TO_DARK:
            return {
                ...state,
                isDark: true
            }
        case Types.CHANGE_MODE_TO_LIGHT:
            return {
                ...state,
                isDark: false
            }
        default:
            return state;
    }
}

export default reducer;