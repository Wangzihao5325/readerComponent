import React, { Component } from 'react';
import IconSlider from './Slider';
import BgColorSelect from './BgColorSelect';
import './index.css';
import { CLIENT_WIDTH } from '../../global/size';

export default class Setting extends Component {

    render() {
        return (
            <div style={{ width: CLIENT_WIDTH, height: 90, position: 'fixed', left: 0, bottom: 64, backgroundColor: '#222', paddingLeft: 12, paddingRight: 12 }}>
                <IconSlider min={1} max={7} />
                <div style={{ height: 5, width: '100%' }} />
                <BgColorSelect />
            </div>
        );
    }
}