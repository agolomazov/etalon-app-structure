import React from 'react';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';

/**
 * ## Модальное окно успешного подписания
 *
 * @example
 * <SignSuccessModal />
 *
 * @param {object} props - Параметры компонента
 * @param {boolean} props.isOpen - отображать модальное оконо или нет
 * @param {function} props.onCancel - обработчкик закрытия модального окна
 *
 * @returns {React.FC} Модальное окно успешного подписания
 */
export const SignSuccessModal = ({ isOpen, onCancel }) => (
  <L.Modal
    className="modal-480"
    size="sm"
    isOpen={isOpen}
    onCloseButtonClick={() => onCancel()}
  >
    <L.ModalHeader>Внимание</L.ModalHeader>
    <L.ModalBody className="window-content">
      <L.Div className="message success flex-row inner-12 margin-bottom-none">
        <L.I className="novicon-success-fill txt-success padding-right-8" />
        <L.Div>Успешное подписание</L.Div>
      </L.Div>
    </L.ModalBody>
    <L.ModalFooter>
      <L.Button onClick={() => onCancel()}>
        {getUiMessages('btnClose')}
      </L.Button>
    </L.ModalFooter>
  </L.Modal>
);
