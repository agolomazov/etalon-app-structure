import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useActions } from '@common/hooks';
import { setServerDateFormat } from '@common/utils';

import { DEFAULT_PAGE_SIZE } from '@src/constants';

import { actions } from '../ducks';
import { selectors } from '../selectors';

/**
 * Хук запускает эффект загрузки списка контрактов, если поменялись входные параметры
 *
 * @param {object} params - Параметры хука
 * @param {string} params.sortField - Поле, по которому проводится сортировка
 * @param {"ASC"|"DESC"} params.sortDirection - Направление, по которому проводится сортировка
 * @param {string} params.contractNumber - Номер договора
 * @param {string} params.contractDateFrom - Дата договора с
 * @param {string} params.contractDateTo - Дата договора по
 * @param {string} params.expirationDateFrom - Дата окончания действия, с
 * @param {string} params.expirationDateTo - Дата окончания действия, по
 * @param {string} params.address - Адрес
 * @param {string} params.rentalType - Идентификатор типа
 *
 * @returns {void}
 */

export const useLoadContracts = ({
  sortField,
  sortDirection,
  contractNumber,
  contractDateFrom,
  contractDateTo,
  expirationDateFrom,
  expirationDateTo,
  address,
  contractType,
  contractStatus,
}) => {
  const contracts = useSelector(selectors.contractsList);
  const isLoading = useSelector(selectors.isLoading);
  const { pageNumber, totalItems } = useSelector(selectors.pagination);
  const { loadContractsFlow } = useActions(actions);

  const loadContractsByPage = (newPageNumber, pageSize) =>
    loadContractsFlow({
      filters: {
        contractNumber: contractNumber || undefined,
        contractDateFrom: contractDateFrom
          ? setServerDateFormat(contractDateFrom)
          : undefined,
        contractDateTo: contractDateTo
          ? setServerDateFormat(contractDateTo)
          : undefined,
        expirationDateFrom: expirationDateFrom
          ? setServerDateFormat(expirationDateFrom)
          : undefined,
        expirationDateTo: expirationDateTo
          ? setServerDateFormat(expirationDateTo)
          : undefined,
        address: address.trim() || undefined,
        typeId: contractType || undefined,
        statusId: contractStatus || undefined,
      },
      sort: {
        field: sortField,
        direction: sortDirection,
      },
      page: { number: newPageNumber, size: pageSize },
    });

  const setPageNumber = (newPageNumber) => {
    loadContractsByPage(Number(newPageNumber) - 1, DEFAULT_PAGE_SIZE);
  };

  useEffect(() => {
    loadContractsByPage(0, DEFAULT_PAGE_SIZE);
  }, [
    sortField,
    sortDirection,
    contractNumber,
    contractDateFrom,
    contractDateTo,
    address,
    contractType,
    contractStatus,
    expirationDateFrom,
    expirationDateTo,
  ]);

  return {
    contracts,
    isLoading,
    pageNumber: pageNumber + 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalItems,
    setPageNumber,
  };
};
