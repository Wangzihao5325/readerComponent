import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store_change_light_bg_color } from '../../store/actions/modeActions';

class Item extends Component {
    render() {
        return (
            <div onClick={this.callback} style={{ width: 68, height: 30, backgroundColor: this.props.bgColor, borderRadius: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'red' }}>
                {this.props.index === this.props.selectIndex ? '✓' : ''}
            </div>
        );
    }

    callback = () => {
        if (this.props.clickCallback) {
            this.props.clickCallback(this.props.index);
        }
    }
}

class BgColorSelect extends Component {
    render() {
        return (
            <div style={{ marginTop: 10, height: 61, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Item clickCallback={this.itemClick} bgColor='rgb(193,179,156)' index={0} selectIndex={this.props.selectIndex} />
                <Item clickCallback={this.itemClick} bgColor='rgb(192,212,228)' index={1} selectIndex={this.props.selectIndex} />
                <Item clickCallback={this.itemClick} bgColor='rgb(206,231,203)' index={2} selectIndex={this.props.selectIndex} />
                <Item clickCallback={this.itemClick} bgColor='rgb(255,255,255)' index={3} selectIndex={this.props.selectIndex} />
            </div>
        );
    }

    itemClick = (index) => {
        store_change_light_bg_color(index);
    }
}

function mapState2Props(store) {
    return {
        selectIndex: store.mode.lightColorSelectIndex
    }
}

const BgColorSelectWithStore = connect(mapState2Props)(BgColorSelect);

export default BgColorSelectWithStore;