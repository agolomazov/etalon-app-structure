import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as L from 'korus-ui';

import { setDateFormat } from '@common/utils';
import { MainLayout } from '@common/layouts';

// eslint-disable-next-line max-len
import { selectors as contractDetailsSelector } from '@features/contract-details';
import { UpsView, UpsPageTitle } from '@features/payment';

/**
 * ## Страница "Онлайн оплата через ЕПС"
 *
 * @example
 * <ContractPaymentUpsPage />
 *
 * @returns {React.FC} Страница "Онлайн оплата через ЕПС"
 */
export const ContractPaymentUpsPage = () => {
  const history = useHistory();
  const contractNumber = useSelector(contractDetailsSelector.contractNumber);
  const contractDate = useSelector(contractDetailsSelector.contractDate);

  return (
    <MainLayout
      subHeader={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <L.Div className="page-title">
          <L.Div className="flex-row align-items-center">
            <Link
              to="#"
              onClick={() => history.goBack()}
              className="novicon-arrow-backward backward-link
                         txt-gray margin-right-12"
            />
            <L.H1>
              <UpsPageTitle />
            </L.H1>
          </L.Div>
          <L.Div
            className="subtitle margin-left-32"
            shouldRender={!!contractNumber && !!contractDate}
          >
            {`Договор ${contractNumber} от ${setDateFormat(contractDate)}`}
          </L.Div>
        </L.Div>
      }
    >
      <UpsView />
    </MainLayout>
  );
};
