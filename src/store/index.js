import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import modeReducer from './reducers/modeReducer';
import dataReducer from './reducers/dataReducer';
import initialReducer from './reducers/initialReducer';
import controllerReducer from './reducers/controllerReducer';

const rootReducer = combineReducers({
    mode: modeReducer,
    data: dataReducer,
    initial: initialReducer,
    controller: controllerReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;