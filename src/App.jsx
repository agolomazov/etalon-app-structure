import React from 'react';
import { Provider } from 'react-redux';

import { AppRoutes } from '@src/routes';
import { Notices } from '@features/notices';

export const App = ({ store, history }) => (
  <Provider store={store}>
    <AppRoutes history={history} />
    <Notices />
  </Provider>
);
