import React, { Component } from 'react';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/size';
import { Spin } from 'antd';
import './index.css';
export default class Mask extends Component {
    render() {
        return (
            <div
                className='fixed-div'
                style={{
                    height: CLIENT_HEIGHT,
                    width: CLIENT_WIDTH,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.45)',
                    zIndex: 999,
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
                onTouchmove={this.touchmove}
            >
                <Spin />
            </div>
        );
    }

}