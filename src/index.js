import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './App';

import './fonts/DIGITALDREAM.ttf';

/*
window.addEventListener('load', function() {
  alert(`width: ${window.innerWidth}`);
  alert(`height: ${window.innerHeight}`);
})
*/

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
     <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);