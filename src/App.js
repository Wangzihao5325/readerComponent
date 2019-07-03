import React, { Component } from "react";
import { Provider } from 'react-redux';
import store from './store/index';
import Reader from './Reader';
import VConsole from 'vconsole';

class App extends Component {

    componentDidMount() {
        var vConsole = new VConsole();
        console.log('Hello world');
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