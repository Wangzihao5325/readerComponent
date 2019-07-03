import React, { Component } from 'react';
import { Spin } from 'antd';
export default class InitialComponent extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Spin />
            </div>
        );
    }
}