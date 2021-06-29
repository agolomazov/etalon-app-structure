import React from 'react';
import * as L from 'korus-ui';

import { AccrualsListTable } from './AccrualsListTable';

/**
 * ## Таблица с начислениями по договору
 * @example
 * <AccrualsList
 *    accruals={accruals}
 *    accrualTypes={accrualTypes}
 * />
 *
 * @param {object} props - параметры компонента
 * @param {string} props.accruals - список начислений
 * @param {string} props.isLoading - состояние загрузки
 * @param {string} props.pageNumber - текущий номер страницы
 * @param {string} props.pageSize - количество элементов на странице
 * @param {string} props.totalItems - общее количество записей
 * @param {string} props.onChangePageNumber - обработчик изменения текущей страницы
 * @param {boolean} props.shouldRenderPagination - должен ли рендериться компонент пагинации
 * @param {Array} props.accrualTypes - типы начислений
 *
 * @returns {React.FC} Таблица с начислениями по договору
 */
export const AccrualsList = ({
  accruals,
  isLoading,
  pageNumber,
  pageSize,
  totalItems,
  onChangePageNumber,
  shouldRenderPagination = false,
  accrualTypes,
}) => (
  <L.Div className="table">
    <AccrualsListTable accruals={accruals} accrualTypes={accrualTypes} />
    {shouldRenderPagination && accruals.length > 0 && (
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
