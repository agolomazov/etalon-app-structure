import { createSelector } from '@reduxjs/toolkit';
import { isEmpty } from 'ramda';

import { getConfig } from '@common/config';

const emptyDictionary = [];

/**
 * ## [Селектор] Все справочники
 */
const dictionaries = (state) => state[getConfig('modules.dictionaries')];

/**
 * ## [Селектор] Признак того, что справочники пустые
 */
const isDictionariesEmpty = createSelector(dictionaries, (dicts) =>
  isEmpty(dicts || {}),
);

/**
 * ## [Селектор] Справочник "Тип договора"
 */
const contractTypes = (state) =>
  dictionaries(state).contractTypes || emptyDictionary;

/**
 * ## [Селектор] Справочник "Статус договора"
 */
const contractStatuses = (state) =>
  dictionaries(state).contractStatuses || emptyDictionary;

/**
 * ## [Селектор] Справочник "Тип Арендатора"
 */
const tenantTypes = (state) =>
  dictionaries(state).tenantTypes || emptyDictionary;

/**
 * ## [Селектор] Справочник "Тип объекта аренды"
 */
const facilityRentalTypes = (state) =>
  dictionaries(state).facilityRentalTypes || emptyDictionary;

/**
 * ## [Селектор] Справочник "Тип начисления"
 */
const accrualTypes = (state) =>
  dictionaries(state).accrualTypes || emptyDictionary;

/**
 * ## [Селектор] Справочник "Период начисления арендной платы"
 */
const accrualPeriods = (state) =>
  dictionaries(state).accrualPeriods || emptyDictionary;

export const selectors = {
  isDictionariesEmpty,
  contractTypes,
  contractStatuses,
  tenantTypes,
  facilityRentalTypes,
  accrualTypes,
  accrualPeriods,
};
