import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';

class Item extends Component {
    render() {
        let title = this.props.item.title.length >= 15 ? `${this.props.item.title.slice(0, 10)}...` : this.props.item.title;
        return (
            <div style={{ width: '100%', height: 40, display: 'flex', flexDirection: 'column', paddingLeft: 24 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 16 }}>
                    {title}
                </div>
                <div style={{ height: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.05)' }} />
            </div>
        );
    }
}

class ChapterList extends Component {
    render() {
        let title = this.props.title.length > 10 ? `${this.props.title.slice(0, 7)}...` : this.props.title;
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
                    renderItem={item => <Item item={item} />}
                />
            </div>
        );
    }
}

function mapState2Props(store) {
    return {
        data: store.data.chapterList,
        title: store.data.title
    }
}

const ChapterWithStore = connect(mapState2Props)(ChapterList);
export default ChapterWithStore;