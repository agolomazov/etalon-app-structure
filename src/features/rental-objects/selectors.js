import { getConfig } from '@common/config';

const rentalsSelector = (state) => state[getConfig('modules.rentals')];

/**
 * [Селектор] Список объектов аренды
 */
const rentalsList = (state) => rentalsSelector(state).rentals;

/**
 * [Селектор] Параметры пагинации
 */
const pagination = (state) => rentalsSelector(state).pagination;

/**
 * [Селектор] Query-параметры, с которыми был отправлен последний запрос
 */
const queryParams = (state) => rentalsSelector(state).queryParams;

/**
 * [Селектор] Состояние загрузки
 */
const isLoading = (state) => rentalsSelector(state).isLoading;

export const selectors = {
  rentalsList,
  pagination,
  queryParams,
  isLoading,
};
