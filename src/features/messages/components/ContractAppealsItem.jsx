import React from 'react';
import * as L from 'korus-ui';
import { useHistory } from 'react-router-dom';

import { APP_ROUTES } from '@src/constants';
import { getDateTime } from '@common/utils';

import { getStatusStyle } from '../utils';

/**
 * ## Элемент списка вкладки "Связанные документы" компонента "Детали договора"
 *
 * @example
 * <ContractAppealsItem appealData={appealData}/>
 *
 * @param {Object} appealData - информация по связанному с договором обращению
 *
 * @returns {React$Node} Элемент списка
 */
export const ContractAppealsItem = ({ appealData }) => {
  const history = useHistory();
  const {
    id,
    type,
    updated,
    title,
    lastAttachments = [],
    state,
    read,
  } = appealData;
  return (
    <L.Tr
      className="pointer"
      onClick={() => history.push(APP_ROUTES.MESSAGES_APPEAL(id))}
    >
      <L.Td>
        {lastAttachments.length > 0 && (
          <L.I className="novicon-paper-clip txt-gray" />
        )}
      </L.Td>
      <L.Td className={read ? '' : 'txt-bold'}>{getDateTime(updated)}</L.Td>
      <L.Td className={read ? '' : 'txt-bold'}>{title}</L.Td>
      <L.Td>
        <L.Span
          className={`
            tag
            ${getStatusStyle(type, state.name, false)}
          `}
        >
          {state.name}
        </L.Span>
      </L.Td>
    </L.Tr>
  );
};
