import React, { Component } from 'react';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../../global/size';
import { Spin } from 'antd';
export default class Mask extends Component {
    render() {
        return (
            <div
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
            >
                <Spin />
            </div>
        );
    }
}