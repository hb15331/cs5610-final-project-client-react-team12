import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import EdamamClient from "./containers/EdamamClient";
import HomePage from "../../recipe-client/src/components/HomePage";


ReactDOM.render(
  //<EdamamClient/>,
    <HomePage/>,
  document.getElementById('root')
);
