import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { APP_URLS, APP_ROUTES } from '@src/constants';
import { DownloadFileLink } from '@common/components';
import { getDateTime, formatFileSize } from '@common/utils';

/**
 * ## Элемент виджета входящих документов
 * @example
 * <IncomingDocumentsWidgetItem
 *    documentData={document}
 * />
 *
 * @param {object} props - параметры компонента
 * @param {object} props.documentData - данные входящих документов
 *
 * @returns {React.FC} Элемент виджета входящих документов
 */
export const IncomingDocumentsWidgetItem = ({ documentData }) => {
  const { appealId, date, title, text = '', attachment = null } = documentData;
  return (
    <>
      <L.Div className="margin-top-16 margin-bottom-8 txt-gray">
        {getDateTime(date)}
      </L.Div>
      <L.H6 className="margin-bottom-8">
        <Link to={APP_ROUTES.MESSAGES_APPEAL(appealId)} className="txt-black">
          {title}
        </Link>
      </L.H6>
      <L.Div className="margin-bottom-8">{text}</L.Div>
      {attachment !== null && attachment.file && (
        <L.Div
          className="inner-12
                    secondary
                    flex-row
                    align-items-center
                    margin-bottom-24"
        >
          <L.I className="novicon-doc-list margin-right-12 txt-gray" />
          <DownloadFileLink
            href={APP_URLS.appealFileUrl(appealId, attachment.file.id)}
            className="width-100 padding-right-12 txt-nowrap"
          >
            {attachment.file.name}
          </DownloadFileLink>
          <L.Span className="txt-gray shrink-0">
            {formatFileSize(attachment.file.size, 0)}
          </L.Span>
        </L.Div>
      )}
    </>
  );
};
