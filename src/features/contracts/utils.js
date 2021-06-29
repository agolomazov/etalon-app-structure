import {
  isDateAfter,
  isDateBefore,
  isDateSameOrAfter,
  isDateSameOrBefore,
  isDateBetween,
  isDateRangeBetween,
  addressFormat,
  setDateFormat,
} from '@common/utils';

import { CONTRACTS_SORT_FIELDS } from './constants';

/**
 * ## Метод для получения значения поля "Общая сумма" в элементе списка договоров
 *
 * @example
 * getTotalPayment(debtAmount, penaltyAmount, currentPeriodAmountForPayment);
 *
 * @param {string} debtAmount - сумма задолженности
 * @param {string} penaltyAmount - сумма пени
 * @param {string} currentPeriodAmountForPayment - сумма начислений в текущем периоде
 *
 * @returns {number} результат рассчета общей суммы
 */
export const getTotalPayment = (
  debtAmount,
  penaltyAmount,
  currentPeriodAmountForPayment,
) =>
  Number(debtAmount) +
  Number(penaltyAmount) +
  Number(currentPeriodAmountForPayment);

/**
 * ## Метод сортировки договоров
 * @example
 * setSortContracts(contracts, sortType);
 *
 * @param {array} contracts - массив объектов для фильтрации
 *
 * @param {string} sortType - тип сортировки
 *
 * @returns {object} отсортированный массив данных
 */
// eslint-disable-next-line max-lines-per-function
export const setSortContracts = (contracts, { field, direction } = {}) => {
  if (field === CONTRACTS_SORT_FIELDS.address && direction === 'ASC') {
    return contracts.sort((ela, elb) => {
      if (
        addressFormat(ela.facilityRentalAddress[0]) >
        addressFormat(elb.facilityRentalAddress[0])
      ) {
        return 1;
      }
      if (
        addressFormat(ela.facilityRentalAddress[0]) <
        addressFormat(elb.facilityRentalAddress[0])
      ) {
        return -1;
      }
      return 0;
    });
  }
  if (field === CONTRACTS_SORT_FIELDS.address && direction === 'DESC') {
    return contracts.sort((ela, elb) => {
      if (
        addressFormat(ela.facilityRentalAddress[0]) >
        addressFormat(elb.facilityRentalAddress[0])
      ) {
        return -1;
      }
      if (
        addressFormat(ela.facilityRentalAddress[0]) <
        addressFormat(elb.facilityRentalAddress[0])
      ) {
        return 1;
      }
      return 0;
    });
  }
  if (field === CONTRACTS_SORT_FIELDS.contractDate && direction === 'ASC') {
    return contracts.sort((ela, elb) => {
      if (isDateAfter(ela.date, elb.date)) {
        return 1;
      }
      if (isDateBefore(ela.date, elb.date)) {
        return -1;
      }
      return 0;
    });
  }
  if (field === CONTRACTS_SORT_FIELDS.contractDate && direction === 'DESC') {
    return contracts.sort((ela, elb) => {
      if (isDateAfter(ela.date, elb.date)) {
        return -1;
      }
      if (isDateBefore(ela.date, elb.date)) {
        return 1;
      }
      return 0;
    });
  }
  if (field === CONTRACTS_SORT_FIELDS.totalSum && direction === 'DESC') {
    return contracts.sort((ela, elb) => {
      if (
        getTotalPayment(
          ela.debtAmount,
          ela.penaltyAmount,
          ela.currentPeriodAmountForPayment,
        ) <
        getTotalPayment(
          elb.debtAmount,
          elb.penaltyAmount,
          elb.currentPeriodAmountForPayment,
        )
      ) {
        return 1;
      }
      if (
        getTotalPayment(
          ela.debtAmount,
          ela.penaltyAmount,
          ela.currentPeriodAmountForPayment,
        ) >
        getTotalPayment(
          elb.debtAmount,
          elb.penaltyAmount,
          elb.currentPeriodAmountForPayment,
        )
      ) {
        return -1;
      }
      return 0;
    });
  }
  if (field === CONTRACTS_SORT_FIELDS.totalSum && direction === 'ASC') {
    return contracts.sort((ela, elb) => {
      if (
        getTotalPayment(
          ela.debtAmount,
          ela.penaltyAmount,
          ela.currentPeriodAmountForPayment,
        ) >
        getTotalPayment(
          elb.debtAmount,
          elb.penaltyAmount,
          elb.currentPeriodAmountForPayment,
        )
      ) {
        return 1;
      }
      if (
        getTotalPayment(
          ela.debtAmount,
          ela.penaltyAmount,
          ela.currentPeriodAmountForPayment,
        ) <
        getTotalPayment(
          elb.debtAmount,
          elb.penaltyAmount,
          elb.currentPeriodAmountForPayment,
        )
      ) {
        return -1;
      }
      return 0;
    });
  }
  return contracts;
};

/**
 * ## Метод для фильтрации по номеру договора
 * @example
 * filterByContractNumber(contracts, filterNumber);
 *
 * @param {array} contracts - массив объектов для фильтрации
 *
 * @param {string} filterNumber - значение фильтра
 *
 * @returns {array} возвращает отфильтрованный массив данных
 */
const filterByContractNumber = (contracts, filterNumber) => {
  if (filterNumber !== '') {
    return contracts.filter((el) => el.number.includes(filterNumber));
  }
  return contracts;
};

/**
 * ## Метод для фильтрации по адрессу
 * @example
 * filterByAddress(contracts, filterAddress);
 *
 * @param {array} contracts - массив объектов для фильтрации
 *
 * @param {string} filterAddress - значение фильтра
 *
 * @returns {array} возвращает отфильтрованный массив данных
 */
export const filterByAddress = (contracts, filterAddress) => {
  if (filterAddress !== '') {
    return contracts.filter((el) =>
      el.facilityRentalAddress
        .join(' ')
        .toLowerCase()
        .includes(filterAddress.toLowerCase()),
    );
  }
  return contracts;
};

/**
 * ## Метод для фильтрации по дате договора
 * @example
 * filterByContractDate(contracts, filterContractDate);
 *
 * @param {array} contracts - массив объектов для фильтрации
 *
 * @param {array} filterContractDate - значение фильтра
 *
 * @returns {array} возвращает отфильтрованный массив данных
 */
export const filterByContractDate = (contracts, filterContractDate) => {
  if (filterContractDate[0] === '' && filterContractDate[1] === '') {
    return contracts;
  }
  if (filterContractDate[1] === '') {
    return contracts.filter((el) =>
      isDateSameOrAfter(el.date, filterContractDate[0]),
    );
  }
  if (filterContractDate[0] === '') {
    return contracts.filter((el) =>
      isDateSameOrBefore(el.date, filterContractDate[1]),
    );
  }
  return contracts.filter((el) =>
    isDateBetween(el.date, filterContractDate[0], filterContractDate[1]),
  );
};

/**
 * ## Метод для фильтрации по датам действия договора
 * @example
 * filterByContractActiveDate(contracts, filterActiveDate);
 *
 * @param {array} contracts - массив объектов для фильтрации
 *
 * @param {array} filterActiveDate - значение фильтра
 *
 * @returns {array} возвращает отфильтрованный массив данных
 */
export const filterByContractActiveDate = (contracts, filterActiveDate) => {
  if (filterActiveDate[0] === '' && filterActiveDate[1] === '') {
    return contracts;
  }
  if (filterActiveDate[1] === '') {
    return contracts.filter((el) =>
      isDateSameOrAfter(el.startDate, filterActiveDate[0]),
    );
  }
  if (filterActiveDate[0] === '') {
    return contracts.filter((el) =>
      isDateSameOrBefore(el.expirationDate, filterActiveDate[1]),
    );
  }
  return contracts.filter((el) =>
    isDateRangeBetween(
      el.startDate,
      el.expirationDate,
      filterActiveDate[0],
      filterActiveDate[1],
    ),
  );
};

/**
 * ## Метод для фильтрации по статусу договора
 * @example
 * filterByContractStatus(contracts, filterStatus);
 *
 * @param {array} contracts - массив объектов для фильтрации
 *
 * @param {string} filterStatus - значение фильтра
 *
 * @returns {array} возвращает отфильтрованный массив данных
 */
export const filterByContractStatus = (contracts, filterStatus) => {
  if (filterStatus) {
    return contracts.filter((el) => el.statusId === filterStatus);
  }
  return contracts;
};

/**
 * ## Метод для фильтрации по типу договора
 * @example
 * filterByContractType(contracts, filterType);
 *
 * @param {array} contracts - массив объектов для фильтрации
 *
 * @param {string} filterType - значение фильтра
 *
 * @returns {array} возвращает отфильтрованный массив данных
 */
export const filterByContractType = (contracts, filterType) => {
  if (filterType) {
    return contracts.filter((el) => el.typeId === filterType);
  }
  return contracts;
};

/**
 * ## Метод для фильтрации списка договоров
 * @example
 * setFilterContract(contracts, isSearchFilled, filter);
 *
 * @param {array} contracts - массив данных для фильтрации
 *
 * @param {boolean} isSearchFilled - включать ли расширенный поиск
 *
 * @param {object} filter - список параметров для фильтрации
 * @param  {string} filter.filterNumber - фильтр по номеру договора
 * @param  {array} filter.filterContractDate фильтр по дате договора
 * @param  {string} filter.filterAddress фильтр по адресу
 * @param  {array} filter.filterActiveDate филтр по даде действия договора
 * @param  {string} filter.filterStatus фильтр по статусу договора
 * @param  {string} filter.filterType фильтр по типу договра
 *
 * @param {string} sortType - тип сортировки
 *
 * @returns {array} возвращает отфильтрованный массив данных
 */
export const setFilterContract = (
  contracts,
  isSearchFilled,
  filter,
  sortType,
) => {
  let tempContracts = [...contracts];

  tempContracts = setSortContracts(tempContracts, sortType);
  tempContracts = filterByContractNumber(tempContracts, filter.filterNumber);
  tempContracts = filterByAddress(tempContracts, filter.filterAddress);

  if (isSearchFilled) {
    tempContracts = filterByContractDate(
      tempContracts,
      filter.filterContractDate,
    );
    tempContracts = filterByContractActiveDate(
      tempContracts,
      filter.filterActiveDate,
    );
    tempContracts = filterByContractStatus(tempContracts, filter.filterStatus);
    tempContracts = filterByContractType(tempContracts, filter.filterType);
  }
  return tempContracts;
};

/**
 * ## Метод для фильтрации и сортировки договоров стороне клиента
 *
 * @example
 * selectContracts( contracts,
 *                filters:
 *                {
 *                  contractNumber: '20/2'
 *                });
 *
 * @param {array} contracts - список договоров
 * @param {object} params - параметры выборки
 * @param {object} params.filters - фильтры
 * @param {object} params.sort - сортировка
 *
 * @returns {array} возвращает отфильтрованный и отсортированный список договоров
 */
export const selectContracts = (
  contracts,
  {
    filters: {
      contractNumber,
      contractDateFrom,
      contractDateTo,
      expirationDateFrom,
      expirationDateTo,
      address,
      typeId,
      statusId,
    } = {},
    sort: { field, direction } = {},
  } = {},
) =>
  setFilterContract(
    contracts,
    true,
    {
      filterAddress: address || '',
      filterNumber: contractNumber || '',
      filterContractDate: [
        contractDateFrom ? setDateFormat(contractDateFrom) : '',
        contractDateTo ? setDateFormat(contractDateTo) : '',
      ],
      filterActiveDate: [
        expirationDateFrom ? setDateFormat(expirationDateFrom) : '',
        expirationDateTo ? setDateFormat(expirationDateTo) : '',
      ],
      filterStatus: statusId || '',
      filterType: typeId,
    },
    { field, direction },
  );
