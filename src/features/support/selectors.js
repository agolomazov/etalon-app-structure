import { getConfig } from '@common/config';

/**
 * ## [Селектор] Тех. поддержка
 */
const support = (state) => state[getConfig('modules.support')];

/**
 * ## [Селектор] Состояние загрузки
 */
const isLoading = (state) => support(state).isLoading;

export const selectors = {
  isLoading,
};
