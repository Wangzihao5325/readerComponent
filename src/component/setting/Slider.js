import React, { Component } from 'react';
import { Slider, Icon } from 'antd';

export default class IconSlider extends Component {
    state = {
        value: 1,
    }

    handleChange = value => {
        this.setState({ value }, () => {
            if (this.props.callback) {
                this.props.callback(this.state.value)
            }
        });
    }

    render() {
        const { max, min } = this.props;
        const { value } = this.state;
        const mid = ((max - min) / 2).toFixed(5);
        const preColor = value >= mid ? 'rgb(198, 198, 198)' : 'rgb(255, 255, 255)';
        const nextColor = value >= mid ? 'rgb(255, 255, 255)' : 'rgb(198, 198, 198)';
        return (
            <div className="icon-wrapper">
                <Icon style={{ color: preColor }} type="minus" />
                <Slider {...this.props} onChange={this.handleChange} value={value} />
                <Icon style={{ color: nextColor }} type="plus" />
            </div>
        );
    }
}