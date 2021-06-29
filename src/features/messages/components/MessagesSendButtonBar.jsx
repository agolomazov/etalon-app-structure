import React from 'react';
import * as L from 'korus-ui';

import { SubmitButton } from '@common/components';
import { getUiMessages } from '@common/messages';

/**
 * ## Компонент с кнопкой отправки в Сообщениях
 * @example
 * <MessagesSendButtonBar />
 *
 * @param {object} props - параметры компонента
 * @param {Function} props.onClickAction - событие по нажатию кнопки
 * @param {Boolean} props.isButtonActive - активна кнопка или нет
 *
 * @returns {React.FC} Компонент с кнопкой отправки в Сообщениях
 */
export const MessagesSendButtonBar = ({ onClickAction, isButtonActive }) => (
  <L.Div className="toolbar padding-x-32 margin-top-auto txt-right">
    <SubmitButton
      form="messages"
      className="success"
      isDisabled={!isButtonActive}
      onClick={() => onClickAction()}
    >
      {getUiMessages('btnSubmit')}
    </SubmitButton>
  </L.Div>
);
