import React, { Component } from 'react';
import { connect } from 'react-redux';

import InitialComponent from './InitialComponent';
import Reader from './reader/Reader';


class MiddleWare extends Component {
    render() {
        if (this.props.isInitial) {
            return (<Reader />);
        } else {
            return (<InitialComponent />);
        }
    }
}

function mapState2Props(store) {
    return {
        isInitial: store.initial.isInitial
    }
}

const MiddleWareWithStore = connect(mapState2Props)(MiddleWare);
export default MiddleWareWithStore;