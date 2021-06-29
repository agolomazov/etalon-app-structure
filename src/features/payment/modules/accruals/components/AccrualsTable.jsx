import React from 'react';
import * as L from 'korus-ui';

import { AccrualsTableRow } from './AccrualsTableRow';

/**
 * ## Таблица с начислениями для оплаты
 *
 * @example
 * <AccrualsTable />
 *
 * @param {Object} props - параметры компонента
 * @param {Array} props.accruals - список начислений
 * @param {Array} props.selectedAccrualsIds - идентификаторы выбранных начислений
 * @param {boolean} props.isMultiSelection - режим множественного выбора
 * @param {Function} props.onSelectAccural - обработчик выбора начисления
 *
 * @returns {React.FC} Таблица с начислениями для оплаты
 */
export const AccrualsTable = ({
  accruals = [],
  selectedAccrualsIds = {},
  isMultiSelection = false,
  onSelectAccural,
}) => (
  <L.Div className="table">
    <L.Table>
      <L.ColGroup>
        <L.Col width="50px" />
        <L.Col width="40%" />
        <L.Col width="40%" />
        <L.Col />
      </L.ColGroup>
      <L.THead>
        <L.Tr>
          <L.Th className="table-header txt-gray" />
          <L.Th className="table-header txt-gray">Период начисления</L.Th>
          <L.Th className="table-header txt-gray">УИН</L.Th>
          <L.Th className="table-header txt-gray txt-right">Сумма</L.Th>
        </L.Tr>
      </L.THead>
      <L.TBody>
        {accruals.map(
          ({
            accrualId,
            accrualStartDate,
            accrualEndDate,
            uin,
            paymentAmount,
          }) => (
            <AccrualsTableRow
              key={accrualId}
              isMultiSelection={isMultiSelection}
              isSelected={!!selectedAccrualsIds[accrualId]}
              accrualId={accrualId}
              accrualStartDate={accrualStartDate}
              accrualEndDate={accrualEndDate}
              uin={uin}
              paymentAmount={paymentAmount}
              onSelectAccural={onSelectAccural}
            />
          ),
        )}
      </L.TBody>
    </L.Table>
  </L.Div>
);
