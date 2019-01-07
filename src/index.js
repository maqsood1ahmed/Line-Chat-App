import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import messagesReducer from "./reducers/messages.js";
import MainPage from './container/main-page.js';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk),
  );

let store = createStore(messagesReducer, enhancer);

class App extends React.Component{



    render(){
        return(
            <div id="main-page">
                <MainPage></MainPage>
            </div>
        )
    }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

