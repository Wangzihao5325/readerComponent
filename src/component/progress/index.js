import React, { Component } from 'react';
import { CLIENT_WIDTH } from '../../global/size';
import { connect } from 'react-redux';

export default class Progress extends Component {
    render() {
        return (
            <div
                style={{ width: CLIENT_WIDTH, height: 90, position: 'fixed', left: 0, bottom: 64, backgroundColor: '#222', paddingLeft: 12, paddingRight: 12, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: '#e6e6e6' }}>{'《 上一章'}</div>
                    <div>11111</div>
                    <div style={{ color: '#e6e6e6' }}>{'下一章 》'}</div>
                </div>
                <div style={{ flex: 1 }}></div>
            </div>
        );
    }
}

// function mapState2Props(store) {
//     return {
//         title: store.data.fictionTitle
//     }
// }

// const ProgressWithStore = connect(mapState2Props)();