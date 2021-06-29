import React, { useCallback } from 'react';
import * as L from 'korus-ui';
import { useSelector, useDispatch } from 'react-redux';

import { selectors } from '../selectors';
import { actions } from '../ducks';

/**
 * ## Компонент для отображения уведомлений
 *
 * @example
 * <Notices/>
 *
 * @returns {React.FC} Компонент для отображения уведомлений
 */
export const Notices = () => {
  const notices = useSelector(selectors.notices);
  const dispatch = useDispatch();

  const onChange = useCallback((ev) => {
    dispatch(actions.changeNotices(ev.component.value));
  }, []);

  const iconRender = useCallback(
    ({ elementProps }) => (
      <L.I
        {...elementProps}
        className="notifications-icon novicon-success txt-success"
      />
    ),
    [],
  );

  return (
    <L.Notifications
      className="notifications-top"
      iconRender={iconRender}
      maxItems={5}
      value={notices}
      onChange={onChange}
    />
  );
};
