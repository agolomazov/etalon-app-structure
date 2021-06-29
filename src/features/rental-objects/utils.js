/* eslint-disable id-length */
/* eslint-disable curly */
/* eslint-disable max-lines-per-function */
import { EMPTY_CONTENT } from '@src/constants';

import {
  isDateAfter,
  isDateBefore,
  isDateSameOrAfter,
  isDateSameOrBefore,
  isDateBetween,
  addressFormat,
  setDateFormat,
} from '@common/utils';

import { RENTAL_OBJECTS_SORT_FIELDS } from './constants';

/**
 * ## Метод выводит площадь или количество
 *
 * @example
 * displayAreaOrCount(contracts, sortType);
 *
 * @param {object} area - массив объектов для фильтрации
 * @param {number|string} count - количество
 *
 * @returns {string} форматированный вывод
 */
export const displayAreaOrCount = (area, count) =>
  (area && area.value && `${area.value} ${area.measurementUnit}`) ||
  (count && `${count} шт.`) ||
  EMPTY_CONTENT;

/**
 * ## Метод сортировки объектов недвижимости
 * @example
 * setSortContracts(contracts, sortType);
 *
 * @param {array} rentalObjects - массив объектов для фильтрации
 *
 * @param {string} sortType - тип сортировки
 *
 * @returns {object} отсортированный массив данных
 */
export const setSortRentalObjects = (
  rentalObjects,
  { field, direction } = {},
) => {
  if (field === RENTAL_OBJECTS_SORT_FIELDS.address && direction === 'ASC') {
    return rentalObjects.sort((a, b) => {
      if (addressFormat(a.address) > addressFormat(b.address)) return 1;
      if (addressFormat(a.address) < addressFormat(b.address)) return -1;
      return 0;
    });
  }
  if (field === RENTAL_OBJECTS_SORT_FIELDS.address && direction === 'DESC') {
    return rentalObjects.sort((a, b) => {
      if (addressFormat(a.address) > addressFormat(b.address)) return -1;
      if (addressFormat(a.address) < addressFormat(b.address)) return 1;
      return 0;
    });
  }
  if (field === 'area' && direction === 'ASC') {
    return rentalObjects.sort(
      (a, b) =>
        a.area.value.replace(/\D+/g, '') - b.area.value.replace(/\D+/g, ''),
    );
  }
  if (field === 'area' && direction === 'DESC') {
    return rentalObjects.sort(
      (a, b) =>
        b.area.value.replace(/\D+/g, '') - a.area.value.replace(/\D+/g, ''),
    );
  }
  if (
    field === RENTAL_OBJECTS_SORT_FIELDS.contractNumber &&
    direction === 'ASC'
  ) {
    return rentalObjects.sort(
      (a, b) =>
        a.contract.number.replace(/\D+/g, '') -
        b.contract.number.replace(/\D+/g, ''),
    );
  }
  if (
    field === RENTAL_OBJECTS_SORT_FIELDS.contractNumber &&
    direction === 'DESC'
  ) {
    return rentalObjects.sort(
      (a, b) =>
        b.contract.number.replace(/\D+/g, '') -
        a.contract.number.replace(/\D+/g, ''),
    );
  }
  if (
    field === RENTAL_OBJECTS_SORT_FIELDS.contractDate &&
    direction === 'ASC'
  ) {
    return rentalObjects.sort((a, b) => {
      if (isDateAfter(a.contract.date, b.contract.date)) return 1;
      if (isDateBefore(a.contract.date, b.contract.date)) return -1;
      return 0;
    });
  }
  if (
    field === RENTAL_OBJECTS_SORT_FIELDS.contractDate &&
    direction === 'DESC'
  ) {
    return rentalObjects.sort((a, b) => {
      if (isDateAfter(a.contract.date, b.contract.date)) return -1;
      if (isDateBefore(a.contract.date, b.contract.date)) return 1;
      return 0;
    });
  }
  return rentalObjects;
};

/**
 * ## Метод для фильтрации по адрессу
 * @example
 * filterByAddress(contracts, filterAddress);
 *
 * @param {array} rentalObjects - массив объектов для фильтрации
 *
 * @param {string} filterAddress - значение фильтра
 *
 * @returns {array} возвращает отфильтрованный массив данных
 */
export const filterByAddress = (rentalObjects, filterAddress) => {
  if (filterAddress !== '') {
    return rentalObjects.filter((p) =>
      p.address?.toLowerCase()?.includes(filterAddress.toLowerCase()),
    );
  }
  return rentalObjects;
};

/**
 * ## Метод для фильтрации по кадастровому номеру
 * @example
 * filterByAddress(contracts, filterAddress);
 *
 * @param {array} rentalObjects - массив объектов для фильтрации
 *
 * @param {string} filterCadastralNumber - значение фильтра
 *
 * @returns {array} возвращает отфильтрованный массив данных
 */
export const filterByСadastralNumber = (
  rentalObjects,
  filterCadastralNumber,
) => {
  if (filterCadastralNumber !== '') {
    return rentalObjects.filter((p) =>
      p.cadastralNumber?.includes(filterCadastralNumber),
    );
  }
  return rentalObjects;
};

/**
 * ## Метод для фильтрации по дате договора
 * @example
 * filterByContractDate(rentalObjects, filterContractDate);
 *
 * @param {array} rentalObjects - массив объектов для фильтрации
 *
 * @param {array} filterContractDate - значение фильтра
 *
 * @returns {array} возвращает отфильтрованный массив данных
 */
export const filterByContractDate = (rentalObjects, filterContractDate) => {
  if (filterContractDate[0] === '' && filterContractDate[1] === '')
    return rentalObjects;
  if (filterContractDate[1] === '') {
    return rentalObjects.filter((p) =>
      isDateSameOrAfter(p.contract.date, filterContractDate[0]),
    );
  }
  if (filterContractDate[0] === '') {
    return rentalObjects.filter((p) =>
      isDateSameOrBefore(p.contract.date, filterContractDate[1]),
    );
  }
  return rentalObjects.filter((p) =>
    isDateBetween(
      p.contract.date,
      filterContractDate[0],
      filterContractDate[1],
    ),
  );
};

/**
 * ## Метод для фильтрации по номеру договора
 * @example
 * filterByContractNumber(rentalObjects, filterNumber);
 *
 * @param {array} rentalObjects - массив объектов для фильтрации
 *
 * @param {string} filterContractNumber - значение фильтра
 *
 * @returns {array} возвращает отфильтрованный массив данных
 */
export const filterByContractNumber = (rentalObjects, filterContractNumber) => {
  if (filterContractNumber !== '') {
    return rentalObjects.filter((p) =>
      p.contract?.number?.includes(filterContractNumber),
    );
  }
  return rentalObjects;
};

/**
 * ## Метод для фильтрации по типу договора
 * @example
 * filterByContractType(rentalObjects, filterType);
 *
 * @param {array} rentalObjects - массив объектов для фильтрации
 *
 * @param {string} filterContractType - значение фильтра
 *
 * @returns {array} возвращает отфильтрованный массив данных
 */
export const filterByContractType = (rentalObjects, filterContractType) => {
  if (filterContractType) {
    return rentalObjects.filter((p) => p.typeId === filterContractType);
  }
  return rentalObjects;
};

/**
 * ## Метод для фильтрации списка объектов
 * @example
 * setFilterRentalObjects(renalObjects, isSearchFilled, filter);
 *
 * @param {array} facilityRentals - массив данных для фильтрации
 *
 * @param {boolean} isSearchFilled - включать ли расширенный поиск
 *
 * @param {object} filter - список параметров для фильтрации
 * @param {string} sortType - тип сортировки
 *
 * @returns {array} возвращает отфильтрованный массив данных
 */
export const setFilterRentalObjects = (
  facilityRentals,
  isSearchFilled,
  filter,
  sortType,
) => {
  let tempFacilityRentals = [...facilityRentals];

  tempFacilityRentals = setSortRentalObjects(tempFacilityRentals, sortType);
  tempFacilityRentals = filterByAddress(
    tempFacilityRentals,
    filter.filterAddress,
  );
  tempFacilityRentals = filterByContractNumber(
    tempFacilityRentals,
    filter.filterContractNumber,
  );

  if (isSearchFilled) {
    tempFacilityRentals = filterByContractDate(
      tempFacilityRentals,
      filter.filterContractDate,
    );
    tempFacilityRentals = filterByСadastralNumber(
      tempFacilityRentals,
      filter.filterCadastralNumber,
    );
    tempFacilityRentals = filterByContractType(
      tempFacilityRentals,
      filter.filterContractType,
    );
  }
  return tempFacilityRentals;
};

/**
 * ## Метод для фильтрации и сортировки объектов аренды на стороне клиента
 *
 * @example
 * selectRentals( rentals,
 *                filters:
 *                {
 *                  contractNumber: '20/2'
 *                });
 *
 * @param {array} rentals - список объектов аренды
 * @param {object} params - параметры выборки
 * @param {object} params.filters - фильтры
 * @param {object} params.sort - сортировка
 *
 * @returns {array} возвращает отфильтрованный и отсортированный список объектов аренды
 */
export const selectRentals = (
  rentals,
  {
    filters: {
      contractNumber,
      contractDateFrom,
      contractDateTo,
      address,
      typeId,
      cadastralNumber,
    } = {},
    sort: { field, direction } = {},
  } = {},
) =>
  setFilterRentalObjects(
    rentals,
    true,
    {
      filterAddress: address || '',
      filterContractNumber: contractNumber || '',
      filterContractDate: [
        contractDateFrom ? setDateFormat(contractDateFrom) : '',
        contractDateTo ? setDateFormat(contractDateTo) : '',
      ],
      filterCadastralNumber: cadastralNumber || '',
      filterContractType: typeId,
    },
    { field, direction },
  );
