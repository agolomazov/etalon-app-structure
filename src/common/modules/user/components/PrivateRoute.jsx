import React from 'react';
import * as L from 'korus-ui';
import { Route } from 'react-router';
import { useSelector } from 'react-redux';

import { useActions } from '@common/hooks';

import { actions } from '../ducks';
import { selectors } from '../selectors';

/**
 * ## Приватный роут
 *
 * @param {object} props - Параметры компонента
 *
 * @returns {React.FC} Приватный роут
 */
export const PrivateRoute = (props) => {
  const { checkUserFlow } = useActions(actions);
  const { path } = props;
  const isNone = useSelector(selectors.isUserCheckStatusNone);
  const isPending = useSelector(selectors.isUserCheckStatusPending);

  React.useEffect(() => {
    checkUserFlow();
  }, [path]);

  return isNone || isPending ? (
    <L.Loader isLoading isGlobal />
  ) : (
    <Route {...props} />
  );
};
