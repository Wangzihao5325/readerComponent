import React, { Component } from 'react';
import { CLIENT_WIDTH } from '../../global/size';
import { connect } from 'react-redux';
import { Slider } from 'antd';
import './index.css';
import { store_update_data_info_danger, store_get_text_html_body } from '../../store/actions/dataActions';
import NativeBridge from '../../util/nativeBridge';
import * as Params from '../../global/param';
import Api from '../../socket/index';

class Progress extends Component {

    handleChange = value => {
        let title = this.props.chapterList[value].title
        store_update_data_info_danger({ progressShowChapterIndex: value, progressShowChapterTitle: title });
    }

    afterChange = value => {
        const { _id, fiction_id, title, index } = this.props.chapterList[value];
        Api.fetchFictionFileUrl(Params.Nnovel, fiction_id, _id, index, (e, code) => {
            if (code === 200) {
                NativeBridge.buyFiction(_id, Params.Nnovel);
            } else {
                store_get_text_html_body(e.href, Params.Nnovel);
            }
        });
        store_update_data_info_danger({ title, chapterId: _id, progressShowChapterIndex: index, progressShowChapterTitle: title });//危险方法
    }

    render() {
        let title = this.props.title.length >= 15 ? `${this.props.title.slice(0, 10)}...` : this.props.title;
        return (
            <div
                style={{ width: CLIENT_WIDTH, height: 90, position: 'fixed', left: 0, bottom: 64, backgroundColor: '#222', paddingLeft: 12, paddingRight: 12, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: '#e6e6e6' }}>{'《 上一章'}</div>
                    <div style={{ color: '#e6e6e6' }}>{title}</div>
                    <div style={{ color: '#e6e6e6' }}>{'下一章 》'}</div>
                </div>
                <div style={{ flex: 1 }}>
                    <Slider min={this.props.firstIndex} max={this.props.lastIndex} onAfterChange={this.afterChange} onChange={this.handleChange} value={this.props.progressIndex} tipFormatter={null} />
                </div>
            </div>
        );
    }
}

function mapState2Props(store) {
    return {
        title: store.data.progressShowChapterTitle,
        firstIndex: store.data.firstChapterIndex,
        lastIndex: store.data.lastChapterIndex,
        progressIndex: store.data.progressShowChapterIndex,
        chapterList: store.data.chapterList
    }
}

const ProgressWithStore = connect(mapState2Props)(Progress);
export default ProgressWithStore;