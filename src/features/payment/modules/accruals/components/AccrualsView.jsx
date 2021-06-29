import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { ListEmpty } from '@common/components';
import { useActions } from '@common/hooks';

import { PAYMENT_METHOD_TYPES, BCC_TITLE_MAP } from '../../../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';

import { AccrualsTable } from './AccrualsTable';
import { AccrualsToolbar } from './AccrualsToolbar';

/**
 * ## Начисления для оплаты по контракту
 *
 * @example
 * <AccrualsView contractId={contractId}/>
 *
 * @param {object} props - параметры компонента
 * @param {string} props.contractId - идентификатор договора
 *
 * @returns {React.FC} Начисления для оплаты по контракту
 */
export const AccrualsView = ({ contractId }) => {
  const isEmpty = useSelector(selectors.isEmpty);
  const isLoading = useSelector(selectors.isLoading);
  const paymentMethod = useSelector(selectors.paymentMethod);
  const currentBcc = useSelector(selectors.bcc);
  const bccList = useSelector(selectors.bccList);
  const accruals = useSelector(selectors.accruals);
  const selectedAccrualsIds = useSelector(selectors.selectedAccrualsIds);
  const totalAmount = useSelector(selectors.totalAmount);
  const isMultiSelection = paymentMethod === PAYMENT_METHOD_TYPES.LK;
  const {
    setPaymentMethod,
    setBcc,
    selectAccrual,
    selectBccAccruals,
    loadPaymentAccrualsFlow,
    goToPaymentFlow,
  } = useActions(actions);

  useEffect(() => {
    loadPaymentAccrualsFlow(contractId);
  }, [contractId]);

  if (isEmpty && !isLoading) {
    return (
      <L.Div className="page-content padding-x-32 padding-y-16 border-top">
        <L.Div className="page-wrapper">
          <ListEmpty />
        </L.Div>
      </L.Div>
    );
  }

  return (
    <L.Loader
      className="page-content padding-x-32 padding-y-16 border-top"
      isLoading={isLoading}
    >
      <L.Div className="page-wrapper">
        <L.Tabs
          className="tabs-wrapper-nav padding-top-16"
          activeTabKey={paymentMethod}
          onChange={(e) => setPaymentMethod(e.component.value)}
        >
          <L.Tab
            title="Через Личный кабинет"
            tabKey={PAYMENT_METHOD_TYPES.LK}
          />
          <L.Tab
            tabKey={PAYMENT_METHOD_TYPES.EPGU}
            tabRender={({ Element, elementProps }) => (
              <Element {...elementProps}>
                <L.Tooltip
                  title="На&nbsp;ЕПГУ возможна оплата только начислений
                         с&nbsp;УИН.
                         Оплата осуществляется отдельно
                         по&nbsp;каждому начислению."
                >
                  Через ЕПГУ
                </L.Tooltip>
              </Element>
            )}
          />
        </L.Tabs>

        <L.Tabs
          className="tabs-wrapper-bordered"
          activeTabKey={currentBcc}
          onChange={(e) => setBcc(e.component.value)}
        >
          {bccList.map((bcc) => (
            <L.Tab
              title={BCC_TITLE_MAP[bcc]?.title || bcc}
              tabKey={bcc}
              key={bcc}
            />
          ))}
        </L.Tabs>

        <AccrualsTable
          isMultiSelection={isMultiSelection}
          accruals={accruals}
          selectedAccrualsIds={selectedAccrualsIds}
          onSelectAccural={selectAccrual}
        />
      </L.Div>

      <AccrualsToolbar
        isMultiSelection={isMultiSelection}
        selectedCount={Object.keys(selectedAccrualsIds).length}
        totalAmount={totalAmount}
        onSelectAll={selectBccAccruals}
        onSubmit={() => goToPaymentFlow({ contractId })}
      />
    </L.Loader>
  );
};
