import React, { useState, useEffect } from 'react';
import * as L from 'korus-ui';

import { IncomingDocumentsWidgetItem } from './IncomingDocumentsWidgetItem';

/**
 * ## Виджет входящих документов
 * @example
 * <IncomingDocumentsWidget
 *    incomingDocuments={incomingDocuments}
 * />
 *
 * @param {object} props - параметры компонента
 * @param {object} props.incomingDocuments - данные входящих документов
 *
 * @returns {React.FC} Виджет входящих документов
 */
export const IncomingDocumentsWidget = ({ incomingDocuments }) => {
  const [activeDocument, setActiveDocument] = useState(null);
  const hasIncomingDocuments =
    incomingDocuments && incomingDocuments.length > 0;

  useEffect(() => setActiveDocument(incomingDocuments[0] || null), [
    incomingDocuments,
  ]);

  return (
    <L.Div className="aside-main-item inner-24 margin-bottom-32">
      <L.Div
        className="flex-row
                  align-items-center
                  padding-bottom-16
                  border-bottom"
      >
        Входящие документы
        <L.Img
          src="https://cdn.esphere.ru/images/nova/icons/mail.svg"
          className="margin-left-auto"
          alt="Входящие документы"
        />
      </L.Div>

      {activeDocument !== null && (
        <IncomingDocumentsWidgetItem documentData={activeDocument} />
      )}

      {!hasIncomingDocuments && (
        <>
          <L.Div className="margin-top-16 margin-bottom-8 txt-gray" />
          <L.H6 className="margin-bottom-8">Нет входящих документов</L.H6>
        </>
      )}

      <L.Div className="margin-bottom-8" />
      <L.Div className="flex-row justify-content-end">
        {hasIncomingDocuments &&
          incomingDocuments.map((document) => (
            <L.Div
              key={document.appealId}
              className={`dot ${
                document.appealId === activeDocument?.appealId ? 'active' : ''
              }`}
              onClick={() => setActiveDocument(document)}
            />
          ))}
      </L.Div>
    </L.Div>
  );
};
