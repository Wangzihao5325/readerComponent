import React, { Component } from 'react';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js';
import { store_change_mode_to_light, store_change_mode_to_dark } from './store/actions/modeActions';
import './Reader.css';
import Header from './component/header/index';
import Footer from './component/bottom/index';
import Setting from './component/setting/index';

const SecurtyKey = CryptoJS.enc.Utf8.parse('wPK8CxWaOwPuVzgs');

class Reader extends Component {

  state = {
    htmlBody: null,
    isControllerShow: false,
    isSettingShow: false
  }

  componentDidMount() {
    let uri = 'http://192.168.0.146:50005/FICTION/6d/d1/126dd102847cfa08177a3e898c466e9aadb5b22315.fiction';
    fetch(uri).then(res => res.blob())
      .then((blob) => {
        var reader = new window.FileReader();
        reader.readAsText(blob);
        reader.onloadend = () => {
          var content = reader.result;
          let decodeUrl = decodeURIComponent(content);
          let bytes = CryptoJS.AES.decrypt(decodeUrl, SecurtyKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7, iv: '', });
          let resultDecipher = CryptoJS.enc.Utf8.stringify(bytes);
          this.setState({
            htmlBody: { __html: resultDecipher }
          });
        }
      });
  }


  render() {
    if (this.state.htmlBody) {
      return (
        <div className={this.props.textContainerClassName}>
          {this.state.isControllerShow && <Header />}
          <div onClick={this.textOnClick} dangerouslySetInnerHTML={this.state.htmlBody} />
          {this.state.isControllerShow && this.state.isSettingShow &&
            <Setting />
          }
          {this.state.isControllerShow &&
            <Footer
              primaryChange={this.darkPrimary}
              openSettingPage={this.openSettingPage}
            />
          }
        </div>
      );
    } else {
      return (
        <div>no data</div>
      );
    }
  }

  textOnClick = () => {
    this.setState((preState) => {
      let regState = { isControllerShow: !preState.isControllerShow };
      if (preState.isControllerShow) {
        regState.isSettingShow = false; //controller隐藏时自动隐藏setting
      }
      return regState;
    });
  }

  darkPrimary = () => {
    if (this.props.isDark) {
      store_change_mode_to_light();
    } else {
      store_change_mode_to_dark();
    }
  }

  openSettingPage = () => {
    this.setState((preState) => {
      return {
        isSettingShow: !preState.isSettingShow
      }
    });
  }

}

function mapState2Props(store) {
  return {
    isDark: store.mode.isDark,
    textContainerClassName: store.mode.textContainerClassName
  }
}

const ReaderWithStore = connect(mapState2Props)(Reader);
export default ReaderWithStore;