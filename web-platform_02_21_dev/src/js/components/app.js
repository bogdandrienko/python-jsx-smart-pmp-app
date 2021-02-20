import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Header from './layout/Header';
import Dashboard from './todo/Dashboard';

import { Provider } from 'react-redux';
import store from '../store';


class App extends Component{
    render(){
        return (
            <Provider store={store}>
                <div className='container'>
                    <Header />
                    <Dashboard />
                </div>
            </Provider>
        )
    }
}

ReactDom.render(<App/>, document.getElementById('app'));