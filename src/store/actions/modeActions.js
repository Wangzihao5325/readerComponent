import store from '../index';
import {
    CHANGE_MODE_TO_LIGHT,
    CHANGE_MODE_TO_DARK,
    UPDATE_SLIDER_VALUE,
    CHANGE_LIGHT_BG_COLOR,
    CHANGE_ASC
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

export function store_change_light_bg_color(index, keepDarkSet) {
    store.dispatch({ type: CHANGE_LIGHT_BG_COLOR, index, keepDarkSet });
}

export function store_change_data_list_asc() {
    store.dispatch({ type: CHANGE_ASC });
}