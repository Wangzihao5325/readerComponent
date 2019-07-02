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
            token = window.android.finishActivity();
        }
        if (browser.versions.ios) {

        }
        return token;
    }

    getReadingChapterInfo() {
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