import store from '../index';
import {
    DRAWER_STATE_CHANGE,
    OPEN_DRAWER,
    CLOSE_DRAWER
} from '../actionTypes';

export function store_drawer_state_change() {
    store.dispatch({ type: DRAWER_STATE_CHANGE });
}

export function store_open_drawer() {
    store.dispatch({ type: OPEN_DRAWER });
}

export function store_close_drawer() {
    store.dispatch({ type: CLOSE_DRAWER });
}