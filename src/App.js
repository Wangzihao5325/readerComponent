import React, { Component } from "react";
import { Provider } from 'react-redux';
import store from './store/index';
import Reader from './Reader';

class App extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <Provider store={store} >
                <Reader />
            </Provider>
        );
    }

}

export default App;