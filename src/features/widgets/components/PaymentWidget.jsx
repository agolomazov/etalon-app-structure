import React from 'react';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';
import { setDateWideFormat } from '@common/utils';

import { plurolizeContracts } from '../utils';

/**
 * ## Виджет с задолженостями
 * @example
 * <PaymentWidget paymentWidgetData={paymentWidgetData} />
 *
 * @param {object} props - параметры компонента
 * @param {object} props.paymentWidgetData - данные виджета
 *
 * @returns {React.FC} Виджет с задолженостями
 */
export const PaymentWidget = ({ paymentWidgetData }) => {
  if (!paymentWidgetData) {
    return null;
  }

  const { hasDebt, totalAmount, accuredContractCount } = paymentWidgetData;
  const {
    totalDebtAmount,
    totalPenaltyAmount,
    totalAmountToPayment,
    totalCurrentPeriodAmountToPayment,
  } = totalAmount;
  return (
    <L.Div className="page-wrapper width-100 margin-right-32">
      <L.Div className="card margin-bottom-16">
        <L.Div
          className="card-main-header
            flex-column
            padding-top-32
            padding-x-32
            padding-bottom-24"
        >
          <L.Div
            className="tag-custom danger align-self-start txt-large"
            shouldRender={hasDebt}
          >
            У вас есть задолженность!
          </L.Div>
          <L.H5 className="padding-top-8 txt-normal">
            {/* Бэкэнд (widget/payment) будет отдавать текущую дату */}
            {setDateWideFormat()}
          </L.H5>
          <L.Div className="flex-row padding-top-32 margin-top-auto">
            <L.H5 className="align-self-end line-height-1">Всего к оплате</L.H5>
            <L.H1 className="title-main margin-left-auto line-height-1">
              <L.RUB precision="2">{totalAmountToPayment}</L.RUB>
            </L.H1>
          </L.Div>
        </L.Div>
        <L.Div className="padding-x-32">
          <L.Div
            className="flex-row align-items-center padding-y-16 border-bottom"
            shouldRender={Number(totalDebtAmount) > 0}
          >
            <L.Div>
              <L.H5
                className="block-inline margin-right-12
                           line-height-1 txt-danger"
              >
                Задолженность
              </L.H5>
              <L.Span
                className="block-inline txt-gray"
                shouldRender={Number(totalPenaltyAmount) > 0}
              >
                {`с учетом пени ${Number(totalPenaltyAmount).toFixed(2)} ₽`}
              </L.Span>
            </L.Div>
            <L.H2 className="title-main-secondary margin-left-auto txt-danger">
              <L.RUB precision="2">{totalDebtAmount}</L.RUB>
            </L.H2>
          </L.Div>
          {/* <L.Div
            className="flex-row
              align-items-center
              padding-y-16
               border-bottom-dashed
              border-bottom-dashed-md"
          > */}
          {/* Раскоментить верх убрать наз после включения кнопок оплаты */}
          <L.Div
            className="flex-row
              align-items-center
              padding-y-16"
          >
            <L.Div>
              <L.H5 className="block-inline margin-right-12 line-height-1">
                К оплате в этом периоде
              </L.H5>
              <L.Span className="block-inline txt-gray">
                {`начисление по ${plurolizeContracts(accuredContractCount)}`}
              </L.Span>
            </L.Div>
            <L.H2 className="title-main-secondary margin-left-auto">
              <L.RUB precision="2">{totalCurrentPeriodAmountToPayment}</L.RUB>
            </L.H2>
          </L.Div>
          <L.Div
            className="flex-row align-items-center padding-y-16"
            shouldRender={false}
          >
            <L.Span className="subtitle">Возможна частичная оплата</L.Span>
            <L.Button className="success margin-left-auto">
              {getUiMessages('btnPay')}
            </L.Button>
          </L.Div>
        </L.Div>
      </L.Div>
    </L.Div>
  );
};
