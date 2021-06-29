import React from 'react';
import * as L from 'korus-ui';

import { CAPABILITIES } from '../constants';

/**
 * ## Отрисовывает список пользовательских возможностей в разделе помощь
 * @example
 * <CapabilitiesList />
 *
 * @returns {React.FC} Список пользовательских возможностей
 */
export const CapabilitiesList = () => (
  <>
    <L.H6 className="margin-y-24">
      В Личном кабинете у каждого Арендатора есть возможность:
    </L.H6>
    <L.Ul className="list">
      {CAPABILITIES &&
        CAPABILITIES.map((el) => (
          <L.Li className="margin-bottom-24" key={el.id}>
            <L.I className="novicon-success margin-right-12 txt-gray" />
            {el.text}
          </L.Li>
        ))}
    </L.Ul>
  </>
);
