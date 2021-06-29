import React from 'react';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';

import { useActions } from '@common/hooks';

import { OverpaymentPaymentOrder } from './OverpaymentPaymentOrder';

import { PAYMENT_ORDERS_MAX_COUNT } from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';

/**
 * ## Компонент отображает список платежных поручений
 *
 * @example
 * <OverpaymentPaymentOrdersList />
 *
 * @param {object} props - Параметры компонента
 *
 * @returns {React.FC} Компонент отображает список обращений
 */
export const OverpaymentPaymentOrdersList = () => {
  const paymentOrders = useSelector(selectors.appealPaymentOrders);
  const appealId = useSelector(selectors.appealId);
  const {
    addPaymentOrder,
    deletePaymentOrder,
    setPaymentOrderField,
  } = useActions(actions);

  const moreThanOneOrder = paymentOrders.length > 1;
  const canAddPaymentOrder = paymentOrders.length !== PAYMENT_ORDERS_MAX_COUNT;

  return (
    <>
      <L.H6 className="margin-bottom-12">
        3. Укажите данные платежных поручений
      </L.H6>
      {paymentOrders &&
        paymentOrders.map((paymentOrder) => (
          <OverpaymentPaymentOrder
            key={paymentOrder.paymentOrderId}
            appealId={appealId}
            paymentOrder={paymentOrder}
            onChangePaymentOrderField={setPaymentOrderField}
            onDeletePaymentOrder={deletePaymentOrder}
            shouldRenderDeleteButton={moreThanOneOrder}
          />
        ))}

      <L.Button
        className="blank padding-none margin-bottom-32"
        onClick={addPaymentOrder}
        isDisabled={!canAddPaymentOrder}
      >
        + Добавить платежное поручение
      </L.Button>
    </>
  );
};
