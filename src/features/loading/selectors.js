import { createSelector } from '@reduxjs/toolkit';
import { pathOr } from 'ramda';

import { getConfig } from '@common/config';

const loadingSelector = (state) =>
  pathOr(null, [getConfig('modules.loading')], state);

/**
 * ## [Селектор] - Включен ли лоадер
 */
const isLoading = createSelector(loadingSelector, (loading) =>
  pathOr(false, ['isLoading'], loading),
);

/**
 * ## [Селектор] - Включен ли лоадер в глобальном режиме
 */
const isGlobal = createSelector(loadingSelector, (loading) =>
  pathOr(false, ['isGlobal'], loading),
);

export const selectors = {
  isLoading,
  isGlobal,
};
