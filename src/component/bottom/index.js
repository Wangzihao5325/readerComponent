import React, { Component } from 'react';

class ItemBtn extends Component {

    static defaultProps = {
        title: ''
    }

    render() {
        return (
            <div onClick={this.itemOnClick} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={this.props.icon} style={{ height: 21, width: 21 }} alt='' />
                <div style={{ color: 'white', fontSize: 13, marginTop: 3 }}>{this.props.title}</div>
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
                <ItemBtn key='menu_list' type='menu_list' icon={require('../../image/chapter_list.png')} callback={this.showChapterList} title='目录' />
                <ItemBtn key='progress' type='progress' icon={require('../../image/progress.png')} callback={this.progress} title='进度' />
                <ItemBtn key='setting' type='setting' icon={require('../../image/font.png')} callback={this.setting} title='设置' />
                <ItemBtn key='mode' type='mode' icon={require('../../image/sun.png')} callback={this.primary} title='日间' />
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