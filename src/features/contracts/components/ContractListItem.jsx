import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { APP_ROUTES, CONTRACT_STATUS_TYPES } from '@src/constants';
import { setDateFormat, getCardColor, getFullPeriodText } from '@common/utils';
import { getUiMessages } from '@common/messages';

import { getTotalPayment } from '../utils';

/**
 * ## Элемент списка договоров
 *
 * @example
 * <ContractListItem contractData={data}/>
 *
 * @param {object} props - Параметры компонента
 * @param {object} props.contractData - информация о договоре
 * @param {Array} props.accrualPeriods - значения словаря
 *
 * @returns {React.FC} Элемент списка договоров
 */
export const ContractListItem = ({ contractData, accrualPeriods }) => {
  const {
    id,
    number,
    date,
    facilityRentalAddress = [],
    currentPeriodAmountForPayment = '',
    debtAmount = '',
    penaltyAmount = '',
    rentalCalculationPeriodId = '',
    nextPaymentDate = null,
    overpaymentAmount = '',
    statusId = null,
  } = contractData;

  const totalPayment = getTotalPayment(
    debtAmount,
    penaltyAmount,
    currentPeriodAmountForPayment,
  );

  const setCardColor = getCardColor(
    penaltyAmount,
    debtAmount,
    overpaymentAmount,
  );

  const shouldRenderTotalSum =
    totalPayment > 0 || statusId !== CONTRACT_STATUS_TYPES.TERMINATED;
  const shouldRenderRemark =
    Number(currentPeriodAmountForPayment) === 0 &&
    statusId === CONTRACT_STATUS_TYPES.ACTIVE;

  return (
    <>
      <L.Div
        className={`card
          ${setCardColor}
          padding-x-32
          padding-top-16
          padding-bottom-8
          margin-bottom-8`}
      >
        <Link to={APP_ROUTES.CONTRACT_DETAILS(id)} className="link-overlay" />
        {Number(overpaymentAmount) !== 0 && (
          <L.Div
            className="message warning block-inline
                       inner-12 margin-bottom-16"
          >
            <L.I
              className="novicon-exclamation-in-circle-fill
                         txt-warning padding-right-8"
            />
            {`Переплата `}
            <L.RUB precision="2">{overpaymentAmount}</L.RUB>
          </L.Div>
        )}
        <L.Div className="txt-gray">
          {`Договор №${number} от ${setDateFormat(date)}`}
        </L.Div>
        <L.Div className="flex-row">
          <L.H6 className="padding-bottom-16">
            {facilityRentalAddress.length > 0
              ? facilityRentalAddress[0]
              : getUiMessages('msgNoAddress')}
          </L.H6>
          <L.Span
            className="margin-left-auto txt-large txt-gray"
            shouldRender={shouldRenderTotalSum}
          >
            {`Общая сумма: `}
            <L.RUB precision="2">{` ${totalPayment}`}</L.RUB>
          </L.Span>
        </L.Div>
        <L.Div className={shouldRenderTotalSum ? 'border-top' : ''}>
          {Number(debtAmount) !== 0 && (
            <L.Div
              className="flex-row
                align-items-center
                padding-y-8
                txt-danger
                border-bottom-dashed"
            >
              Задолженность
              <L.H6 className="margin-left-auto">
                <L.RUB precision="2">{debtAmount}</L.RUB>
              </L.H6>
            </L.Div>
          )}
          {Number(penaltyAmount) !== 0 && (
            <L.Div
              className="flex-row
                align-items-center
                padding-y-8
                txt-danger
                "
            >
              Пени
              <L.H6 className="margin-left-auto">
                <L.RUB precision="2">{penaltyAmount}</L.RUB>
              </L.H6>
            </L.Div>
          )}
          <L.Div
            shouldRender={
              currentPeriodAmountForPayment !== 0 &&
              statusId !== CONTRACT_STATUS_TYPES.TERMINATED
            }
          >
            <L.Div className="border-bottom-dashed" />
            <L.Div className="flex-row align-items-center padding-y-8">
              {`${getFullPeriodText(
                rentalCalculationPeriodId,
                accrualPeriods,
              )} ${shouldRenderRemark ? '(с учетом авансового платежа)' : ''}`}
              <L.Span
                className="margin-left-16 txt-gray"
                shouldRender={nextPaymentDate !== null}
              >
                {`оплатить до ${setDateFormat(nextPaymentDate)}`}
              </L.Span>
              <L.H6 className="margin-left-auto">
                <L.RUB precision="2">
                  {`${currentPeriodAmountForPayment}`}
                </L.RUB>
              </L.H6>
            </L.Div>
          </L.Div>
        </L.Div>
      </L.Div>
    </>
  );
};
