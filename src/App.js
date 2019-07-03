import React, { Component } from "react";
import { Provider } from 'react-redux';
import store from './store/index';
import MiddleWare from './readerWrapper/MiddleWare';

class App extends Component {

    render() {
        return (
            <Provider store={store} >
                <MiddleWare />
            </Provider>
        );
    }

}

export default App;