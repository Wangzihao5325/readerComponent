import React, { Component } from 'react';
import IconSlider from './Slider';
import './index.css';

export default class Setting extends Component {

    render() {
        return (
            <div style={{ width: '100%', height: 128, position: 'fixed', left: 0, bottom: 64, backgroundColor: 'rgb(3,3,3)', paddingLeft: 12, paddingRight: 12 }}>
                <IconSlider callback={this.props.fontSizeCallback} min={1} max={8} />
            </div>
        );
    }
}