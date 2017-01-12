import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AppStore} from './store';
import './index.css';

const store = new AppStore();

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
