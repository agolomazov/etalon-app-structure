import React from 'react';
import * as L from 'korus-ui';

import { APP_URLS } from '@src/constants';
import { DownloadFileLink } from '@common/components';
import { MessagesAttachmentsItem } from './MessagesAttachmentsItem';

/**
 * ## Компонент отображающий информацию о документе
 * @example
 * <MessageSignatureAttachment attachment={attachment}/>
 *
 * @param {object} props - параметры компанента
 * @param {string} props.appealId - id обращения
 * @param {object} props.attachment - информация о документе
 * @param {object} props.visualization - визуализация подписи
 *
 * @returns {React.FC} Компонент информации о документе
 */
export const MessageSignatureAttachment = ({
  appealId,
  attachment,
  visualization,
}) => (
  <L.Div className="flex-row">
    <MessagesAttachmentsItem
      appealId={appealId}
      attachment={{ file: attachment }}
    />
    {visualization && (
      <L.Tooltip title="Документ с отметкой о подписании">
        <DownloadFileLink
          href={APP_URLS.appealFileUrl(appealId, visualization.id)}
          className="inner-12"
        >
          <L.I className="novicon-print txt-gray" />
        </DownloadFileLink>
      </L.Tooltip>
    )}
  </L.Div>
);
