import { configureStore as confStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';

import { getConfig } from '@common/config';
import rootReducer, { history } from './root-reducer';
import { rootSaga } from './root-saga';

const logger = createLogger({
  duration: true,
  collapsed: true,
  colors: {
    title: () => '#139BFE',
    prevState: () => '#1C5FAF',
    action: () => '#149945',
    nextState: () => '#A47104',
    error: () => '#ff0005',
  },
});

const resetReducerEnhancer = (createStore) => (
  reducer,
  initialState,
  enhancer,
) => {
  const enhanceReducer = (state, action) => {
    const { router } = state || {};
    return reducer(action.type === 'store/reset' ? { router } : state, action);
  };

  return createStore(enhanceReducer, initialState, enhancer);
};

const configureStore = (preloadedState) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, logger, routerMiddleware(history)];

  const store = confStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    middleware,
    enhancers: [resetReducerEnhancer],
  });

  // Включаем redux-saga middleware
  sagaMiddleware.run(rootSaga);

  if (getConfig('environment') !== 'production' && module.hot) {
    module.hot.accept('./root-reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
export { history } from './root-reducer';
