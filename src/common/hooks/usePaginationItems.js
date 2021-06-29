import { useMemo } from 'react';

import { DEFAULT_PAGE_SIZE } from '@src/constants';

import { usePagination } from './usePagination';

/**
 * @typedef {object} PaginationItemsHook
 * @property {Array} items - элементы текущей страницы
 * @property {number} pageNumber - номер текущей страницы ( начинается с 1 )
 * @property {number} pageSize - количество элементов на странице
 * @property {number} totalItems - общее количество элементов по всем страницам
 * @property {function} setPageNumber - функция для установки нового номера страницы ( начинается с 1 )
 */
/**
 * Хук для пагинации списка
 *
 * @param {object} params - параметры
 * @param {Array} params.items - список элементов
 *
 * @returns {PaginationItemsHook} результат
 */
export const usePaginationItems = ({ items = [] }) => {
  const {
    pageNumber,
    pageSize,
    totalItems,
    setPageNumber,
    startIndex,
    endIndex,
  } = usePagination({
    totalItems: items.length,
    initialPageSize: DEFAULT_PAGE_SIZE,
  });

  const itemsSlice = useMemo(() => items.slice(startIndex, endIndex + 1), [
    items,
    startIndex,
    endIndex,
  ]);

  return {
    items: itemsSlice,
    pageNumber: pageNumber + 1,
    pageSize,
    totalItems,
    setPageNumber: (newPageNumber) => setPageNumber(newPageNumber - 1),
  };
};
