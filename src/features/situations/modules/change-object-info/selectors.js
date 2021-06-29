import { pathOr } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { getConfig } from '@common/config';

import { selectors as attachmentsSelectors } from '../attachments';

const situationChangeObjectInfo = (state) =>
  state[getConfig('modules.situations')].changeObjectInfo;

/**
 * ## [Селектор] Объект с полями обращения
 */
const appeals = (state) => situationChangeObjectInfo(state).appeals;

/**
 * ## [Селектор] Тип обращения по ЖС
 */
const appealType = (state) => situationChangeObjectInfo(state).appealType;

/**
 * ## [Селектор] Договор с неточностью
 */
const appealContract = (state) => situationChangeObjectInfo(state).contract;

/**
 * ## [Селектор] Недостающие данные по договору
 */
const appealMissingData = (state) =>
  situationChangeObjectInfo(state).missingData;

/**
 * ## [Селектор] Id обращения
 */
const appealId = createSelector(appealType, appeals, (appType, apps) =>
  pathOr(null, [appType, 'id'], apps),
);

/**
 * ## [Селектор] Объект с полями обращения
 */
const appeal = createSelector(
  appeals,
  appealType,
  appealContract,
  appealMissingData,
  appealId,
  (apps, appType, contract, missingData, id) => ({
    ...pathOr({}, [appType], apps),
    contract,
    missingData,
    id,
  }),
);

/**
 * ## [Селектор] Что-то где-то загружается
 */
const { isSomethingLoading } = attachmentsSelectors;

export const selectors = {
  appeals,
  appealType,
  appealContract,
  appealMissingData,
  appeal,
  appealId,
  isSomethingLoading,
};
