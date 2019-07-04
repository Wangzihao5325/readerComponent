import React, { Component } from 'react';
import NativeBridge from '../../util/nativeBridge';

const ICON_SIZE = 22;
const MARGIN = 12;

export default class Header extends Component {
    render() {
        return (
            <div style={{ position: 'fixed', left: 0, top: 0, width: '100%', height: 38, backgroundColor: 'rgb(3,3,3)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div onClick={this.goBack} style={{ marginLeft: MARGIN }}><img src={require('../../image/left.png')} style={{ height: ICON_SIZE, width: ICON_SIZE }} alt='' /></div>
                <div style={{ color: '#e6e6e6', fontSize: 20 }}>112234</div>
                <div style={{ height: ICON_SIZE, width: ICON_SIZE, marginRight: MARGIN }} />
            </div>
        );
    }

    goBack = () => {
        NativeBridge.backToNative();
    }
}