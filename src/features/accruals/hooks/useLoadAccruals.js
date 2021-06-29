import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useActions } from '@common/hooks';

import { DEFAULT_PAGE_SIZE } from '@src/constants';

import { actions } from '../ducks';
import { selectors } from '../selectors';

/**
 * @typedef {object} LoadAccrualsHook
 * @property {number} accruals - список начислений
 * @property {boolean} isLoading - состояние загрузки
 * @property {number} pageNumber - текущий номер страницы
 * @property {number} pageSize - количество элементов на странице
 * @property {number} totalItems - общее количество записей
 * @property {function} setPageNumber - функция для установки нового номера страницы
 */
/**
 * Хук запускает эффект загрузки списка начислений, если поменялись входные параметры
 *
 * @param {object} params - Параметры хука
 * @param {string} params.contractId - Id договора
 * @param {string} params.sortField - Поле, по которому проводится сортировка
 * @param {"ASC"|"DESC"} params.sortDirection - Направление, по которому проводится сортировка
 *
 * @returns {LoadAccrualsHook} результат
 */
export const useLoadAccruals = ({ contractId, sortField, sortDirection }) => {
  const accruals = useSelector(selectors.accruals);
  const isLoading = useSelector(selectors.isLoading);
  const { pageNumber, totalItems } = useSelector(selectors.pagination);
  const { loadAccrualsFlow } = useActions(actions);

  const loadAccrualsByPage = (newPageNumber, pageSize) =>
    loadAccrualsFlow({
      contractId,
      sort: {
        field: sortField,
        direction: sortDirection,
      },
      page: { number: newPageNumber, size: pageSize },
    });

  const setPageNumber = (newPageNumber) => {
    loadAccrualsByPage(Number(newPageNumber) - 1, DEFAULT_PAGE_SIZE);
  };

  useEffect(() => {
    loadAccrualsByPage(0, DEFAULT_PAGE_SIZE);
  }, [sortField, sortDirection, contractId]);

  return {
    accruals,
    isLoading,
    pageNumber: pageNumber + 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalItems,
    setPageNumber,
  };
};
