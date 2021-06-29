import React from 'react';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';

/**
 * ## Модальное окно с ошибкой
 *
 * @example
 * <SignErrorModal />
 *
 * @param {object} props - Параметры компонента
 * @param {boolean} props.isOpen - отображать модальное оконо или нет
 * @param {Array} props.errors - список ошибок
 * @param {function} props.onCancel - обработчкик закрытия модального окна
 *
 * @returns {React.FC} Модальное окно с ошибкой
 */
export const SignErrorModal = ({ isOpen, errors = [], onCancel }) => (
  <L.Modal
    className="modal-480"
    size="sm"
    isOpen={isOpen}
    onCloseButtonClick={() => onCancel()}
  >
    <L.ModalHeader>Внимание</L.ModalHeader>
    <L.ModalBody className="window-content">
      <L.Div className="message danger flex-row inner-12 margin-bottom-none">
        <L.I className="novicon-error-circle-fill txt-danger padding-right-8" />

        {errors.map(({ message, recommendation }) => (
          <L.Div key={message}>
            <L.Div>{message}</L.Div>
            <L.Div shouldRender={!!recommendation}>{recommendation}</L.Div>
          </L.Div>
        ))}

        <L.Div shouldRender={false}>
          Сертификат не&nbsp;прошел проверку. Выберите другой сертификат или
          обратитесь в&nbsp;техническую поддержку по&nbsp;почте
          <> </>
          <L.A href="mailto:asmsud.hd@esphere.ru">example@esphere.ru</L.A>
          <> </>
          или по&nbsp;телефону
          <> </>
          <L.A href="tel:88121234567">8&nbsp;(812)&nbsp;123-45-67</L.A>
          <>.</>
        </L.Div>
      </L.Div>
    </L.ModalBody>
    <L.ModalFooter>
      <L.Button onClick={() => onCancel()}>
        {getUiMessages('btnClose')}
      </L.Button>
    </L.ModalFooter>
  </L.Modal>
);
