import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Модальное окно с процессом загрузки
 *
 * @example
 * <SignLoadingModal />
 *
 * @param {object} props - Параметры компонента
 * @param {string} props.title - заголовок
 * @param {string} props.description - описание
 * @param {boolean} props.isOpen - отображать модальное оконо или нет
 *
 * @returns {React.FC} Модальное окно с процессом загрузки
 */
export const SignLoadingModal = ({ title, description, isOpen }) => (
  <L.Modal
    className="modal-480"
    size="sm"
    iconRender={() => null}
    isOpen={isOpen}
  >
    <L.ModalHeader className="txt-gray">{title}</L.ModalHeader>
    <L.ModalBody className="window-content">
      <L.Loader />
      <L.Div className="txt-center inner-12">{description}</L.Div>
    </L.ModalBody>
  </L.Modal>
);
