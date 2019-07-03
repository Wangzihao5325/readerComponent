import CryptoJS from 'crypto-js';
import { browser } from '../util/browserTest';
import { message as WebToast } from 'antd';

const IsSecurty = true;
const PlatformStr = browser.versions.ios ? 'I' : 'A';
//const InterfaceKey_Origin = 'kVqduMOzInPFEfEN';
const InterfaceKey = CryptoJS.enc.Utf8.parse('kVqduMOzInPFEfEN');
const SignKey_Origin = 'USR6M7OlTZwNC55E';
//const SignKey = CryptoJS.enc.Utf8.parse('USR6M7OlTZwNC55E');

// const OriginKey = '1s1z1GYRRNZRSJam';
// const SecurtyKey = CryptoJS.enc.Utf8.parse('1s1z1GYRRNZRSJam');

class api {

    getSign(paramObj) {
        let str = '';
        for (let item in paramObj) {
            let value = paramObj[item];
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
            str = `${str}${item}=${value}&`;
        }
        str = `${str}key=${SignKey_Origin}`;
        //console.log(`md5_Str==${str}`);
        const hash = CryptoJS.MD5(str).toString();
        return hash.toUpperCase();
    }

    securtyFetch(url, paramObj, onSuccess, onError) {
        //console.log('/*******************SecurtyFetch_Start/************************');
        //console.log(`url_Str==${url}`);
        const sign = this.getSign(paramObj);
        let paramObjReg = { ...paramObj };
        paramObjReg.sign = sign;

        const paramObjStr = JSON.stringify(paramObjReg);
        const encryptedData = CryptoJS.AES.encrypt(paramObjStr, InterfaceKey, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        let securtyReg = encodeURI(encryptedData.toString());
        //console.log(`securty_Body===${securtyReg}`);

        let formData = new FormData();
        formData.append('data', securtyReg);

        this.unsecurtyFetch(url, formData, (result, code, message) => {
            //解密
            let resultDecipher = null;
            if (result) {
                let decodeUrl = decodeURIComponent(result);
                let bytes = CryptoJS.AES.decrypt(decodeUrl, InterfaceKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7, iv: '', });
                resultDecipher = JSON.parse(CryptoJS.enc.Utf8.stringify(bytes));
            }
            if (onSuccess) {
                onSuccess(resultDecipher, code, message);
            }
        }, onError);
    }

    unsecurtyFetch(url, formData, onSuccess, onError) {
        const fullUrl = `${SERVICE_URL.DomainUrl}${url}`;

        let headerDataReg = { platform: PlatformStr };
        if (Variables.account.token) {
            headerDataReg = { Authorization: `Bearer ${Variables.account.token}`, platform: PlatformStr };
        }

        const headerDataRegStr = JSON.stringify(headerDataReg);
        const encryptedData = CryptoJS.AES.encrypt(headerDataRegStr, InterfaceKey, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        let securtyHeader = encodeURI(encryptedData.toString());
        //console.log(`header===${securtyHeader}`);

        let header = { Accept: 'application/json', data: securtyHeader };

        let obj = { method: 'POST', headers: header, body: formData };

        fetch(fullUrl, obj).then((response) => response.json())
            .then(
                (reponseJson) => {
                    //console.log('unEncode_Object===');
                    //console.log(reponseJson);
                    const result = reponseJson.result ? reponseJson.result : null;
                    const code = (reponseJson.code || reponseJson.code === 0) ? reponseJson.code : null;
                    const message = reponseJson.message ? reponseJson.message : null;
                    try {
                        if (code === 0 || code === 200) {
                            onSuccess(result, code, message);
                        } else {
                            if (code === 401) {
                                WebToast.error('您的账号正在异地登陆,请重新登陆！');
                            } else {
                                WebToast.error(message);
                            }
                        }
                    } catch (error) {
                        onError ? onError(result, code, message) : console.log(`error: socket error! ${error}`);
                    }
                }
            )
    }

    normalFetch(url, formData, onSuccess, onError) {
        const fullUrl = `${SERVICE_URL.DomainUrl}${url}`;

        let header = { Accept: 'application/json', platform: PlatformStr };

        if (Variables.account.token) {
            header = { Accept: 'application/json', platform: PlatformStr, Authorization: `Bearer ${Variables.account.token}` };
        }

        let obj = { method: 'POST', headers: header, body: formData };

        fetch(fullUrl, obj).then((response) => response.json())
            .then(
                (reponseJson) => {
                    const result = reponseJson.result ? reponseJson.result : null;
                    const code = (reponseJson.code || reponseJson.code === 0) ? reponseJson.code : 0;
                    const message = reponseJson.message ? reponseJson.message : null;
                    try {
                        if (code === 0 || code === 200) {
                            onSuccess(result, code, message);
                        } else {
                            if (code === 401) {
                                ToastsStore.error('您的账号正在异地登陆,请重新登陆！');
                            } else {
                                ToastsStore.error(message);
                            }
                        }
                    } catch (error) {
                        onError ? onError(result, code, message) : console.log(`error: socket error! ${error}`);
                    }
                }
            )
    }

    fetchAppNotice(onSuccess, onError) {
        const url = '/api/notice';
        const timestamp = (new Date().getTime() / 1000).toFixed(0);

        if (!IsSecurty) {
            let formData = new FormData();
            formData.append('timestamp', timestamp);
            this.normalFetch(url, formData, onSuccess, onError);
            return;
        }

        let paramObj = {
            platform: PlatformStr,
            timestamp
        }

        this.securtyFetch(url, paramObj, onSuccess, onError);

    }
}
