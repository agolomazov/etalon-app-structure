import React from 'react';
import * as L from 'korus-ui';

import { getFileExtension, getFileName, formatFileSize } from '@common/utils';
import { APP_URLS } from '@src/constants';
import { DownloadFileLink } from '@common/components';

/**
 * ## Компонент отображающий информацию о файле в обращении
 * @example
 * <MessagesAttachmentsItem appealId={appealId} attachment={attachment}/>
 *
 * @param {object} props - параметры компонента
 * @param {number|string} props.appealId - идентификатор обращения
 * @param {object} props.attachment - данные по файлу
 *
 * @returns {React.FC} Компонент информации о файле
 */
export const MessagesAttachmentsItem = ({ appealId, attachment }) => {
  const { file: { id, name, size } = {} } = attachment || {};
  return (
    <L.Div>
      <DownloadFileLink
        className="message-body-file
                    flex-inline
                    secondary
                    padding-x-16
                    padding-y-12
                    margin-right-8
                    margin-bottom-8"
        href={APP_URLS.appealFileUrl(appealId, id)}
      >
        <L.I className="novicon-doc-list margin-right-12 txt-light-gray" />
        <L.Span className="block-inline txt-nowrap">{getFileName(name)}</L.Span>
        {getFileExtension(name)}
        <L.Span className="shrink-0 padding-left-24 margin-left-auto txt-gray">
          {formatFileSize(size)}
        </L.Span>
      </DownloadFileLink>
    </L.Div>
  );
};
