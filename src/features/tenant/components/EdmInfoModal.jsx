import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Модальное окно с информацией на "Согласие на получение юридически значимых сообщений/документов в электронном вид"
 *
 * @example
 * <EdmInfoModal />
 *
 * @param {Object} props - Параметры компонента
 * @param {Function} props.onLogout - обработчик для кнопки Выход
 *
 * @returns {React.FC} Модальное окно с информацией на "Согласие на получение юридически значимых сообщений/документов в электронном вид"
 */
export const EdmInfoModal = ({ onLogout }) => (
  <L.Modal className="bg-transparent" isOpen size="md" iconRender={() => null}>
    <L.ModalBody className="modal-with-img">
      <L.Img
        src="https://cdn.esphere.ru/images/ri/el-doc.png"
        alt="Письмо с уведомлением об изменении арендной платы"
        className="modal-img"
      />
      <L.Div className="window-content">
        <L.H2 className="modal-title padding-bottom-24">
          Согласие на получение юридически значимых сообщений/документов в
          электронном виде
        </L.H2>
        <L.P className="padding-bottom-24">
          Возможность работы в Личном кабинете Арендатора будет предоставлена
          после подтверждения согласия на получение юридически значимых
          сообщений/документов в Личном кабинете Арендатора.
        </L.P>
        <L.P>
          <strong>
            Руководителю Арендатора необходимо авторизоваться в сервисе и
            предоставить согласие на получение юридически значимых
            сообщений/документов в Личном кабинете Арендатора.
          </strong>
        </L.P>
      </L.Div>
    </L.ModalBody>
    <L.ModalFooter>
      <L.Button className="margin-right-16" onClick={() => onLogout()}>
        Выход
      </L.Button>
    </L.ModalFooter>
  </L.Modal>
);
