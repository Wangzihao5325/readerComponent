import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import {
  store_change_mode_to_light,
  store_change_mode_to_dark,
} from '../../store/actions/modeActions';
import {
  store_update_chapter_list
} from '../../store/actions/dataActions';
import './Reader.css';
import Header from '../../component/header/index';
import Footer from '../../component/bottom/index';
import Setting from '../../component/setting/index';
import Variables from '../../global/variables';
import NativeBridge from '../../util/nativeBridge';
import * as Params from '../../global/param';
import Api from '../../socket/index';

import VConsole from 'vconsole';


class Reader extends Component {

  state = {
    isControllerShow: false,
    isSettingShow: false,
    isDrawerShow: false
  }

  componentDidMount() {
    if (this.props.fictionType === Params.Nnovel) {
      let { id } = NativeBridge.getReadingFictionInfo();
      Api.fetchChapterList(id, Params.Asc, 1, 100, (e) => {
        if (e) {
          store_update_chapter_list(e);
        }
      });
    }
  }


  render() {
    return (
      <div className={this.props.textContainerClassName} style={{ position: 'relative' }}>
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
        <Drawer
          bodyStyle={{ backgroundColor: 'rgb(34,34,34)', padding: 0 }}
          placement="right"
          closable={false}
          onClose={this.draweOnClose}
          visible={this.state.isDrawerShow}
          width={281}
        >
          11223
        </Drawer>
      </div>
    );
  }

  draweOnClose = () => {
    this.setState({
      isDrawerShow:true
    });
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
    fictionType: store.data.fictionType
  }
}

const ReaderWithStore = connect(mapState2Props)(Reader);
export default ReaderWithStore;