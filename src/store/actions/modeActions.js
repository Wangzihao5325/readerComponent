import store from '../index';
import {
    CHANGE_MODE_TO_LIGHT,
    CHANGE_MODE_TO_DARK
} from '../actionTypes';

export function store_change_mode_to_light() {
    store.dispatch({ type: CHANGE_MODE_TO_LIGHT });
}

export function store_change_mode_to_light() {
    store.dispatch({ type: CHANGE_MODE_TO_DARK });
}