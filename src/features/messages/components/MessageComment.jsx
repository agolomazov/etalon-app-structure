import React from 'react';
import * as L from 'korus-ui';

import { getDateTime } from '@common/utils';

import {
  MessageSignatureAttachment,
  MessagesAttachmentsItem,
  MessageSignature,
} from './attachments';

import { getCommentAuthor } from '../utils';

/**
 * ## Элемент списка комментариев к обращеню
 * @example
 * <MessageComment
 *   commentData={commentData}
 *   appealId={appealId}
 * />
 *
 * @param {object} props - параметры компонента
 * @param {number|string} props.appealId - идентификатор обращения
 * @param {array} props.commentData - данные комментария
 *
 * @returns {React$Node} Элемент списка
 */
export const MessageComment = ({ appealId, commentData }) => {
  const { author, created, body, attachments } = commentData;
  return (
    <L.Div className="padding-top-24 padding-bottom-16 border-bottom">
      <L.P className="block-inline margin-right-12 txt-bold">
        {getCommentAuthor(author)}
      </L.P>
      <L.Span className="txt-gray">{getDateTime(created)}</L.Span>
      <L.Div className="margin-bottom-16">{body}</L.Div>
      {attachments &&
        attachments.length > 0 &&
        attachments.map(({ file, landlordSignature, visualization }) =>
          landlordSignature ? (
            <>
              <MessageSignatureAttachment
                appealId={appealId}
                attachment={file}
                visualization={visualization}
              />
              <MessageSignature
                appealId={appealId}
                signature={landlordSignature}
              />
            </>
          ) : (
            <MessagesAttachmentsItem
              appealId={appealId}
              attachment={{ file }}
            />
          ),
        )}
    </L.Div>
  );
};
