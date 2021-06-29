import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Mockup главной страницы
 * @example
 * <ConfirmationOfReceipt />
 */
export const InstallPlugin = (props) => {
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
      <L.ModalHeader>Плагин не найден</L.ModalHeader>
      <L.ModalBody className="window-content">
        <L.Div className="txt-small">
          <L.P>
            Для входа по&nbsp;электронной подписи необходимо:
          </L.P>
          <L.Ul _list _marginBottomNone>
            <L.Li>
              1. Установить
              {' '}
              <L.A href="#">
                плагин
              </L.A>
              {' '}
              для работы с&nbsp;электронной подписью;
            </L.Li>
            <L.Li>
              2. Установить
              {' '}
              <L.A href="#">
                СКЗИ КриптоПро CSP
              </L.A>
              {' '}
              для работы с&nbsp;электронной подписью;
            </L.Li>
            <L.Li>
              3. После установки перезапустить браузер;
            </L.Li>
            <L.Li>
              4. Присоединить к&nbsp;компьютеру носитель ключа электронной подписи (USB-ключ).
              Должен быть вставлен только 1&nbsp;носитель.
            </L.Li>
          </L.Ul>
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
