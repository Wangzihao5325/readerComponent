import * as Types from '../actionTypes';
import * as Params from '../../global/param';

const initialState = {
    state: 'done',
    htmlBody: null,
    fictionType: Params.Nnovel
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
                htmlBody: action.htmlBody,
                fictionType: action.fictionType ? action.fictionType : state.fictionType
            }
        default: return state
    }
}

export default reducer;