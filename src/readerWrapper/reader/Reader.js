import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import NativeBridge from '../../util/nativeBridge';
import * as Params from '../../global/param';
import Api from '../../socket/index';
import Header from '../../component/header/index';
import Footer from '../../component/bottom/index';
import Setting from '../../component/setting/index';
import ChapterList from '../../component/chapterList/index';
import { store_change_mode_to_light, store_change_mode_to_dark } from '../../store/actions/modeActions';
import {
  store_update_chapter_list
} from '../../store/actions/dataActions';
import { store_close_drawer } from '../../store/actions/controllerAction';
import './Reader.css';



class Reader extends Component {

  state = {
    isControllerShow: false,
    isSettingShow: false,
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
          placement="right"
          closable={false}
          onClose={store_close_drawer}
          visible={this.props.isDrawerShow}
          width={281}
        >
          <ChapterList />
        </Drawer>
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
    fictionType: store.data.fictionType,
    isDrawerShow: store.controller.isDrawerShow
  }
}

const ReaderWithStore = connect(mapState2Props)(Reader);
export default ReaderWithStore;