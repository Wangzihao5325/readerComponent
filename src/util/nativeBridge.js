import { browser } from './browserTest';

class nativeBridge {

    backToNative() {
        if (browser.versions.android) {
            window.android.finishActivity();
        }
        if (browser.versions.ios) {

        }
    }

    getUserToken() {
        let token = null;
        if (browser.versions.android) {
            token = window.android.getUserToken();
        }
        if (browser.versions.ios) {

        }
        return token;
    }

    getDomain() {
        let domain = null;
        if (browser.versions.android) {
            domain = window.android.getDomain();
        }
        if (browser.versions.ios) {

        }
        return domain;
    }

    getDeviceCode() {
        let deviceCode = null;
        if (browser.versions.android) {
            deviceCode = window.android.getDeviceCode();
        }
        if (browser.versions.ios) {

        }
        return deviceCode;
    }

    getUserInfo() {
        let info = null;
        if (browser.versions.android) {
            info = window.android.getUserInfo();
        }
        if (browser.versions.ios) {

        }
        return info;
    }

    getReadingChapterInfo() {//获取当前小说的信息
        let jsonStr = '';
        if (browser.versions.android) {
            jsonStr = window.android.getFictionInfo();
        }
        if (browser.versions.ios) {

        }
        return JSON.parse(jsonStr);
    }

}

export default new nativeBridge();