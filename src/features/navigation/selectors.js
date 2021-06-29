import { createSelector } from '@reduxjs/toolkit';
import { pathOr } from 'ramda';

import { getConfig } from '@common/config';

const navigationSelector = (state) =>
  pathOr(null, [getConfig('modules.router')], state);

/**
 * Получение URL страницы
 */
const pathName = createSelector(navigationSelector, (navigation) =>
  pathOr('/', ['location', 'pathname'], navigation),
);

/**
 * Получение якорной ссылки
 */
const hash = createSelector(navigationSelector, (navigation) =>
  pathOr('', ['location', 'hash'], navigation),
);

/**
 * Получение query-params в виде объекта
 */
const queryParams = createSelector(navigationSelector, (navigation) =>
  pathOr({}, ['location', 'query'], navigation),
);

/**
 * Получение query-params в виде строки
 */
const searchString = createSelector(navigationSelector, (navigation) =>
  pathOr('', ['location', 'search'], navigation),
);

export const selectors = {
  pathName,
  hash,
  queryParams,
  searchString,
};
