import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Params from '../../global/param';

class ItemBtn extends Component {

    static defaultProps = {
        title: ''
    }

    render() {
        let imagePath = this.props.icon
        if (this.props.type === 'special') {
            imagePath = (this.props.isDark && this.props.icon2) ? this.props.icon2 : this.props.icon;
        }
        return (
            <div onClick={this.itemOnClick} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={imagePath} style={{ height: 21, width: 21 }} alt='' />
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

function mapState2Props(store) {
    return {
        isDark: store.mode.isDark
    }
}

const ItemBtnWithStore = connect(mapState2Props)(ItemBtn);

class Footer extends Component {

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 64, width: '100%', position: 'fixed', bottom: 0, left: 0, backgroundColor: 'rgb(3,3,3)' }}>
                {this.props.fictionType === Params.Nnovel && <ItemBtnWithStore key='menu_list' type='menu_list' icon={require('../../image/chapter_list.png')} callback={this.showChapterList} title='目录' />}
                {this.props.fictionType === Params.Nnovel && <ItemBtnWithStore key='progress' type='progress' icon={require('../../image/progress.png')} callback={this.progress} title='进度' />}
                <ItemBtnWithStore key='setting' type='setting' icon={require('../../image/font.png')} callback={this.setting} title='设置' />
                <ItemBtnWithStore key='mode' type='mode' type='special' icon2={require('../../image/moon.png')} icon={require('../../image/sun.png')} callback={this.primary} title='日间' />
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

function mapState2PropsTwo(store) {
    return {
        fictionType: store.data.fictionType
    }
}

const FooterWithStore = connect(mapState2PropsTwo)(Footer);
export default FooterWithStore;