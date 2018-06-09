import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configStore from './redux/store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configStore();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
