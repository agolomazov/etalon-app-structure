import { useState, useMemo, useCallback } from 'react';

const getStartIndex = (pageSize, currentPage) => pageSize * currentPage;

const getEndIndex = (pageSize, currentPage, totalItems) => {
  const lastPageEndIndex = pageSize * (currentPage + 1);

  if (lastPageEndIndex > totalItems) {
    return totalItems - 1;
  }

  return lastPageEndIndex - 1;
};

/**
 * @typedef {object} PaginationHook
 * @property {function} setPageNumber - функция для установки нового номера страницы
 * @property {function} setPageSize - функция для установки нового размера страницы
 * @property {number} pageNumber - номер текущей страницы ( начинается с 0 )
 * @property {number} pageSize - количество элементов на странице
 * @property {number} totalItems - общее количество элементов по всем страницам
 * @property {number} startIndex - начальный индекс элементов в странице
 * @property {number} endIndex - конечный индекс элементов в странице
 */
/**
 * Хук для работы с пагинацией
 *
 * @param {object} params - параметры
 * @param {number} params.totalItems - общее количество элементов по всем страницам
 * @param {number} params.initialPageNumber - начальный номер страницы ( начинается с 0 )
 * @param {number} params.initialPageSize - начальный размер страницы
 *
 * @returns {PaginationHook} результат
 */
export const usePagination = ({
  totalItems = 0,
  initialPageNumber = 0,
  initialPageSize = 0,
}) => {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [pageNumber, setPageNumber] = useState(initialPageNumber);

  const paginationState = useMemo(
    () => ({
      startIndex: getStartIndex(pageSize, pageNumber),
      endIndex: getEndIndex(pageSize, pageNumber, totalItems),
    }),
    [totalItems, pageSize, pageNumber],
  );

  return {
    setPageNumber,
    setPageSize: useCallback((newPageSize, nextPage = 0) => {
      setPageSize(newPageSize);
      setPageNumber(nextPage);
    }, []),
    pageNumber,
    pageSize,
    totalItems,
    ...paginationState,
  };
};
