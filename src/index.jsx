import '@common/styles/main.css';
import '@common/styles/calendar.css';

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import { getConfig } from '@common/config';
import { App } from '@src/App';
import configureStore, { history } from '@store';

moment.locale('ru');

const store = configureStore();
const render = () => {
  ReactDOM.render(
    <App store={store} history={history} />,
    document.getElementById('app'),
  );
};

window.addEventListener('load', render);

if (getConfig('environment') !== 'production' && module.hot) {
  module.hot.accept('@src/routes', render);
}
