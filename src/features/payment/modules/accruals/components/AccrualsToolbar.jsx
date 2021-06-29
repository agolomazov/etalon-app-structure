import React from 'react';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';

/**
 * ## Тулбар для таблицы с начислениями
 *
 * @example
 * <AccrualsToolbar />
 *
 * @param {Object} props - параметры компонента
 * @param {boolean} props.isMultiSelection - режим множественного выбора
 * @param {number} props.selectedCount - количество выбранных начислений
 * @param {string|number} props.totalAmount - общая сумма
 * @param {Function} props.onSelectAll - обработчик "выбрать все"
 * @param {Function} props.onSubmit - обработчик для кнопки оплатить
 *
 * @returns {React.FC} Тулбар для таблицы с начислениями
 */
export const AccrualsToolbar = ({
  isMultiSelection = false,
  selectedCount = 0,
  totalAmount = 0,
  onSelectAll,
  onSubmit,
}) => (
  <L.Div className="toolbar fixed flex-row align-items-center padding-x-32">
    <L.Div className="margin-right-auto" shouldRender={isMultiSelection}>
      <L.CheckBox
        className="checkbox-single"
        value={selectedCount > 0}
        onChange={(e) => onSelectAll(e.component.value)}
      />
      <L.Span className="margin-left-16 txt-bold">
        {`Выбрано ${selectedCount}`}
      </L.Span>
    </L.Div>

    <L.Div className="margin-left-auto">
      <L.Span className="padding-right-16 margin-right-32 txt-bold">
        <>{`Сумма: `}</>
        <L.RUB precision="2">{totalAmount}</L.RUB>
      </L.Span>
      <L.Button
        className="margin-left-32 success"
        isDisabled={selectedCount === 0}
        onClick={() => onSubmit()}
      >
        {getUiMessages('btnPay')}
      </L.Button>
    </L.Div>
  </L.Div>
);
