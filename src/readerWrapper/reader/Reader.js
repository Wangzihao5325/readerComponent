import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  store_change_mode_to_light,
  store_change_mode_to_dark,
} from '../../store/actions/modeActions';
import {
  store_get_text_html_body
} from '../../store/actions/dataActions';
import './Reader.css';
import Header from '../../component/header/index';
import Footer from '../../component/bottom/index';
import Setting from '../../component/setting/index';
import Variables from '../../global/variables';
import NativeBridge from '../../util/nativeBridge';

import Api from '../../socket/index';

import VConsole from 'vconsole';


class Reader extends Component {

  state = {
    isControllerShow: false,
    isSettingShow: false
  }

  componentDidMount() {
    var vConsole = new VConsole();
    console.log(window.android);

    let fictionData = NativeBridge.getReadingFictionInfo();
    if (fictionData.global_type === 'novel') {
      let chapterData = NativeBridge.getReadingChapterInfo();
      let fictionId = chapterData.fiction_id;
      let chapterId = chapterData.id;
      Api.fetchFictionFileUrl('novel', fictionId, chapterId, (e) => {
        console.log(e);
      });
    } else {
      let fictionId = fictionData.id;
      Api.fetchFictionFileUrl('novelette', fictionId, null, (e) => {
        console.log(e);
      });
    }

    // Api.fetchChapterList(fictionData.id, 'asc', 1, 15, (e) => {
    //   console.log(e);
    // })

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