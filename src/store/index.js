import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import modeReducer from './reducers/modeReducer';

const rootReducer = combineReducers({
    mode: modeReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;