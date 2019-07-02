import React, { Component } from 'react';
import IconSlider from './Slider';
import BgColorSelect from './BgColorSelect';
import './index.css';

export default class Setting extends Component {

    render() {
        return (
            <div style={{ width: '100%', height: 90, position: 'fixed', left: 0, bottom: 64, backgroundColor: 'rgb(3,3,3)', paddingLeft: 12, paddingRight: 12 }}>
                <IconSlider min={1} max={7} />
                <div style={{ height: 5, width: '100%' }} />
                <BgColorSelect />
            </div>
        );
    }
}