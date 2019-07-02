import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  store_change_mode_to_light,
  store_change_mode_to_dark,
  store_update_slider_value,
  store_change_light_bg_color
} from './store/actions/modeActions';
import {
  store_get_text_html_body
} from './store/actions/dataActions';
import './Reader.css';
import Header from './component/header/index';
import Footer from './component/bottom/index';
import Setting from './component/setting/index';
import { Spin } from 'antd';
import { CLIENT_WIDTH, CLIENT_HEIGHT } from './global/size';

class Reader extends Component {

  state = {
    isControllerShow: false,
    isSettingShow: false
  }

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
     * 获取数据
     */
    store_get_text_html_body('http://192.168.0.146:50005/FICTION/6d/d1/126dd102847cfa08177a3e898c466e9aadb5b22315.fiction');

  }


  render() {
    return (
      <div className={this.props.textContainerClassName} style={{ position: 'relative' }}>
        {this.props.appState !== 'done' && <div style={{ height: 30, width: 30, position: 'absolute', top: CLIENT_HEIGHT / 2 - 15, left: CLIENT_WIDTH / 2 - 15, zIndex: 10 }}><Spin /></div>}
        {this.state.isControllerShow && <Header />}
        {this.props.htmlBody && <div onClick={this.textOnClick} dangerouslySetInnerHTML={this.props.htmlBody} />}
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
    textContainerClassName: store.mode.textContainerClassName,
    htmlBody: store.data.htmlBody,
    appState: store.data.state,
  }
}

const ReaderWithStore = connect(mapState2Props)(Reader);
export default ReaderWithStore;