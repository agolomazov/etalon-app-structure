import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Mockup главной страницы
 * @example
 * <ConfirmationOfReceipt />
 */
export const Error = (props) => {
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
      <L.ModalHeader>Внимание</L.ModalHeader>
      <L.ModalBody className="window-content">
        <L.Div className="message danger flex-row inner-12 margin-bottom-none">
          <L.I className="novicon-error-circle-fill txt-danger padding-right-8" />
          <L.Div>
            Сертификат не&nbsp;прошел проверку. Выберите другой сертификат
            или обратитесь в&nbsp;техническую поддержку по&nbsp;почте
            {' '}
            <L.A href="mailto:asmsud.hd@esphere.ru">
              example@esphere.ru
            </L.A>
            {' '}
            или по&nbsp;телефону
            {' '}
            <L.A href="tel:88121234567">
              8&nbsp;(812)&nbsp;123-45-67
            </L.A>
            .
          </L.Div>
        </L.Div>
      </L.ModalBody>
      <L.ModalFooter>
        <L.Button>
          Закрыть
        </L.Button>
      </L.ModalFooter>
    </L.Modal>
  );
};
