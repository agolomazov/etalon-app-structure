import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useActions } from '@common/hooks';
import { setServerDateFormat } from '@common/utils';

import { DEFAULT_PAGE_SIZE } from '@src/constants';

import { actions } from '../ducks';
import { selectors } from '../selectors';

/**
 * @typedef {object} LoadRentalsHook
 * @property {number} rentals - список объектов аренды
 * @property {boolean} isLoading - состояние загрузки
 * @property {number} pageNumber - текущий номер страницы
 * @property {number} pageSize - количество элементов на странице
 * @property {number} totalItems - общее количество записей
 * @property {function} setPageNumber - функция для установки нового номера страницы
 */
/**
 * Хук запускает эффект загрузки списка объектов аренды, если поменялись входные параметры
 *
 * @param {object} params - Параметры хука
 * @param {string} params.sortField - Поле, по которому проводится сортировка
 * @param {"ASC"|"DESC"} params.sortDirection - Направление, по которому проводится сортировка
 * @param {string} params.contractId - Id договора
 * @param {string} params.contractNumber - Номер договора
 * @param {string} params.contractDateFrom - Дата договора с
 * @param {string} params.contractDateTo - Дата договора по
 * @param {string} params.address - Адрес
 * @param {string} params.rentalType - Идентификатор типа
 * @param {string} params.cadastralNumber - Кадастровый номер
 *
 * @returns {LoadRentalsHook} результат
 */
export const useLoadRentals = ({
  sortField,
  sortDirection,
  contractId,
  contractNumber,
  contractDateFrom,
  contractDateTo,
  address,
  rentalType,
  cadastralNumber,
}) => {
  const rentals = useSelector(selectors.rentalsList);
  const isLoading = useSelector(selectors.isLoading);
  const { pageNumber, totalItems } = useSelector(selectors.pagination);
  const { loadRentalsFlow } = useActions(actions);

  const loadRentalsByPage = (newPageNumber, pageSize) =>
    loadRentalsFlow({
      filters: {
        contractId: contractId || undefined,
        contractNumber: contractNumber || undefined,
        contractDateFrom: contractDateFrom
          ? setServerDateFormat(contractDateFrom)
          : undefined,
        contractDateTo: contractDateTo
          ? setServerDateFormat(contractDateTo)
          : undefined,
        address: address?.trim() || undefined,
        typeId: rentalType || undefined,
        cadastralNumber: cadastralNumber || undefined,
      },
      sort: {
        field: sortField,
        direction: sortDirection,
      },
      page: { number: newPageNumber, size: pageSize },
    });

  const setPageNumber = (newPageNumber) => {
    loadRentalsByPage(Number(newPageNumber) - 1, DEFAULT_PAGE_SIZE);
  };

  useEffect(() => {
    loadRentalsByPage(0, DEFAULT_PAGE_SIZE);
  }, [
    sortField,
    sortDirection,
    contractId,
    contractNumber,
    contractDateFrom,
    contractDateTo,
    address,
    rentalType,
    cadastralNumber,
  ]);

  return {
    rentals,
    isLoading,
    pageNumber: pageNumber + 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalItems,
    setPageNumber,
  };
};
