import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { createNumericGenerator } from '@common/utils';
import { useActions, useFileDrop } from '@common/hooks';

import {
  SITUATION_ALLOWED_FILES,
  SITUATION_MAX_UPLOAD_FILE_SIZE,
  SITUATION_FILES_LIMIT_AMOUNT,
} from '../../../constants';

import { actions } from '../ducks';
import { selectors } from '../selectors';

const genUniq = createNumericGenerator();

/**
 * ## Компонент для прикрепления файла к обращения
 *
 * @param {Object} props - Параметры компонента
 * @param {string} props.appealId - id обращения
 * @param {string} props.linkId - Пользовательский идентификатор, который будет добавлен в стор
 * @param {string} props.form - Имя формы
 * @param {string} props.name - Имя компонента в форме
 * @param {boolean} props.isRequired - Обязательное поле или нет
 * @param {boolean} props.IsMultiple - Признак множественной загрузки файлов
 *
 * @returns {React.FC} Компонент для прикрепления файла к обращения
 */
export const AttachmentDrop = ({
  appealId,
  linkId,
  form,
  name,
  isRequired: isFileRequired = false,
  isMultiple = false,
}) => {
  const uniq = useMemo(genUniq, []);
  const [attachFileError, setAttachFileError] = useState(null);
  const { attachAppealFileFlow, deleteAppealFileFlow } = useActions(actions);

  const filesListSelector = useMemo(
    () => selectors.createFilesListSelector(),
    [],
  );
  const fileSelector = useMemo(() => selectors.createFileSelector(linkId), [
    linkId,
  ]);

  const files = useSelector((state) => filesListSelector(state, appealId));
  const file = useSelector((state) => fileSelector(state, appealId));
  const { fileToUpload, id: fileId, isLoading } = file;
  const isFileUploading = useSelector((state) =>
    selectors.isFileUploading(state, uniq),
  );

  const onAttachAppealFile = useCallback(
    (e) => {
      const { error, value: newFileToUpload } = e.component;
      setAttachFileError(error ? { error, file: newFileToUpload } : null);

      if (!isMultiple && fileId) {
        deleteAppealFileFlow({ appealId, fileId, linkId });
      }

      if (!error) {
        attachAppealFileFlow({
          uniq,
          linkId,
          appealId,
          fileToUpload: newFileToUpload,
        });
      }
    },
    [uniq, linkId, appealId, fileId, isMultiple],
  );

  const onDeleteAppealFile = useCallback(() => {
    if (fileId) {
      deleteAppealFileFlow({ appealId, fileId, linkId });
    }
    setAttachFileError(null);
  }, [appealId, fileId, linkId]);

  const {
    InfoRender,
    SuccessViewRender,
    ErrorViewRender,
    isRequired,
    isDisabled,
    requiredMessage,
  } = useFileDrop({
    isRequired: isFileRequired,
    isMultiple,
    filesCount: files?.length ?? 0,
    filesMaxCount: SITUATION_FILES_LIMIT_AMOUNT,
    onDeleteIfSuccess: onDeleteAppealFile,
    onDeleteIfError: useCallback(() => setAttachFileError(null), []),
  });

  const hasFileError = !!attachFileError;
  const value = attachFileError?.file || (isMultiple ? null : fileToUpload);
  const isFileDropLoading = isFileUploading || (!isMultiple && isLoading);
  const isValid = isFileDropLoading || !hasFileError;

  return (
    <L.FileDrop
      infoRender={InfoRender}
      successViewRender={SuccessViewRender}
      errorViewRender={ErrorViewRender}
      isLoading={isFileDropLoading}
      isDisabled={isDisabled}
      error={attachFileError?.error}
      allowedFiles={SITUATION_ALLOWED_FILES}
      maxFileSize={SITUATION_MAX_UPLOAD_FILE_SIZE}
      isRequired={isRequired}
      requiredMessage={requiredMessage}
      validator={() => isValid}
      form={form}
      name={name}
      value={value}
      onChange={onAttachAppealFile}
    />
  );
};
