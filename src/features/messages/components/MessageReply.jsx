import React from 'react';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';

import {
  formatFileSize,
  isFileDuplicate,
  deleteFileFromArray,
} from '@common/utils';

import { useFileDrop, useActions } from '@common/hooks';

import { actions } from '../ducks';
import { selectors } from '../selectors';
import {
  MAX_UPLOAD_FILE_SIZE,
  ALLOWED_UPLOAD_FILES,
  MAX_UPLOAD_FILES_COUNT,
} from '../constants';

/**
 * ## Компонент с отправкой сообщения и документов
 * @example
 * <MessageReply />
 *
 * @returns {React$Node} компонент отправки сообщения и документов
 */
export const MessageReply = ({ shouldRender }) => {
  const [commentValue, setCommentValue] = React.useState(null);
  const [attachments, setAttachments] = React.useState([]);
  const [attachFileError, setAttachFileError] = React.useState(null);
  const currentAppeal = useSelector(selectors.currentAppeal);
  const { setComment } = useActions(actions);

  React.useEffect(() => {
    if (!currentAppeal) {
      return;
    }
    const comment = {
      body: commentValue,
      attachments,
      appealId: currentAppeal.commonData.id,
    };
    setComment(comment);
  }, [commentValue, attachments, currentAppeal]);

  const onAttachFile = React.useCallback(
    (e) => {
      const { error, value } = e.component;
      setAttachFileError({ error, value });
      if (!error && isFileDuplicate(attachments, value) === false) {
        setAttachments((prevState) => [...prevState, value]);
      }
    },
    [attachments],
  );

  const value = attachFileError?.error ? attachFileError.value : null;

  const {
    ErrorViewRender,
    SuccessViewRender,
    InfoRender,
    isDisabled,
  } = useFileDrop({
    isMultiple: true,
    filesCount: attachments?.length ?? 0,
    filesMaxCount: MAX_UPLOAD_FILES_COUNT,
    onDeleteIfError: React.useCallback(() => setAttachFileError(null), []),
    onDeleteIfSuccess: React.useCallback(() => setAttachFileError(null), []),
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <L.Div className="padding-top-24 padding-bottom-16">
      <L.Label className="txt-bold">Ответ</L.Label>
      <L.Textarea
        form="messages"
        name="reply"
        className="margin-y-12"
        data="1"
        placeholder="Текст сообщения"
        onChange={(e) => setCommentValue(e.component.value)}
      />
      <L.FileDrop
        form="messages"
        name="attachment"
        infoRender={InfoRender}
        errorViewRender={ErrorViewRender}
        successViewRender={SuccessViewRender}
        error={attachFileError?.error}
        maxFileSize={MAX_UPLOAD_FILE_SIZE}
        allowedFiles={ALLOWED_UPLOAD_FILES}
        isDisabled={isDisabled}
        onChange={onAttachFile}
        validator={() => !attachFileError?.error}
        value={value}
      />
      {attachments.length > 0 &&
        attachments.map((e) => (
          <L.Div
            className="flex-row
              align-items-center
              inner
              secondary
              padding-x-16
              padding-y-12
              margin-y-8"
            key={e.lastModified}
          >
            <L.A className="flex-row width-95" href={e.path} download>
              <L.I
                className="
                  novicon-doc-list
                  margin-right-12
                  txt-light-gray"
              />
              <L.Span className="txt-nowrap">{e.name}</L.Span>
              <L.Span className="margin-left-auto txt-gray">
                {formatFileSize(e.size)}
              </L.Span>
            </L.A>
            <L.Button
              className="
                blank
                more
                novicon-del
                padding-none
                margin-left-auto
                txt-gray"
              onClick={() => {
                setAttachments(deleteFileFromArray(attachments, e));
              }}
            />
          </L.Div>
        ))}
    </L.Div>
  );
};
