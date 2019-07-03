import store from '../index';
import {
    INITIAL_DONE,
} from '../actionTypes';

export function store_initial_done() {
    store.dispatch({ type: INITIAL_DONE });
}