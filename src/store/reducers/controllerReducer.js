import * as Types from '../actionTypes';

const initialState = {
    isDrawerShow: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.DRAWER_STATE_CHANGE:
            return {
                ...state,
                isDrawerShow: !state.isDrawerShow
            }
        case Types.OPEN_DRAWER:
            return {
                ...state,
                isDrawerShow: true
            }
        case Types.CLOSE_DRAWER:
            return {
                ...state,
                isDrawerShow: false
            }
        default: return state
    }
}

export default reducer;