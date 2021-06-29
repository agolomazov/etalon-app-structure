import React from 'react';
import * as L from 'korus-ui';

import { getDateTime, formatFileSize } from '@common/utils';

/**
 * ## Компонент входящий документ требующий подверждение получения
 * @example
 *
 * <IncomingDocumentConfirmationRequired title="Уведомление об изменении арендной платы" date="2020-07-10T07:11:57Z"/>
 *
 * @param {object} props данные сообщения
 * @param {string} props.title наименование документа
 * @param {string} props.date дата и время получения входящего документа
 * @param {Array} props.attachments Вложения
 *
 * @returns {React.FC} входящий документ требующий подверждение получения
 */
export const IncomingDocumentConfirmationRequired = ({
  title,
  date,
  attachments = [],
}) => (
  <L.Div className="border-bottom margin-bottom-16 padding-bottom-24">
    <L.Div className="txt-gray padding-bottom-8">{getDateTime(date)}</L.Div>
    <L.H6 className="padding-bottom-8">{title}</L.H6>
    <L.Div
      shouldRender={attachments.length > 0}
      className="secondary
                flex-row
                justify-content-between
                align-items-center
                padding-x-16
                padding-y-12"
    >
      {attachments.map(({ file: { id, name, size } = {} }) => (
        <React.Fragment key={id}>
          <L.Div>
            <L.I className="novicon-doc-list margin-right-12 txt-gray" />
            <L.A>{name}</L.A>
          </L.Div>
          <L.Span className="txt-gray">{formatFileSize(size)}</L.Span>
        </React.Fragment>
      ))}
    </L.Div>
  </L.Div>
);
