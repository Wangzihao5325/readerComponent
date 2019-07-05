import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import * as Params from '../../global/param';
import Api from '../../socket/index';
import { store_get_text_html_body, store_update_data_info_danger } from '../../store/actions/dataActions';
import NativeBridge from '../../util/nativeBridge';

class Item extends Component {
    render() {
        let title = this.props.item.title.length >= 15 ? `${this.props.item.title.slice(0, 10)}...` : this.props.item.title;
        let titleStyle = this.props.chapterId === this.props.item._id ? { flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 16, color: '#ED424B' } : { flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 16 };
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
            }
        });
        store_update_data_info_danger({ title, chapterId: _id, progressShowChapterIndex: index, progressShowChapterTitle: title });//危险方法
    }
}

class ChapterList extends Component {
    render() {
        let title = this.props.fictionTitle.length > 10 ? `${this.props.fictionTitle.slice(0, 7)}...` : this.props.fictionTitle;
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
                <List
                    dataSource={this.props.data}
                    renderItem={item => <Item chapterId={this.props.chapterId} item={item} />}
                />
            </div>
        );
    }
}

function mapState2Props(store) {
    return {
        data: store.data.chapterList,
        title: store.data.title,
        chapterId: store.data.chapterId,
        fictionTitle: store.data.fictionTitle
    }
}

const ChapterWithStore = connect(mapState2Props)(ChapterList);
export default ChapterWithStore;