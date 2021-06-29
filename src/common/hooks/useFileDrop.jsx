import React, { useMemo } from 'react';

import {
  FileDropInfoRender,
  FileDropSuccessViewRender,
  FileDropErrorViewRender,
} from '@common/components';

import { getUiMessages } from '@common/messages';

/**
 * @typedef {Object} FileDropHook
 * @property {React.FC} InfoRender - Кастомизация стартового состояния компонента
 * @property {React.FC} SuccessViewRender - Кастомизация состояния успешной загрузки
 * @property {React.FC} ErrorViewRender - Кастомизация состояния ошибки
 * @property {boolean} isRequired - Обязательное поле или нет
 * @property {boolean} isDisabled - состояние disabled
 * @property {string} requiredMessage - Сообщение при валидации пустого поля
 */
/**
 * Хук для работы с файлами
 *
 * @param {object} params - параметры
 * @param {boolean} params.isRequired - Обязательное поле или нет
 * @param {boolean} params.isMultiple - Признак множественной загрузки файлов
 * @param {number} params.filesCount - Количество загруженных файлов (для множественной загрузки)
 * @param {number} params.filesMaxCount - Максимальное количество файлов (для множественной загрузки)
 * @param {Function} params.onDeleteIfSuccess - обработчик клика, если успешная загрузка (должен быть мемоизирован)
 * @param {Function} params.onDeleteIfError  - обработчик клика, если ошибка загрузки (должен быть мемоизирован)
 *
 * @returns {FileDropHook} результат
 */
export const useFileDrop = ({
  isRequired: isFileRequired = false,
  isMultiple = false,
  filesCount = 0,
  filesMaxCount = 0,
  onDeleteIfSuccess,
  onDeleteIfError,
} = {}) => {
  const { SuccessViewRender, ErrorViewRender } = useMemo(
    () => ({
      SuccessViewRender: (props) => (
        <FileDropSuccessViewRender
          onDeleteClick={!isMultiple ? onDeleteIfSuccess : undefined}
          {...props}
        />
      ),
      ErrorViewRender: (props) => (
        <FileDropErrorViewRender onDeleteClick={onDeleteIfError} {...props} />
      ),
    }),
    [isMultiple, onDeleteIfSuccess, onDeleteIfError],
  );

  const isFilesLimitExceeded = filesCount >= filesMaxCount;
  const isAtLeastOneFileAttached = filesCount >= 1;
  const isDisabled = isFilesLimitExceeded && isMultiple;
  const isRequired =
    isMultiple && isFileRequired ? !isAtLeastOneFileAttached : isFileRequired;
  const requiredMessage = getUiMessages('requiredFileMessage');

  return {
    InfoRender: FileDropInfoRender,
    SuccessViewRender,
    ErrorViewRender,
    isRequired,
    isDisabled,
    requiredMessage,
  };
};
