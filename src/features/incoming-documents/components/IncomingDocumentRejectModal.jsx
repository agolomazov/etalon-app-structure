import React, { useState, useEffect } from 'react';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';

import { getUiMessages } from '@common/messages';
import { useActions } from '@common/hooks';

import { selectors } from '../selectors';
import { actions } from '../ducks';

/**
 * ## Модальное окно отклонения входящего документа
 * @example
 * <IncomingDocumentRejectModal />
 *
 * @returns {React.FC} Модальное окно отклонения входящего документа
 */
export const IncomingDocumentRejectModal = () => {
  const [comment, setComment] = useState('');
  const isRejectModalOpen = useSelector(selectors.isRejectModalOpen);
  const isLoading = useSelector(selectors.isLoading);

  const { sendRejection, closeRejectModal } = useActions(actions);

  const closeModal = () => {
    if (!isLoading) {
      closeRejectModal();
    }
  };

  useEffect(() => setComment(''), [isRejectModalOpen]);

  return (
    <L.Modal
      className="modal-480"
      isOpen={isRejectModalOpen}
      onCloseButtonClick={() => closeModal()}
      onOverlayClick={() => closeModal()}
      onEscapePress={() => closeModal()}
      size="sm"
    >
      <L.ModalHeader>Причина отклонения </L.ModalHeader>
      <L.ModalBody className="window-content">
        <L.Textarea
          form="reject-incoming-document-form"
          name="comment"
          isRequired
          maxLength={1000}
          placeholder="Причина отклонения"
          value={comment}
          onChange={(ev) => setComment(ev.component.value)}
        />
      </L.ModalBody>
      <L.ModalFooter>
        <L.Button
          className="margin-right-16"
          isDisabled={isLoading}
          onClick={() => closeModal()}
        >
          {getUiMessages('btnCancel')}
        </L.Button>
        <L.Button
          className="success"
          form="reject-incoming-document-form"
          isLoading={isLoading}
          onClick={() => sendRejection({ comment })}
        >
          {getUiMessages('btnSubmit')}
        </L.Button>
      </L.ModalFooter>
    </L.Modal>
  );
};
