import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { Route, Switch } from 'react-router';

import { APP_ROUTES } from '@src/constants';

import { actions } from '../ducks';
import { selectors } from '../selectors';

import { MessagesList } from './MessagesList';
import { MessageBody } from './MessageBody';
import { MessagesEmptyList } from './MessagesEmptyList';
import { MessageBodyEmpty } from './MessageBodyEmpty';

/**
 * ## Контейнер для обращений
 * @example
 * <MessagesContainer />
 *
 * @param {object} props - словарь типов объектов аренды
 * @param {object} props.facilityRentalTypes - словарь типов объектов аренды
 *
 *
 * @returns {React.FC} Контейнер для обращений
 */
export const MessagesContainer = ({ facilityRentalTypes }) => {
  const dispatch = useDispatch();

  const appeals = useSelector(selectors.appealsList) || [];
  const isAppealsListLoading = useSelector(selectors.isAppealsListLoading);

  React.useEffect(() => {
    dispatch(actions.loadAppealsFlow());
  }, []);

  return (
    <L.Loader isLoading={isAppealsListLoading}>
      {appeals.length !== 0 && (
        <L.Div className="flex-row width-100 height-100">
          <MessagesList appeals={appeals} />
          <Switch>
            <Route
              exact
              path={APP_ROUTES.MESSAGES_APPEAL(':appealId')}
              render={() => (
                <MessageBody facilityRentalTypes={facilityRentalTypes} />
              )}
            />
            <Route exact path="" component={MessageBodyEmpty} />
          </Switch>
        </L.Div>
      )}
      {appeals.length === 0 && isAppealsListLoading === false && (
        <MessagesEmptyList />
      )}
    </L.Loader>
  );
};
