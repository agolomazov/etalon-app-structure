import { pathOr } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { getConfig } from '@common/config';

import { selectors as attachmentsSelectors } from '../attachments';

const situationChangeDetailsJuridical = (state) =>
  state[getConfig('modules.situations')].detailsJuridical;

/**
 * ## [Селектор] Тип обращения по ЖС
 */
const appealType = (state) => situationChangeDetailsJuridical(state).appealType;

/**
 * ## [Селектор] Объект с обращениями
 */
const appeals = (state) => situationChangeDetailsJuridical(state).appeals;

/**
 * ## [Селектор] Объект с полями обращения
 */
const appeal = createSelector(appeals, appealType, (apps, appType) =>
  pathOr({}, [appType], apps),
);

/**
 * ## [Селектор] Что-то где-то загружается
 */
const { isSomethingLoading } = attachmentsSelectors;

export const selectors = {
  appealType,
  appeal,
  isSomethingLoading,
};
