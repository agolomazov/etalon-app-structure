import React from 'react';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';

import { MainLayout } from '@common/layouts';
import { useActions } from '@common/hooks';

import {
  PaymentWidget,
  ItemCountWidget,
  IncomingDocumentsWidget,
  actions as widgetsActions,
  selectors,
} from '@features/widgets';

import { CalendarWidget } from '@features/calendar';

/**
 * ## Главная страница
 * @example
 * <MainPage />
 *
 * @returns {React.FC} Главная страница
 */
export const MainPage = () => {
  const { loadWidgetsFlow } = useActions(widgetsActions);

  const paymentWidgetData = useSelector(selectors.paymentWidgetData);
  const itemsCountWidgetData = useSelector(selectors.itemsCountWidgetData);
  const incomingDocumentsWidgetData = useSelector(
    selectors.incomingDocumentsWidgetData,
  );
  const isLoading = useSelector(selectors.isLoading);

  React.useEffect(() => {
    loadWidgetsFlow();
  }, []);

  return (
    <MainLayout>
      <L.Loader
        isLoading={isLoading}
        className="page-content page-main inner-32"
      >
        {paymentWidgetData && (
          <>
            <PaymentWidget paymentWidgetData={paymentWidgetData} />
            <L.Aside className="aside-main">
              <CalendarWidget />
              <IncomingDocumentsWidget
                incomingDocuments={incomingDocumentsWidgetData}
              />
              <ItemCountWidget itemCountWidgetData={itemsCountWidgetData} />
            </L.Aside>
          </>
        )}
      </L.Loader>
    </MainLayout>
  );
};
