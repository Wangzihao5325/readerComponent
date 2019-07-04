import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';

class Item extends Component {
    render() {
        const { title } = this.props.item;
        return (
            <div style={{ width: '100%', height: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'rgb(198,198,198)' }}>{title}</div>
        );
    }
}

class ChapterList extends Component {
    render() {
        return (
            <List
                dataSource={this.props.data}
                renderItem={item => <Item item={item} />}
            />
        );
    }
}

function mapState2Props(store) {
    return {
        data: store.data.chapterList
    }
}

const ChapterWithStore = connect(mapState2Props)(ChapterList);
export default ChapterWithStore;