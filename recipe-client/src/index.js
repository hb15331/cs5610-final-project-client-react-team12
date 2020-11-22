import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";

import userReducer from "./reducers/userReducer"
import {SearchManager} from "./components/SearchManager";

const reducers = combineReducers({
    userReducer
})
const store = createStore(reducers)

ReactDOM.render(

    <Provider store={store}>
        <SearchManager/>
    </Provider>,


    document.getElementById('root')

);

