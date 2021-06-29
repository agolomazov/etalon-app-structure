import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { getUiMessages } from '@common/messages';
import { setDateFormat, getCardColor, getFullPeriodText } from '@common/utils';
import { useActions } from '@common/hooks';

import {
  APP_ROUTES,
  APP_QUERY_PARAMS,
  CONTRACT_STATUS_TYPES,
} from '@src/constants';

import { actions } from '../ducks';

/**
 * ## Карточка договора
 *
 * @example
 *
 * <ContractDetailsCard
 *    contractDetails={contractDetails}
 *    accrualPeriods={accrualPeriods}
 * />
 *
 * @param {object} props - параметры компонента
 * @param {object} props.contractDetails - детальная информация о договоре
 * @param {object} props.accrualPeriods - типы периодов начисления
 *
 * @returns {React.FC} Компонент "Карточка договора"
 */
export const ContractDetailsCard = ({ contractDetails, accrualPeriods }) => {
  const { loadContractReceiptFlow, loadContract1cFlow } = useActions(actions);

  const {
    id,
    overpaymentAmount = '',
    facilityRentalAddress = [],
    debtAmount = '',
    penaltyAmount = '',
    rentalCalculationMethod = '',
    nextPaymentDate = null,
    currentPeriodAmountForPayment = '',
    status,
  } = contractDetails;

  const cardColor = getCardColor(penaltyAmount, debtAmount, overpaymentAmount);

  // eslint-disable-next-line max-len
  const overpaymentLink = `${APP_ROUTES.SITUATION_OVERPAYMENT}?${APP_QUERY_PARAMS.CONTRACT_ID}=${id}`;

  const shouldRenderRemark =
    Number(currentPeriodAmountForPayment) === 0 &&
    status === CONTRACT_STATUS_TYPES.ACTIVE;

  return (
    <>
      {Number(overpaymentAmount) !== 0 && (
        <L.Div className="page-wrapper-md">
          <L.Div className="message warning inner-12 margin-bottom-16">
            <L.I
              className="
                    novicon-exclamation-in-circle-fill
                    txt-warning
                    padding-right-8"
            />
            {`Переплата `}
            <L.RUB precision="2">{overpaymentAmount}</L.RUB>
            <Link className="padding-left-8" to={overpaymentLink}>
              Распорядиться переплатой
            </Link>
          </L.Div>
        </L.Div>
      )}
      <L.Div
        className={`
              card
              ${cardColor}
              padding-x-32
              padding-y-16
              margin-bottom-8
            `}
      >
        <L.H6 className="padding-bottom-16">
          {facilityRentalAddress.length !== 0
            ? facilityRentalAddress[0]
            : getUiMessages('msgNoAddress')}
        </L.H6>
        <L.Div className="border-top">
          {Number(debtAmount) !== 0 && (
            <L.Div
              className="flex-row
                    align-items-center
                    padding-y-8
                    txt-danger
                    border-bottom-dashed"
            >
              Задолженность
              <L.H6 className="flex-row align-items-center margin-left-auto">
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
                    border-bottom-dashed"
            >
              Пени
              <L.H6 className="flex-row align-items-center margin-left-auto">
                <L.RUB precision="2">{penaltyAmount}</L.RUB>
              </L.H6>
            </L.Div>
          )}
          {currentPeriodAmountForPayment !== 0 &&
            status !== CONTRACT_STATUS_TYPES.TERMINATED && (
              <L.Div
                className="
                      flex-row
                      align-items-center
                      padding-y-8
                      border-bottom-dashed"
              >
                {`${getFullPeriodText(
                  rentalCalculationMethod,
                  accrualPeriods,
                )} ${
                  shouldRenderRemark ? '(с учетом авансового платежа)' : ''
                }`}
                <L.Span
                  className="margin-left-16 txt-gray"
                  shouldRender={nextPaymentDate !== null}
                >
                  {`оплатить до ${setDateFormat(nextPaymentDate)}`}
                </L.Span>
                <L.H6 className="flex-row align-items-center margin-left-auto">
                  <L.RUB precision="2">{currentPeriodAmountForPayment}</L.RUB>
                </L.H6>
              </L.Div>
            )}
          <L.Div
            className="flex-row
                      flex-wrap
                      align-items-center
                      padding-top-16"
          >
            <Link to="#" download onClick={() => loadContractReceiptFlow(id)}>
              <L.I className="novicon-doc-list margin-right-8" />
              Сформировать квитанцию
            </Link>
            <Link
              to="#"
              className="margin-left-32"
              download
              onClick={() => loadContract1cFlow(id)}
            >
              <L.I className="novicon-upload margin-right-8" />
              Выгрузка 1С
            </Link>
            <L.Div className="margin-left-auto">
              <L.Span className="txt-small txt-gray">
                Платеж будет учтен в течение 10 дней после совершения оплаты
              </L.Span>
              <Link
                className="button-wrapper success margin-left-24"
                to={APP_ROUTES.CONTRACT_PAYMENT(id)}
              >
                {getUiMessages('btnPay')}
              </Link>
            </L.Div>
          </L.Div>
        </L.Div>
      </L.Div>
    </>
  );
};
