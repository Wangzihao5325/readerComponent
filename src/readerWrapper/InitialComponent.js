import React, { Component } from 'react';
import { Spin } from 'antd';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../global/size';
import { store_initial_done } from '../store/actions/initialActions';
import {
    store_change_mode_to_dark,
    store_update_slider_value,
    store_change_light_bg_color
} from '../store/actions/modeActions';
import {
    store_get_text_html_body
} from '../store/actions/dataActions';
import NativeBridge from '../util/nativeBridge';


export default class InitialComponent extends Component {

    componentDidMount() {
        /**
         * 读取并还原阅读设置
         */
        if (window.localStorage.sliderValue) {
            let sliderValue = parseInt(window.localStorage.sliderValue);
            store_update_slider_value(sliderValue);
        }
        if (window.localStorage.isDark) {
            let isDark = parseInt(window.localStorage.isDark) === 0 ? false : true;
            if (isDark) {
                store_change_mode_to_dark();
            }
        }
        if (window.localStorage.lightColorSelectIndex) {
            let lightColorSelectIndex = parseInt(window.localStorage.lightColorSelectIndex);
            store_change_light_bg_color(lightColorSelectIndex, true);
        }

        /**
         * 配置请求参数
         */

        // let token = NativeBridge.getUserToken();
        // console.log(token);

        // let aaa= window.android.request('/common/notice',JSON.stringify({}));
        // alert(aaa);

        
        store_get_text_html_body('http://192.168.0.146:50005/fiction_content/0a/df/120adf6d50bb5cec621b1975e40906d91c335e9162.fiction');
        //setTimeout(store_initial_done, 1000); //初始化完毕
    }

    render() {
        return (
            <div style={{ height: CLIENT_HEIGHT, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Spin />
            </div>
        );
    }
}