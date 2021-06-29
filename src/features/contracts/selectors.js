import { getConfig } from '@common/config';

const contractsSelector = (state) => state[getConfig('modules.contracts')];

/**
 * Селектор списка обращений
 */
const contractsList = (state) => contractsSelector(state).contracts;

/**
 * Селектор состояния загрузки
 */
const isLoading = (state) => contractsSelector(state).isLoading;

/**
 * Селектор query-параметров, с которыми был отправлен последний запрос
 */
const queryParams = (state) => contractsSelector(state).queryParams;

/**
 * Селектор данных о пагинациии
 */
const pagination = (state) => contractsSelector(state).pagination;

export const selectors = {
  contractsList,
  isLoading,
  queryParams,
  pagination,
};
