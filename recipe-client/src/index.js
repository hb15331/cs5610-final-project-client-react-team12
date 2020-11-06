import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css"
// import './index.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.css';
import EdamamClient from "./containers/EdamamClient";
import {SearchManager} from "./components/SearchManager";


ReactDOM.render(

    <SearchManager/>,

    // <EdamamClient/>,
    document.getElementById('root')

);

