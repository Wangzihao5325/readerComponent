import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import modeReducer from './reducers/modeReducer';
import dataReducer from './reducers/dataReducer';

const rootReducer = combineReducers({
    mode: modeReducer,
    data: dataReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;