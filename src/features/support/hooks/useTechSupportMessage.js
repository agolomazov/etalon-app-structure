import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useActions, useFileDrop } from '@common/hooks';

import { TECH_SUPPORT_MESSAGE_TYPE_MAP } from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';

/**
 * @typedef {object} TechSupportMessageHook
 * @property {React.FC} InfoRender - Компонент кастомизации начального состояния
 * @property {React.FC} SuccessViewRender - Компонент кастомизации состояния успешной загрузки
 * @property {React.FC} ErrorViewRender - Компонент кастомизации состояния ошибки
 * @property {string} subject - тема сообщения
 * @property {function} setSubject - установить тему сообщения
 * @property {string} text - текст сообщения
 * @property {function} setText - установить текст сообщения
 * @property {string} email - email
 * @property {function} setEmail - установить email
 * @property {File} file - файл
 * @property {string | Error | null | L.FileDropInnerError} fileError - ошибка при добавлении файла
 * @property {function} onChangeFile - обработчик события изменения значения файла
 * @property {boolean} isLoading - состояние загрузки
 * @property {function} submit - отправить собщение в тех. поддержку
 */
/**
 * Хук для отправки сообщения в тех. поддержку
 *
 * @param {string} messageType - Тип сообщения
 *
 * @returns {TechSupportMessageHook} результат
 */
export const useTechSupportMessage = (messageType) => {
  const { sendSupportMessageFlow } = useActions(actions);
  const isLoading = useSelector(selectors.isLoading);

  const [subject, setSubject] = useState(null);
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  const { InfoRender, SuccessViewRender, ErrorViewRender } = useFileDrop({
    onDeleteIfSuccess: useCallback(() => {
      setFile(null);
    }, []),
    onDeleteIfError: useCallback(() => {
      setFile(null);
      setFileError(null);
    }, []),
  });

  const onChangeFile = (e) => {
    const { error, value } = e.component;
    setFileError(error);
    setFile(value);
  };

  const submit = () => {
    if (fileError) {
      return;
    }
    sendSupportMessageFlow({
      messageType,
      messageBody: {
        subject,
        text,
        email,
        file,
      },
      notificationText:
        TECH_SUPPORT_MESSAGE_TYPE_MAP[messageType]?.notificationText ||
        'Неизвестный тип сообщения',
    });
  };

  return {
    InfoRender,
    SuccessViewRender,
    ErrorViewRender,
    subject,
    setSubject,
    text,
    setText,
    email,
    setEmail,
    file,
    fileError,
    onChangeFile,
    isLoading,
    submit,
  };
};
