import React from 'react';
import * as L from 'korus-ui';

import { useSelector } from 'react-redux';

import { getDateTime } from '@common/utils';
import { useActions } from '@common/hooks';

import { PermissionGuard, PERMISSIONS } from '@common/modules/user';

import { INCOMING_DOCUMENT_STATUS } from '../constants';
import { selectors } from '../selectors';
import { actions } from '../ducks';
import { getDocumentStatusStyle } from '../utils';

import { MessageDetailsDocument } from './message-details';
import { MessagesSignButtonBar } from './MessagesSignButtonBar';

/**
 * ## Компонент входящего документа
 * @example
 * <MessageBodyDocumentSignature />
 *
 * @returns {React.FC} входящий документ
 */
export const MessageBodyDocumentSignature = () => {
  const { signAndSendMessageFlow } = useActions(actions);
  const { rejectIncomingDocumentFlow } = useActions(actions);

  const currentAppeal = useSelector(selectors.currentAppeal) || null;
  if (currentAppeal === null) {
    return null;
  }
  const { state, title, created } = currentAppeal.commonData;
  return (
    <>
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
      <PermissionGuard permission={PERMISSIONS.incomingDocument.sign}>
        {INCOMING_DOCUMENT_STATUS.SIGN_REQUESTED === state.name && (
          <MessagesSignButtonBar
            onSignAndSubmit={() => signAndSendMessageFlow()}
            onReject={() => rejectIncomingDocumentFlow()}
          />
        )}
      </PermissionGuard>
    </>
  );
};
