import React from 'react';
import * as L from 'korus-ui';

import { useToggle } from '@common/hooks';

/**
 * ## Модальное окно с согласием на ЭДО
 *
 * @example
 * <EdmConsentModal />
 *
 * @param {Object} props - Параметры компонента
 * @param {boolean} props.isLoading - состояние загрузки
 * @param {Function} props.onConfirm - обработчик для кнопки Согласен
 * @param {Function} props.onLogout - обработчик для кнопки Выход
 *
 * @returns {React.FC} Модальное окно с согласием на ЭДО
 */
export const EdmConsentModal = ({
  isLoading,
  onConfirm,
  onLogout,
  children,
}) => {
  const [isConfirmed, toggleIsConfirmed] = useToggle(false);

  return (
    <L.Modal
      className="bg-transparent"
      isOpen
      size="md"
      iconRender={() => null}
    >
      <L.ModalBody className="modal-with-img">
        <L.Img
          src="https://cdn.esphere.ru/images/ri/el-doc.png"
          alt="Письмо с уведомлением об изменении арендной платы"
          className="modal-img"
        />
        <L.Div className="window-content">
          <L.H2 className="modal-title padding-bottom-24">
            Согласие на электронный документооборот
          </L.H2>
          <L.Div className="modal-scroll modal-scroll-gradient">
            <L.Div className="modal-scroll-content big-content">
              <L.H5 className="padding-bottom-16">
                Согласие на получение юридически значимых сообщений в
                электронном виде в Личном кабинете Арендатора
              </L.H5>
              {children}
            </L.Div>
            <L.Div className="modal-fixed padding-bottom-16">
              <L.CheckBox
                className="padding-bottom-24"
                value={isConfirmed}
                onChange={toggleIsConfirmed}
              >
                Я даю согласие на получение юридически значимых
                сообщений/документов в электронном виде в Личном кабинете
                Арендатора
              </L.CheckBox>
              <L.P className="modal-subtitle">
                В случае необходимости получения документов, в том числе на
                бумажном носителе, Вы можете подать заявление через раздел
                «Жизненные ситуации».
              </L.P>
            </L.Div>
          </L.Div>
        </L.Div>
      </L.ModalBody>
      <L.ModalFooter>
        <L.Button
          className="margin-right-16"
          isDisabled={isLoading}
          onClick={() => onLogout()}
        >
          Выход
        </L.Button>
        <L.Button
          className="success"
          isDisabled={!isConfirmed}
          isLoading={isLoading}
          onClick={() => onConfirm()}
        >
          Согласен
        </L.Button>
      </L.ModalFooter>
    </L.Modal>
  );
};
