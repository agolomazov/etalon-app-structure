import React from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';
import { useActions } from '@common/hooks';
import { actions as userActions } from '@common/modules/user';

import { actions } from '../ducks';
import { selectors } from '../selectors';

// eslint-disable-next-line max-len
import { IncomingDocumentConfirmationRequired } from './IncomingDocumentConfirmationRequired';

/**
 * ## Компонент окна подтверждения получения входящих документов
 *
 * @example
 * <IncomingDocumentsConfirmationModal />
 *
 * @returns {React.FC} Компонент окна подтверждения получения входящих документов
 */
export const IncomingDocumentsConfirmationModal = () => {
  const isLoading = useSelector(selectors.isLoading);
  const incomingDocumentsRequiredConfirmation = useSelector(
    selectors.incomingDocumentsRequiredConfirmation,
  );
  const confirm = useActions(actions.confirmReceiptIncomingDocumentsFlow);
  const { logoutUserFlow } = useActions(userActions);

  return (
    <L.Modal
      isOpen={incomingDocumentsRequiredConfirmation.length > 0}
      iconRender={() => null}
      size="md"
    >
      <L.ModalBody className="modal-with-img">
        <L.Img
          src="https://cdn.esphere.ru/images/ri/new-docs.png"
          alt="Письмо с уведомлением об изменении арендной платы"
          className="modal-img"
        />
        <L.Div className="window-content">
          <L.H2 className="modal-title padding-bottom-24">
            Новые входящие документы
          </L.H2>
          <L.Div className="modal-scroll">
            {incomingDocumentsRequiredConfirmation.map(
              ({ id, title, updated, lastAttachments }) => (
                <IncomingDocumentConfirmationRequired
                  key={id}
                  title={title}
                  date={updated}
                  attachments={lastAttachments}
                />
              ),
            )}
          </L.Div>
        </L.Div>
      </L.ModalBody>
      <L.ModalFooter>
        <L.Button
          className="margin-right-16"
          isDisabled={isLoading}
          onClick={() => logoutUserFlow()}
        >
          {getUiMessages('btnLogout')}
        </L.Button>
        <L.Button
          className="success"
          isLoading={isLoading}
          onClick={() => confirm()}
        >
          {getUiMessages('btnConfirmReceipt')}
        </L.Button>
      </L.ModalFooter>
    </L.Modal>
  );
};
