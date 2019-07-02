import store from '../index';
import CryptoJS from 'crypto-js';
import {
    DATA_LOADING,
    DATA_DECODE,
    UPDATE_TEXT_HTML_BODY
} from '../actionTypes';

const SecurtyKey = CryptoJS.enc.Utf8.parse('wPK8CxWaOwPuVzgs');


export function store_get_text_html_body(uri) {
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
                store.dispatch({ type: UPDATE_TEXT_HTML_BODY, htmlBody: { __html: resultDecipher } });
            }
        });
}