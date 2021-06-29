import React from 'react';
import * as L from 'korus-ui';

import { PaymentsTable } from './PaymentsTable';

/**
 * ## Таблица с историей платежей по договору
 * @example
 * <PaymentHistoryTable payments={payments}/>
 *
 * @param {object} props - параметры компонента
 * @param {Array} props.payments - список начислений
 * @param {boolean} props.isLoading - состояние загрузки
 * @param {number} props.pageNumber - текущий номер страницы
 * @param {number} props.pageSize - количество элементов на странице
 * @param {Function} props.onChangePageNumber - обработчик изменения текущей страницы
 * @param {number} props.totalItems - общее количество записей
 * @param {boolean} props.shouldRenderPagination - должен ли рендериться компонент пагинации
 *
 * @returns {React.FC} Таблица с историей платежей по договору
 */
export const PaymentHistoryTable = ({
  payments,
  isLoading,
  pageNumber,
  pageSize,
  onChangePageNumber,
  totalItems,
  shouldRenderPagination = false,
}) => (
  <L.Div className="table">
    <PaymentsTable payments={payments} />
    {shouldRenderPagination && payments.length > 0 && (
      <L.Pagination
        itemsTotalInfoRender={() => null}
        itemsRangeInfoRender={() => null}
        isLoading={isLoading}
        currentPage={pageNumber}
        pageSize={pageSize}
        totalItems={totalItems}
        onChange={(e) => onChangePageNumber(e.component.value)}
      />
    )}
  </L.Div>
);
