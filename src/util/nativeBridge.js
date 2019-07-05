import { browser } from './browserTest';
import Api from '../socket/index';
import { store_get_text_html_body, store_update_data_info_danger } from '../store/actions/dataActions';
import * as Params from '../global/param';

class nativeBridge {

    backToNative() {
        if (browser.versions.android) {
            window.android.finishActivity();
        }
        if (browser.versions.ios) {
            prompt("Back://");
        }
    }

    getUserToken() {
        let token = null;
        if (browser.versions.android) {
            token = window.android.getUserToken();
        }
        if (browser.versions.ios) {
            token = prompt("UserToken://");
        }
        return token;
    }

    getDomain() {
        let domain = null;
        if (browser.versions.android) {
            domain = window.android.getDomain();
        }
        if (browser.versions.ios) {
            domain = prompt("Domain://");
        }
        return domain;
    }

    getDeviceCode() {
        let deviceCode = null;
        if (browser.versions.android) {
            deviceCode = window.android.getDeviceCode();
        }
        if (browser.versions.ios) {
            deviceCode = prompt("DeviceCode://");
        }
        return deviceCode;
    }

    getUserInfo() {
        let info = null;
        if (browser.versions.android) {
            info = window.android.getUserInfo();
        }
        if (browser.versions.ios) {
            info = prompt("UserInfo://");
        }
        return info;
    }

    getReadingFictionInfo() {//获取当前小说的信息
        let jsonStr = '';
        if (browser.versions.android) {
            jsonStr = window.android.getFictionInfo();
        }
        if (browser.versions.ios) {
            jsonStr = prompt("FictionInfo://");
        }
        return JSON.parse(jsonStr);
    }

    getReadingChapterInfo() {
        let jsonStr = '';
        if (browser.versions.android) {
            jsonStr = window.android.getFictionFolder();
        }
        if (browser.versions.ios) {
            jsonStr = prompt("FictionFolder://");
        }
        return JSON.parse(jsonStr);
    }

    buyFiction(id, type) {
        if (browser.versions.android) {
            window.android.buyFiction(id, type);
        }
        if (browser.versions.ios) {
            //
        }
    }

    buySuccess() {
        //请求数据
        let { id, global_type, title } = this.getReadingFictionInfo();
        let chapterId = null;
        let index = 0;
        let headerTitle = title;
        if (global_type === Params.Nnovel) {
            let chapterData = this.getReadingChapterInfo();
            index = chapterData.index;
            chapterId = chapterData.id;
            headerTitle = chapterData.title;
        }
        Api.fetchFictionFileUrl(global_type, id, chapterId, index, (e, code, message) => {
            if (code === 200) {
                //window.android.buyFiction(id, global_type);
            } else {
                store_get_text_html_body(e.href, global_type);
            }
        });
        store_update_data_info_danger({ title: headerTitle, fictionTitle: title, chapterId });//危险方法
    }

}

export default new nativeBridge();