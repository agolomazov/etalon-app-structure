import React from 'react';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';

/**
 * ## Модальное окно с информацией о том, что необходимо установить плагин
 *
 * @example
 * <SignPluginNotFoundModal />
 *
 * @param {object} props - Параметры компонента
 * @param {boolean} props.isOpen - отображать модальное оконо или нет
 *
 * @returns {React.FC} Модальное окно с информацией о том, что необходимо установить плагин
 */
export const SignPluginNotFoundModal = ({ isOpen }) => (
  <L.Modal className="modal-480" size="sm" isOpen={isOpen}>
    <L.ModalHeader>Плагин не найден</L.ModalHeader>
    <L.ModalBody className="window-content">
      <L.Div className="txt-small">
        <L.P>Для входа по&nbsp;электронной подписи необходимо:</L.P>
        <L.Ul _list _marginBottomNone>
          <L.Li>
            1. Установить
            <> </>
            <L.A href="#">плагин</L.A>
            <> </>
            для работы с&nbsp;электронной подписью;
          </L.Li>
          <L.Li>
            2. Установить
            <> </>
            <L.A href="#">СКЗИ КриптоПро CSP</L.A>
            <> </>
            для работы с&nbsp;электронной подписью;
          </L.Li>
          <L.Li>3. После установки перезапустить браузер;</L.Li>
          <L.Li>
            4. Присоединить к&nbsp;компьютеру носитель ключа электронной подписи
            (USB-ключ). Должен быть вставлен только 1&nbsp;носитель.
          </L.Li>
        </L.Ul>
      </L.Div>
    </L.ModalBody>
    <L.ModalFooter>
      <L.Button>{getUiMessages('btnClose')}</L.Button>
    </L.ModalFooter>
  </L.Modal>
);
