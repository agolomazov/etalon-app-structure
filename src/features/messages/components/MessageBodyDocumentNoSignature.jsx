import React from 'react';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';

import { getDateTime } from '@common/utils';

import { selectors } from '../selectors';
import { getDocumentStatusStyle } from '../utils';

import { MessageDetailsDocument } from './message-details';

/**
 * ## Компонент входящего документа не требующего подписи
 * @example
 * <MessageBodyDocumentNoSignature />
 *
 * @returns {React.FC} входящий документ не требующий подписи
 */
export const MessageBodyDocumentNoSignature = () => {
  const currentAppeal = useSelector(selectors.currentAppeal) || null;
  if (currentAppeal === null) {
    return null;
  }
  const { state, title, created } = currentAppeal.commonData;
  return (
    <L.Div className="padding-y-16 padding-x-32">
      <L.Div className="flex-row margin-bottom-8 txt-gray-2">
        {getDateTime(created)}
        <L.Div className="margin-left-auto">
          <L.Span
            className={`tag ${getDocumentStatusStyle(state.name, false)}`}
          >
            {state.name}
          </L.Span>
        </L.Div>
      </L.Div>
      <L.H5 className="line-height-1">{title}</L.H5>
      <hr className="margin-y-24" />
      <MessageDetailsDocument appealData={currentAppeal} />
    </L.Div>
  );
};
