import React from 'react';
import * as L from 'korus-ui';

import { Keyboard } from '@mockups-components/keyboard';

/**
 * ## Mockup главной страницы
 * @example
 * <ConfirmationOfReceipt />
 */
export const PlugInToken = (props) => {
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
      <L.ModalHeader>Подключите носитель ЭП</L.ModalHeader>
      <L.ModalBody className="window-content">
        <L.Div className="txt-center">
          <svg width="415" height="233" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Keyboard />
            <path className="token-stroke" d="M308.578 53.863a2.878 2.878 0 012.878-2.878h63.003c8.304 0 15.036 6.732 15.036 15.036 0 8.304-6.732 15.036-15.036 15.036h-63.003a2.878 2.878 0 01-2.878-2.878V53.863z" />
            <path className="token-stroke" d="M288.805 57.722a2.5 2.5 0 012.5-2.5h17.414V76.82h-17.414a2.5 2.5 0 01-2.5-2.5V57.722z" />
            <circle className="token-fill" cx="375.871" cy="66.021" r="7.062" />
            <rect className="token-fill" x="293.954" y="60.371" width="8.474" height="2.825" rx="1" />
            <rect className="token-fill" x="293.954" y="68.846" width="8.474" height="2.825" rx="1" />
          </svg>
        </L.Div>
      </L.ModalBody>
      <L.ModalFooter>
        <L.Button className="margin-right-16">
          Отменить
        </L.Button>
        <L.Button className="success">
          Готово
        </L.Button>
      </L.ModalFooter>
    </L.Modal>
  );
};
