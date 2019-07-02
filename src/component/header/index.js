import React, { Component } from 'react';
import NativeBridge from '../../util/nativeBridge';

export default class Header extends Component {
    render() {
        return (
            <div style={{ position: 'fixed', left: 0, top: 0, width: '100%', height: 38, backgroundColor: 'rgb(3,3,3)', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div onClick={this.goBack} style={{ marginLeft: 12 }}><img src={require('../../image/left.png')} style={{ height: 22, width: 22 }} alt='' /></div>
            </div>
        );
    }

    goBack = () => {
        NativeBridge.backToNative();
    }
}