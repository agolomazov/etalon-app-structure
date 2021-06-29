import { pathOr } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { getConfig } from '@common/config';

import { selectors as attachmentsSelectors } from '../attachments';

const situationComplaint = (state) =>
  state[getConfig('modules.situations')].complaint;

/**
 * ## [Селектор] Тип обращения по ЖС
 */
const appealType = (state) => situationComplaint(state).appealType;

/**
 * ## [Селектор] Объект с обращениями
 */
const appeals = (state) => situationComplaint(state).appeals;

/**
 * ## [Селектор] Id обращения
 */
const appealId = createSelector(appealType, appeals, (appType, apps) =>
  pathOr(null, [appType, 'id'], apps),
);

/**
 * ## [Селектор] Объект с полями обращения
 */
const appealFields = (state) => situationComplaint(state).fields;

/**
 * ## [Селектор] Обращение по ЖС
 */
const appeal = createSelector(appealId, appealFields, (id, fields) => ({
  id,
  ...fields,
}));

/**
 * ## [Селектор] Что-то где-то загружается
 */
const { isSomethingLoading } = attachmentsSelectors;

export const selectors = {
  appealType,
  appealId,
  appeal,
  isSomethingLoading,
};
