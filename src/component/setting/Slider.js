import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Slider, Icon } from 'antd';
import { store_update_slider_value } from '../../store/actions/modeActions';

class IconSlider extends Component {

    handleChange = value => {
        store_update_slider_value(value);
    }

    render() {
        const { max, min, sliderValue } = this.props;
        const mid = ((max - min) / 2).toFixed(5);
        const preColor = sliderValue >= mid ? 'rgb(198, 198, 198)' : 'rgb(255, 255, 255)';
        const nextColor = sliderValue >= mid ? 'rgb(255, 255, 255)' : 'rgb(198, 198, 198)';
        return (
            <div className="icon-wrapper">
                <Icon style={{ color: preColor }} type="minus" />
                <Slider {...this.props} onChange={this.handleChange} value={this.props.sliderValue} />
                <Icon style={{ color: nextColor }} type="plus" />
            </div>
        );
    }
}

function mapState2Props(store) {
    return {
        sliderValue: store.mode.sliderValue
    }
}

const SliderWithStore = connect(mapState2Props)(IconSlider);
export default SliderWithStore;