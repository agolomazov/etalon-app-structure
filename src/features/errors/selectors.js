import { createSelector } from '@reduxjs/toolkit';
import { pathOr, not, isNil } from 'ramda';

import { getConfig } from '@common/config';

const errorsSelector = (state) =>
  pathOr(null, [getConfig('modules.errors')], state);

/**
 * ## [Селектор] Есть ли глобальная ошибка
 */
const isErrorExist = createSelector(errorsSelector, (errors) =>
  not(isNil(errors)),
);

/**
 * ## [Селектор] Получить признак того, что ошибка является фатальной
 */
const isErrorFatal = createSelector(errorsSelector, (error) =>
  pathOr(false, ['isFatal'], error),
);

/**
 * ## [Селектор] Получить заголовок ошибки
 */
const errorTitle = createSelector(errorsSelector, (error) =>
  pathOr('', ['title'], error),
);

/**
 * ## [Селектор] Получить заголовок ошибки
 */
const errorMessage = createSelector(errorsSelector, (error) =>
  pathOr('', ['message'], error),
);

/**
 * ## [Селектор] Получить код ошибки
 */
const errorCode = createSelector(errorsSelector, (error) =>
  pathOr('', ['code'], error),
);

export const selectors = {
  isErrorExist,
  isErrorFatal,
  errorTitle,
  errorMessage,
  errorCode,
};
