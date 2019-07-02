import store from '../index';
import {
    CHANGE_MODE_TO_LIGHT,
    CHANGE_MODE_TO_DARK,
    UPDATE_SLIDER_VALUE
} from '../actionTypes';

export function store_change_mode_to_light() {
    store.dispatch({ type: CHANGE_MODE_TO_LIGHT });
}

export function store_change_mode_to_dark() {
    store.dispatch({ type: CHANGE_MODE_TO_DARK });
}

export function store_update_slider_value(value) {
    store.dispatch({ type: UPDATE_SLIDER_VALUE, sliderValue: value });
}