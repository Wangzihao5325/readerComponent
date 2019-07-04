import React, { Component } from 'react';
import { connect } from 'react-redux';
import NativeBridge from '../../util/nativeBridge';

const ICON_SIZE = 22;
const MARGIN = 12;

class Header extends Component {
    render() {
        let title = this.props.title.length > 10 ? `${this.props.title.slice(0, 7)}...` : this.props.title;
        return (
            <div style={{ position: 'fixed', left: 0, top: 0, width: '100%', height: 38, backgroundColor: '#222', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div onClick={this.goBack} style={{ marginLeft: MARGIN }}><img src={require('../../image/left.png')} style={{ height: ICON_SIZE, width: ICON_SIZE }} alt='' /></div>
                <div style={{ color: '#e6e6e6', fontSize: 20 }}>{title}</div>
                <div style={{ height: ICON_SIZE, width: ICON_SIZE, marginRight: MARGIN }} />
            </div>
        );
    }

    goBack = () => {
        NativeBridge.backToNative();
    }
}

function mapState2Props(store) {
    return {
        title: store.data.title
    }
}

const HeaderWithStore = connect(mapState2Props)(Header);
export default HeaderWithStore;