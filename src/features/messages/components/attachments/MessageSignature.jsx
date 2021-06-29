import React from 'react';
import * as L from 'korus-ui';

import { setDateFormat } from '@common/utils';
import { DownloadFileLink } from '@common/components';

import { APP_URLS } from '@src/constants';

/**
 * ## Компонент отображающий информацию о подписи
 * @example
 * <MessageSignature signature={data} appealId={id} />
 *
 * @param {object} props - параметры компанента
 * @param {object} props.signature - информация о подписи
 * @param {object} props.appealId - id документа
 *
 * @returns {React.FC} Компонент информации о подписи
 */
export const MessageSignature = ({ signature, appealId }) => {
  const { date, id, signerName = '', organization = '' } = signature;
  return (
    <L.Div className="flex-row margin-bottom-8">
      <L.Div
        className="flex-row
          padding-x-16
          padding-y-12
          border"
      >
        <L.I className="novicon-signed margin-right-8 txt-gray-2" />
        <L.Div>
          <DownloadFileLink href={APP_URLS.appealFileUrl(appealId, id)}>
            {signerName}
          </DownloadFileLink>
          <L.Span className="margin-left-4 txt-gray">
            {setDateFormat(date)}
          </L.Span>
          <L.Div className="margin-top-8 txt-gray">{organization}</L.Div>
        </L.Div>
      </L.Div>
      <L.Tooltip title="Подпись&nbsp;верна">
        <L.I
          className="novicon-success-fill
            padding-x-16
            padding-y-12
            txt-success"
        />
      </L.Tooltip>
    </L.Div>
  );
};
