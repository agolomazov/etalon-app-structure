import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useActions } from '@common/hooks';

import { DEFAULT_PAGE_SIZE } from '@src/constants';

import { actions } from '../ducks';
import { selectors } from '../selectors';

/**
 * @typedef {object} LoadPaymentHistoryHook
 * @property {number} payments - список платежей
 * @property {boolean} isLoading - состояние загрузки
 * @property {number} pageNumber - текущий номер страницы
 * @property {number} pageSize - количество элементов на странице
 * @property {number} totalItems - общее количество записей
 * @property {function} setPageNumber - функция для установки нового номера страницы
 */
/**
 * Хук запускает эффект загрузки истории платежей, если поменялись входные параметры
 *
 * @param {object} params - Параметры хука
 * @param {string} params.contractId - Id договора
 * @param {string} params.sortField - Поле, по которому проводится сортировка
 * @param {"ASC"|"DESC"} params.sortDirection - Направление, по которому проводится сортировка
 *
 * @returns {LoadPaymentHistoryHook} результат
 */
export const useLoadPaymentHistory = ({
  contractId,
  sortField,
  sortDirection,
}) => {
  const payments = useSelector(selectors.payments);
  const isLoading = useSelector(selectors.isLoading);
  const { pageNumber, totalItems } = useSelector(selectors.pagination);
  const { loadPaymentHistoryFlow } = useActions(actions);

  const loadPaymentsByPage = (newPageNumber, pageSize) =>
    loadPaymentHistoryFlow({
      contractId,
      sort: {
        field: sortField,
        direction: sortDirection,
      },
      page: { number: newPageNumber, size: pageSize },
    });

  const setPageNumber = (newPageNumber) => {
    loadPaymentsByPage(Number(newPageNumber) - 1, DEFAULT_PAGE_SIZE);
  };

  useEffect(() => {
    loadPaymentsByPage(0, DEFAULT_PAGE_SIZE);
  }, [sortField, sortDirection, contractId]);

  return {
    payments,
    isLoading,
    pageNumber: pageNumber + 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalItems,
    setPageNumber,
  };
};
