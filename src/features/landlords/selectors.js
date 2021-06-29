import { getConfig } from '@common/config';

/**
 * ## [Селектор] Список арендодателей
 */
const landlords = (state) => state[getConfig('modules.landlords')];

export const selectors = {
  landlords,
};
