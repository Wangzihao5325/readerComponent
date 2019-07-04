import React, { Component } from 'react';
import { Spin } from 'antd';
import NativeBridge from '../util/nativeBridge';
import Variables from '../global/variables';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../global/size';
import {
    store_initial_done
} from '../store/actions/initialActions';
import {
    store_change_mode_to_dark,
    store_update_slider_value,
    store_change_light_bg_color
} from '../store/actions/modeActions';
import {
    store_get_text_html_body,
    store_update_data_info_danger
} from '../store/actions/dataActions';
import Api from '../socket/index';
import * as Params from '../global/param';

import VConsole from 'vconsole';

export default class InitialComponent extends Component {

    componentDidMount() {
        var vConsole = new VConsole();

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

        //配置参数
        let token = NativeBridge.getUserToken();
        if (token) Variables.account.token = token;

        let domain = NativeBridge.getDomain();
        if (domain) Variables.service.domain = domain;

        let deviceCode = NativeBridge.getDeviceCode();
        if (deviceCode) Variables.account.deviceCode = deviceCode;

        //请求数据
        let { id, global_type, title } = NativeBridge.getReadingFictionInfo();
        let chapterId = null;
        let headerTitle = title;
        if (global_type === Params.Nnovel) {
            let chapterData = NativeBridge.getReadingChapterInfo();
            chapterId = chapterData.id;
            headerTitle = chapterData.title;
        }
        Api.fetchFictionFileUrl(global_type, id, chapterId, (e) => {
            store_get_text_html_body(e.href, global_type);
        });
        store_update_data_info_danger({ title: headerTitle, fictionTitle: title, chapterId });//危险方法
    }

    render() {
        return (
            <div style={{ height: CLIENT_HEIGHT, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Spin />
            </div>
        );
    }
}