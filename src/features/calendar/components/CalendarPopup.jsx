import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';
import { setDateFormat, setDateToServerDateFormat } from '@common/utils';
import { useActions } from '@common/hooks';

import { CONTRACTS_MAX_ITEMS_IN_POPUP } from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';

/**
 * ## Тултип для календаря
 *
 * @example
 * <CalendarPopup date={new Date()} />
 *
 * @param {object} props - параметры компонента
 * @param {Date} props.date - дата в календаре
 *
 * @returns {React.FC} Тултип для календаря
 */
export const CalendarPopup = ({ date }) => {
  const { loadPaymentCalendarDayDetailsFlow } = useActions(actions);
  const paymentsByDateSelector = useMemo(
    selectors.createCalendarPaymentsByDateSelector,
    [],
  );
  const paymentDate = setDateToServerDateFormat(date);
  const { totalPaymentAmount, payments } = useSelector((state) =>
    paymentsByDateSelector(state, paymentDate),
  );

  const contractInfoText = (contractNumber, contractDate) =>
    `№${contractNumber || ''} ` +
    `от ${contractDate ? setDateFormat(contractDate) : ''}`;

  const onPopup = () => loadPaymentCalendarDayDetailsFlow(date);

  return (
    <>
      <L.Div
        className="react-calendar__tile-tooltip"
        onMouseOver={onPopup}
        onFocus={() => null}
      />
      <L.Div className="calendar-tooltip padding-top-16 txt-left">
        <L.Div className="padding-x-16 margin-bottom-12 txt-gray">
          Срок оплаты по договору:
        </L.Div>
        <L.Ul className="margin-bottom-16">
          {payments
            .slice(0, CONTRACTS_MAX_ITEMS_IN_POPUP)
            .map(({ contractId, contractNumber, contractDate }) => (
              <L.Li
                key={contractId}
                className="calendar-tooltip-date
                           padding-x-16 padding-y-4 margin-bottom-8"
              >
                {contractInfoText(contractNumber, contractDate)}
              </L.Li>
            ))}
        </L.Ul>
        <L.Span
          className="padding-x-16 txt-gray"
          shouldRender={payments.length > CONTRACTS_MAX_ITEMS_IN_POPUP}
        >
          {`... ещё ${payments.length - CONTRACTS_MAX_ITEMS_IN_POPUP}`}
        </L.Span>
        <L.Div
          className="calendar-tooltip-footer flex-row align-items-center
                     padding-y-16 margin-x-16 margin-top-8 border-top"
        >
          Всего к оплате:&nbsp;
          <L.RUB precision="2">{totalPaymentAmount}</L.RUB>
          <L.A
            className="button-wrapper success margin-left-auto"
            shouldRender={false}
          >
            {getUiMessages('btnPay')}
          </L.A>
        </L.Div>
      </L.Div>
    </>
  );
};
