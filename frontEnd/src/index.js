import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';//bootstrap

import tenantreducer from "./reducer/TenantReducer"
import proprietorreducer from "./reducer/ProprietorReducer"
import welcomereducer from "./reducer/WelcomePageReducer"

const rootReducer = combineReducers({
    tenant: tenantreducer,
    proprietor: proprietorreducer,
    welcome: welcomereducer
})

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



ReactDOM.render(
    <Provider store={store}>
<App />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
