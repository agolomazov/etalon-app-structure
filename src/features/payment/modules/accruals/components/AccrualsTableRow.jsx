import React from 'react';
import * as L from 'korus-ui';

import { getFromToDate } from '@common/utils';

import {
  EMPTY_PERIOD_TOOLTIP_TITLE,
  EMPTY_UIN_TOOLTIP_TITLE,
} from '../../../constants';

const AccrualPeriodTooltip = ({ title, children }) =>
  title ? <L.Tooltip title={title}>{children}</L.Tooltip> : <>{children}</>;

/**
 * ## Строка в таблице с начислениями для оплаты
 *
 * @example
 * <AccrualsTableRow />
 *
 * @param {Object} props - параметры компонента
 * @param {boolean} props.isMultiSelection - режим множественного выбора
 * @param {boolean} props.isSelected - значение выбора
 * @param {string} props.accrualId - id начисления
 * @param {string} props.accrualStartDate - Дата начала периода
 * @param {string} props.accrualEndDate - Дата окончания периода
 * @param {string} props.uin - uin начисления
 * @param {string} props.paymentAmount - сумма к оплате
 * @param {Function} props.onSelectAccural - обработчик выбора начисления
 *
 * @returns {React.FC} Строка в таблице с начислениями для оплаты
 */
export const AccrualsTableRow = React.memo(function AccrualsTableRow({
  isMultiSelection = false,
  isSelected,
  accrualId,
  accrualStartDate,
  accrualEndDate,
  uin,
  paymentAmount,
  onSelectAccural,
}) {
  const hasAccrualPeriod = !!(accrualStartDate && accrualEndDate);
  const accrualPeriodDisplay = hasAccrualPeriod
    ? getFromToDate(accrualStartDate, accrualEndDate)
    : 'Период не заполнен';
  const uinDisplay = uin || 'Отсутствует';

  const tooltipPeriodTitle =
    (!uin && !isMultiSelection && EMPTY_UIN_TOOLTIP_TITLE) ||
    (!hasAccrualPeriod && EMPTY_PERIOD_TOOLTIP_TITLE) ||
    '';

  const tooltipUinTitle =
    (!uin && !isMultiSelection && EMPTY_UIN_TOOLTIP_TITLE) || '';

  const isDisablePeriod = !hasAccrualPeriod;
  const isDisableUin = !uin;
  const isDisableAll = isDisableUin && !isMultiSelection;

  const onChange = (e) =>
    onSelectAccural({
      accrualId,
      isSelected: isMultiSelection ? e.component.value : true,
    });

  return (
    <L.Tr>
      <L.Td>
        {isMultiSelection ? (
          <L.CheckBox
            className="checkbox-single"
            value={isSelected}
            onChange={onChange}
          />
        ) : (
          <L.RadioGroup
            value={isSelected ? accrualId : null}
            onChange={onChange}
          >
            <L.RadioButton value={accrualId} isDisabled={isDisableAll} />
          </L.RadioGroup>
        )}
      </L.Td>

      <L.Td>
        <AccrualPeriodTooltip title={tooltipPeriodTitle}>
          <L.Span _txt-light-gray={isDisablePeriod || isDisableAll}>
            {accrualPeriodDisplay}
          </L.Span>
        </AccrualPeriodTooltip>
      </L.Td>

      <L.Td>
        <AccrualPeriodTooltip title={tooltipUinTitle}>
          <L.Span _txt-light-gray={isDisableUin || isDisableAll}>
            {uinDisplay}
          </L.Span>
        </AccrualPeriodTooltip>
      </L.Td>

      <L.Td className="txt-right">
        <L.RUB precision="2" _txt-light-gray={isDisableAll}>
          {paymentAmount}
        </L.RUB>
      </L.Td>
    </L.Tr>
  );
});
