import React from 'react';
import * as L from 'korus-ui';

import { setDateFormat } from '@common/utils';
import { EMPTY_CONTENT } from '@src/constants';

/**
 * ## Таблица со списком платежей
 * @example
 * <PaymentsTable payments={payments}/>
 *
 * @param {object} props - параметры компонента
 * @param {object} props.payments - список начислений
 *
 * @returns {React.FC} Таблица со списком платежей
 */
export const PaymentsTable = ({ payments = [] }) => (
  <L.Table>
    <L.ColGroup>
      <L.Col width="36px" />
      <L.Col width="27%" />
      <L.Col width="22%" />
      <L.Col />
      <L.Col width="20%" />
    </L.ColGroup>
    <L.THead>
      <L.Tr>
        <L.Th className="table-header txt-gray" />
        <L.Th className="table-header txt-gray">Дата поступления платежа</L.Th>
        <L.Th className="table-header txt-gray">Платежное поручение</L.Th>
        <L.Th className="table-header txt-gray">Дата платежного поручения</L.Th>
        <L.Th className="table-header txt-gray txt-right">Сумма</L.Th>
      </L.Tr>
    </L.THead>
    <L.TBody>
      {payments.map(
        ({ id, receiveDate, paymentDocNumber, paymentDocDate, amount }) => (
          <L.Tr key={`payment${id}`}>
            <L.Td>
              <L.I className="novicon-success-fill txt-success" />
            </L.Td>
            <L.Td>{setDateFormat(receiveDate)}</L.Td>
            <L.Td>
              {paymentDocNumber ? (
                <>
                  <L.Span className="txt-gray">№</L.Span>
                  {paymentDocNumber}
                </>
              ) : (
                EMPTY_CONTENT
              )}
            </L.Td>
            <L.Td>
              {paymentDocDate ? setDateFormat(paymentDocDate) : EMPTY_CONTENT}
            </L.Td>
            <L.Td className="txt-right">
              <L.RUB precision="2">{amount}</L.RUB>
            </L.Td>
          </L.Tr>
        ),
      )}
    </L.TBody>
  </L.Table>
);
