import { pathOr } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { getConfig } from '@common/config';

import { selectors as attachmentsSelectors } from '../attachments';

const situationReconciliationAct = (state) =>
  state[getConfig('modules.situations')].reconciliationAct;

/**
 * ## [Селектор] Тип обращения по ЖС
 */
const appealType = (state) => situationReconciliationAct(state).appealType;

/**
 * ## [Селектор] Выбран ли тип обращения по ЖС
 */
const isSelectedAppealType = (state) => appealType(state) !== null;

/**
 * ## [Селектор] Объект со списками всех обращений
 */
const appealsAll = (state) => situationReconciliationAct(state).appeals;

/**
 * ## [Селектор] Текущий список обращений
 */
const appealsCurrent = createSelector(appealsAll, appealType, (appeals, type) =>
  pathOr([], [type], appeals),
);

/**
 * ## [Селектор] Индикация загрузки при добавлении обращения
 */
const isCreateAppealLoading = (state) =>
  situationReconciliationAct(state).isCreateAppealLoading;

/**
 * ## [Селектор] Что-то где-то загружается
 */
const isSomethingLoading = createSelector(
  isCreateAppealLoading,
  appealsCurrent,
  attachmentsSelectors.isSomethingLoading,
  (isCreateAppLoading, appeals, attachmentsLoading) =>
    isCreateAppLoading ||
    appeals.some(({ isLoading }) => isLoading) ||
    attachmentsLoading,
);

export const selectors = {
  appealType,
  isSelectedAppealType,
  appealsCurrent,
  isCreateAppealLoading,
  isSomethingLoading,
};
