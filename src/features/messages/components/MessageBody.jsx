import React from 'react';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useActions } from '@common/hooks';

import { actions } from '../ducks';
import { selectors } from '../selectors';
import {
  isAppeal,
  isDocumentNotRequireSignature,
  isDocumentRequireSignature,
} from '../utils';

import { MessageBodyAppeal } from './MessageBodyAppeal';
import { MessageBodyDocumentSignature } from './MessageBodyDocumentSignature';
// eslint-disable-next-line max-len
import { MessageBodyDocumentNoSignature } from './MessageBodyDocumentNoSignature';

/**
 * ## Компонент тела сообщения
 * @example
 * <MessageBody
 *    facilityRentalTypes={facilityRentalTypes}
 * />
 *
 * @param {object} props - параметры компонента
 * @param {object} props.facilityRentalTypes - словарь типов объектов аренды
 *
 * @returns {React.FC} перепиской и информацией по обращению
 */
export const MessageBody = ({ facilityRentalTypes }) => {
  const { loadAppealFlow } = useActions(actions);
  const { appealId } = useParams();

  const isAppealLoading = useSelector(selectors.isAppealLoading);
  const appealList = useSelector(selectors.appealsList);
  const type = useSelector(selectors.currentAppealType);
  const currentAppealId = useSelector(selectors.currentAppealId);

  React.useEffect(() => {
    if (currentAppealId !== appealId) {
      loadAppealFlow(appealId);
    }
  }, [appealId, currentAppealId, appealList]);

  return (
    <L.Div className="message-body-scroll-area flex-column width-100">
      <L.Loader isLoading={isAppealLoading} className="flex-column height-100">
        {isAppeal(type) && (
          <MessageBodyAppeal facilityRentalTypes={facilityRentalTypes} />
        )}
        {isDocumentRequireSignature(type) && <MessageBodyDocumentSignature />}
        {isDocumentNotRequireSignature(type) && (
          <MessageBodyDocumentNoSignature />
        )}
      </L.Loader>
    </L.Div>
  );
};
