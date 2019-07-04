import store from '../index';
import CryptoJS from 'crypto-js';
import {
    DATA_LOADING,
    DATA_DECODE,
    UPDATE_TEXT_HTML_BODY,
    UPDATE_CHAPTER_LIST,
    UPDATE_DATA_INFO
} from '../actionTypes';
import { store_initial_done } from './initialActions';

const SecurtyKey = CryptoJS.enc.Utf8.parse('wPK8CxWaOwPuVzgs');


export function store_get_text_html_body(uri, fictionType) {
    store.dispatch({ type: DATA_LOADING });

    fetch(uri).then(res => res.blob())
        .then((blob) => {
            store.dispatch({ type: DATA_DECODE });
            var reader = new window.FileReader();
            reader.readAsText(blob);
            reader.onloadend = () => {
                var content = reader.result;
                let decodeUrl = decodeURIComponent(content);
                let bytes = CryptoJS.AES.decrypt(decodeUrl, SecurtyKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7, iv: '', });
                let resultDecipher = CryptoJS.enc.Utf8.stringify(bytes);
                store.dispatch({ type: UPDATE_TEXT_HTML_BODY, htmlBody: { __html: resultDecipher }, fictionType });
                let isInitial = store.getState().initial.isInitial;
                if (!isInitial) setTimeout(store_initial_done, 10);
            }
        });
}

export function store_update_chapter_list(chapterList) {
    store.dispatch({ type: UPDATE_CHAPTER_LIST, chapterList });
}

export function store_update_data_info_danger(infoObj) {
    store.dispatch({ type: UPDATE_DATA_INFO, infoObj });
}