import React, { Component } from 'react';

class ItemBtn extends Component {

    static defaultProps = {
        title: ''
    }

    render() {
        return (
            <div onClick={this.itemOnClick} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ color: 'white', fontSize: 13 }}>{this.props.title}</div>
            </div>
        );
    }

    itemOnClick = () => {
        if (this.props.callback) {
            this.props.callback();
        }
    }
}

export default class Footer extends Component {

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', height: 64, width: '100%', position: 'fixed', bottom: 0, left: 0, backgroundColor: 'rgb(3,3,3)' }}>
                <ItemBtn callback={this.showChapterList} icon={require('../../image/font-size.svg')} title='目录' />
                <ItemBtn callback={this.progress} icon={require('../../image/font-size.svg')} title='进度' />
                <ItemBtn callback={this.setting} icon={require('../../image/font-size.svg')} title='设置' />
                <ItemBtn callback={this.primary} icon={require('../../image/font-size.svg')} title='日间' />
            </div>
        );
    }

    showChapterList = () => {
        console.log('目录');
    }

    progress = () => {
        console.log('进度');
    }

    setting = () => {
        if (this.props.openSettingPage) {
            this.props.openSettingPage();
        }
    }

    primary = () => {
        if (this.props.primaryChange) {
            this.props.primaryChange();
        }
    }
}