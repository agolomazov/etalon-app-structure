import React from 'react';

import { MessagesAttachmentsItem } from './MessagesAttachmentsItem';
/**
 * ## Компонент отображающий список фалов обращения
 * @example
 * <MessagesAttachmentsList appealId={appealId} attachments={attachments}/>
 *
 * @param {object} props - параметры компонента
 * @param {number|string} props.appealId - идентификатор обращения
 * @param {array} props.attachments - список файлов
 *
 * @returns {React.FC} список фалов обращения
 */
export const MessagesAttachmentsList = ({ appealId, attachments }) => (
  <>
    {attachments.length > 0 &&
      attachments.map((attachment) => (
        <MessagesAttachmentsItem
          key={attachment.file.id}
          appealId={appealId}
          attachment={attachment}
        />
      ))}
  </>
);
