import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import configStore from './redux/store';


import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import './shared/styles/_rootStyles.scss';
import './index.css';

const store = configStore();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
