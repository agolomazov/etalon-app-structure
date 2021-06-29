import React from 'react';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';

import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';

import { selectors as dictionariesSelectors } from '@features/dictionaries';

import { IncomingDocumentRejectModal } from '@features/incoming-documents';
import { MessagesContainer } from '@features/messages';

/**
 * ## Страница раздела Сообщения
 * @example
 * <MessagesPage />
 *
 * @returns {React.FC} страница раздела сообщения
 */
export const MessagesPage = () => {
  const facilityRentalTypes =
    useSelector(dictionariesSelectors.facilityRentalTypes) || [];
  return (
    <MainLayout
      subHeader={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <SubHeader>
          <L.Div className="flex-row align-items-center">
            <L.H1>Сообщения</L.H1>
          </L.Div>
        </SubHeader>
      }
    >
      <L.Div
        className="page-content
        padding-left-32
        padding-top-16
        border-top
        no-background"
      >
        <MessagesContainer facilityRentalTypes={facilityRentalTypes} />
        <IncomingDocumentRejectModal />
      </L.Div>
    </MainLayout>
  );
};
