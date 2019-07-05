import React, { Component } from 'react';
import { Spin, message as Message } from 'antd';
import NativeBridge from '../util/nativeBridge';
import Variables from '../global/variables';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../global/size';
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


window.updateValue = function (url) {
    if (window.ZQ_bridge !== undefined) {
        window.ZQ_bridge.updateValue(url);
    }
};

window.setZQ_bridge = function (callback) {
    window.ZQ_bridge = callback;
};

export default class InitialComponent extends Component {

    componentDidMount() {


        var vConsole = new VConsole();
        window.setZQ_bridge(NativeBridge);

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
        let index = 0;
        let headerTitle = title;
        if (global_type === Params.Nnovel) {
            let chapterData = NativeBridge.getReadingChapterInfo();
            index = chapterData.index;
            chapterId = chapterData.id;
            headerTitle = chapterData.title;
        }
        Api.fetchFictionFileUrl(global_type, id, chapterId, index, (e, code, message) => {
            if (code === 200) {
                let result = NativeBridge.buyFiction(id, global_type, 'true');
                if (result === 'success') {
                    NativeBridge.buySuccess();
                } else if (result === 'failed') {
                    Message.error('购买失败!');
                    setTimeout(NativeBridge.backToNative, 1000);

                } else if (result === 'cancel') {
                    Message.error('您已经取消购买!');
                    setTimeout(NativeBridge.backToNative, 1000);
                }
            } else {
                store_get_text_html_body(e.href, global_type);
                store_update_data_info_danger({ title: headerTitle, fictionTitle: title, chapterIndex: index });//危险方法
            }
        });

    }

    render() {
        return (
            <div style={{ height: CLIENT_HEIGHT, width: CLIENT_WIDTH, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Spin />
            </div>
        );
    }
}