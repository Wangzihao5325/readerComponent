import * as Types from '../actionTypes';

const initialState = {
    state: 'done',
    htmlBody: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.DATA_LOADING:
            return {
                ...state,
                state: 'loading'
            }
        case Types.DATA_DECODE:
            return {
                ...state,
                state: 'decode'
            }
        case Types.UPDATE_TEXT_HTML_BODY:
            return {
                ...state,
                state: 'done',
                htmlBody: action.htmlBody
            }
        default: return state
    }
}

export default reducer;