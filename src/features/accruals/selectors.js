import { getConfig } from '@common/config';

const accrualsList = (state) => state[getConfig('modules.accruals')];

/**
 * [Селектор] Список начислений
 */
const accruals = (state) => accrualsList(state).accruals;

/**
 * [Селектор] Параметры пагинации
 */
const pagination = (state) => accrualsList(state).pagination;

/**
 * [Селектор] Query-параметры, с которыми был отправлен последний запрос
 */
const queryParams = (state) => accrualsList(state).queryParams;

/**
 * [Селектор] Состояние загрузки
 */
const isLoading = (state) => accrualsList(state).isLoading;

export const selectors = {
  accruals,
  pagination,
  queryParams,
  isLoading,
};
