import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import * as Params from '../../global/param';
import Api from '../../socket/index';
import { store_get_text_html_body, store_update_data_info_danger } from '../../store/actions/dataActions';
import { store_change_data_list_asc } from '../../store/actions/modeActions';
import NativeBridge from '../../util/nativeBridge';
import * as BrowserUtil from '../../util/browserUtil';

class Item extends Component {
    render() {
        let title = this.props.item.title.length >= 15 ? `${this.props.item.title.slice(0, 10)}...` : this.props.item.title;
        let titleStyle = this.props.chapterIndex === this.props.item.index ? { flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 16, color: '#ED424B' } : { flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 16 };
        return (
            <div onClick={this.itemOnClick} style={{ width: '100%', height: 40, display: 'flex', flexDirection: 'column', paddingLeft: 24 }}>
                <div style={titleStyle}>
                    {title}
                </div>
                <div style={{ height: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.05)' }} />
            </div>
        );
    }

    itemOnClick = () => {
        const { _id, fiction_id, title, index } = this.props.item;
        Api.fetchFictionFileUrl(Params.Nnovel, fiction_id, _id, index, (e, code) => {
            if (code === 200) {
                NativeBridge.buyFiction(_id, Params.Nnovel);
            } else {
                store_get_text_html_body(e.href, Params.Nnovel);
                store_update_data_info_danger({ title, chapterId: _id, progressShowChapterIndex: index, progressShowChapterTitle: title, chapterIndex: index });//危险方法
                BrowserUtil.backToTop();
            }
        });
    }
}


class ChapterList extends Component {

    render() {
        let title = this.props.fictionTitle.length > 10 ? `${this.props.fictionTitle.slice(0, 7)}...` : this.props.fictionTitle;
        let chapterNum = `共${this.props.data.length}章`;
        let data = this.props.data.concat();
        let ascText = '倒序';
        if (!this.props.isAsc) {
            data.reverse();
            ascText = '正序'
        }
        return (
            <div>
                <div
                    style={{
                        height: 38,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 20,
                        color: '#ED424B',
                        borderBottomColor: '#ED424B',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid'
                    }}>
                    {title}
                </div>
                <div
                    style={{
                        height: 38,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 14,
                        borderBottomColor: 'rgba(0,0,0,0.05)',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        paddingLeft: 12,
                        paddingRight: 12,
                    }}>
                    <div style={{ color: '#000', fontWeight: 'bold' }}>{chapterNum}</div>
                    <div onClick={this.changeAsc} style={{ color: '#F00', fontWeight: 'bold' }}>{ascText}</div>
                </div>
                <List
                    dataSource={data}
                    renderItem={(item, index) => <Item key={index} chapterIndex={this.props.chapterIndex} item={item} />}
                />
            </div>
        );
    }

    changeAsc = () => {
        store_change_data_list_asc();
    }
}

function mapState2Props(store) {
    return {
        data: store.data.chapterList,
        title: store.data.title,
        chapterIndex: store.data.chapterIndex,
        fictionTitle: store.data.fictionTitle,
        isAsc: store.mode.isAsc
    }
}

const ChapterWithStore = connect(mapState2Props)(ChapterList);
export default ChapterWithStore;