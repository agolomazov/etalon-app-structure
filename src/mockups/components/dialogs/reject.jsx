import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Mockup главной страницы
 * @example
 * <ConfirmationOfReceipt />
 */
export const Reject = (props) => {
  const { isOpen, setIsOpen } = props;

  if (!isOpen) return null;
  return (
    <L.Modal
      className="modal-480"
      isOpen
      onCloseButtonClick={() => {
        setIsOpen(false);
      }}
      onOverlayClick={() => {
        setIsOpen(false);
      }}
      onEscapePress={() => {
        setIsOpen(false);
      }}
      size="sm"
    >
      <L.ModalHeader>Причина отклонения </L.ModalHeader>
      <L.ModalBody className="window-content">
        <L.Textarea placeholder="Причина отклонения" />
      </L.ModalBody>
      <L.ModalFooter>
        <L.Button className="margin-right-16">
          Отмена
        </L.Button>
        <L.Button className="success">
          Отправить
        </L.Button>
      </L.ModalFooter>
    </L.Modal>
  );
};
