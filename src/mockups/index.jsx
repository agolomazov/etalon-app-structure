import '@common/styles/main.css';

import '@common/styles/rosim/style.css';
import '@common/styles/rosim/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { getConfig } from '@common/config';
import { AppRoutes } from '@mockups/routes';

const render = () => {
  ReactDOM.render(<AppRoutes />, document.getElementById('app'));
};

window.addEventListener('load', render);

if (getConfig('environment') !== 'production' && module.hot) {
  module.hot.accept('@mockups/routes', render);
}
