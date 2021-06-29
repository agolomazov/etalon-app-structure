import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Mockup главной страницы
 * @example
 * <ConfirmationOfReceipt />
 */
export const ChooseToken = (props) => {
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
      <L.ModalHeader>Выберите сертификат</L.ModalHeader>
      <L.ModalBody className="window-content">
        <L.RadioGroup className="token-radio">
          <L.RadioButton
            className="margin-bottom-8"
            value="radio-1"
          >
            Иванов А. А.
            <L.Div className="txt-gray">
              ПАО «Сбербанк капитал»
              <br />
              Действителен до 3 ноября 2020
            </L.Div>
          </L.RadioButton>

          <L.RadioButton
            className="margin-bottom-8"
            value="radio-2"
          >
            Петров А. А.
            <L.Div className="txt-gray">
              ПАО «Сбербанк капитал»
              <br />
              Действителен до 3 ноября 2020
            </L.Div>
          </L.RadioButton>

          <L.RadioButton
            className="margin-bottom-8"
            value="radio-3"
          >
            Миронов А. А.
            <L.Div className="txt-gray">
              ПАО «Сбербанк капитал»
              <br />
              Действителен до 12 августа 2022
            </L.Div>
          </L.RadioButton>
        </L.RadioGroup>
      </L.ModalBody>
      <L.ModalFooter>
        <L.Button className="margin-right-16">
          Отменить
        </L.Button>
        <L.Button className="success">
          Подписать
        </L.Button>
      </L.ModalFooter>
    </L.Modal>
  );
};
