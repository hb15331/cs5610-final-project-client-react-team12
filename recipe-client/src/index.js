import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";

import UserReducer from "./reducers/UserReducer"
import orderReducer from "./reducers/orderReducer";
import blogReducer from "./reducers/blogReducer";
import {SearchManager} from "./components/SearchManager";


const reducers = combineReducers({
    UserReducer, orderReducer, blogReducer
})
const store = createStore(reducers)

ReactDOM.render(

    <Provider store={store}>
        <SearchManager/>
    </Provider>,


    document.getElementById('root')

);


