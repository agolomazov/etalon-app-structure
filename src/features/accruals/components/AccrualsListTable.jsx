import React from 'react';
import * as L from 'korus-ui';

import { EMPTY_CONTENT } from '@src/constants';

import { setDateFormat, getFromToDate, getDictionaryText } from '@common/utils';

/**
 * ## Вкладка со списком начислений
 * @example
 * <AccrualsList accruals={data}/>
 *
 * @param {object} props - параметры компонента
 * @param {object} props.accruals - список начислений
 * @param {Array} props.accrualTypes - типы начислений
 *
 * @returns {React.FC} Вкладка со списком начислений
 */
export const AccrualsListTable = ({ accrualTypes, accruals = [] }) => {
  if (!accruals) {
    return null;
  }
  return (
    <L.Table>
      <L.ColGroup>
        <L.Col width="30%" />
        <L.Col width="22%" />
        <L.Col />
        <L.Col width="20%" />
      </L.ColGroup>
      <L.THead>
        <L.Tr>
          <L.Th className="table-header txt-gray">Дата выставления</L.Th>
          <L.Th className="table-header txt-gray">Тип начисления</L.Th>
          <L.Th className="table-header txt-gray">Период начисления</L.Th>
          <L.Th className="table-header txt-gray txt-right">Сумма</L.Th>
        </L.Tr>
      </L.THead>
      <L.TBody>
        {accruals.length > 0 &&
          accruals.map(({ id, date, type, startDate, endDate, amount }) => (
            <L.Tr key={`accrulas${id}`}>
              <L.Td>{date ? setDateFormat(date) : EMPTY_CONTENT}</L.Td>
              <L.Td>
                {getDictionaryText(accrualTypes, type, EMPTY_CONTENT)}
              </L.Td>
              <L.Td>
                {startDate || endDate
                  ? getFromToDate(startDate, endDate)
                  : EMPTY_CONTENT}
              </L.Td>
              <L.Td className="txt-right">
                <L.RUB precision="2">{amount}</L.RUB>
              </L.Td>
            </L.Tr>
          ))}
      </L.TBody>
    </L.Table>
  );
};
