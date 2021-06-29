import React from 'react';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';

import { DownloadFileLink } from '../DownloadFileLink';
import { FileDropVariantRender } from './FileDropVariantRender';

const errorMessages = {
  [L.FileDropTypes.FileErrorCodes.FileIsTooBig]: getUiMessages(
    'fileIsTooBigMessage',
  ),
  [L.FileDropTypes.FileErrorCodes.WrongFileFormat]: getUiMessages(
    'wrongFileFormatMessage',
  ),
};

/**
 * Компонент выводит текст ошибки
 *
 * @param {object} props - параметры компонента
 * @param {object} props.error - объект с ошибкой
 * @param {object} props.file - файл
 *
 * @returns {React.FC} Компонент выводит текст ошибки
 */
const ErrorMessage = ({ error = {}, file }) => {
  const { errorCode = '', errorMessage: originalErrorMessage } = error;

  const isCustomMessage = Object.keys(errorMessages).includes(
    errorCode.toString(),
  );

  if (!isCustomMessage) {
    return <L.Div>{originalErrorMessage}</L.Div>;
  }

  const errorMessage = errorMessages[errorCode];

  return (
    <L.Div>
      {errorMessage}
      <> </>
      {file && <DownloadFileLink href={file}>{file?.name}</DownloadFileLink>}
    </L.Div>
  );
};

/**
 * ## Компонент для кастомизация FileDrop
 *
 * @example <L.FileDrop errorViewRender={FileDropErrorViewRender} />
 *
 * @returns {React.FC} Компонент для кастомизация FileDrop
 */
export const FileDropErrorViewRender = ({
  Element,
  elementProps,
  componentProps,
  onDeleteClick,
}) => {
  const { error, value } = componentProps;

  return (
    <Element {...elementProps}>
      <FileDropVariantRender onDeleteClick={onDeleteClick}>
        <ErrorMessage error={error} file={value} />
      </FileDropVariantRender>
    </Element>
  );
};
