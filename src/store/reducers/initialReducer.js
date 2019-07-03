import * as Types from '../actionTypes';

const initialState = {
    isInitial: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.INITIAL_DONE:
            return {
                ...state,
                isInitial: true
            }
        default: return state;
    }
}

export default reducer;