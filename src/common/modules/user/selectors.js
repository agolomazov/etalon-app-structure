import { createSelector } from '@reduxjs/toolkit';

import { getConfig } from '@common/config';
import { TENANT_TYPES } from '@src/constants';
import { getUserFullName } from '@common/utils';

import { USER_CHECK_STATUS, PERMISSIONS } from './constants';

const userSelector = (state) => state[getConfig('modules.user')];

/**
 * [Селектор] Данные пользователя
 */
const userData = (state) => userSelector(state).userData;

/**
 * [Селектор] Проверка пользователя не выполнялась
 */
const isUserCheckStatusNone = (state) =>
  userSelector(state).userCheckStatus === USER_CHECK_STATUS.NONE;

/**
 * [Селектор] Проверка пользователя находится в процессе выполнения
 */
const isUserCheckStatusPending = (state) =>
  userSelector(state).userCheckStatus === USER_CHECK_STATUS.PENDING;

/**
 * [Селектор] Список организаций
 */
const organizations = (state) => userData(state)?.organizations || [];

/**
 * [Селектор] Идентификатор ЕСИА активной организации
 */
const activeCompanyEsiaOid = (state) => userData(state)?.activeCompanyEsiaOid;

/**
 * [Селектор] информация о выбраной организации
 */
const activeCompany = createSelector(
  activeCompanyEsiaOid,
  organizations,
  (activeEsiaOid, orgs) =>
    orgs.find(({ esiaOid }) => esiaOid === activeEsiaOid) || {},
);

/**
 * [Селектор] Короткое наименование активной компании
 */
const activeCompanyShortName = createSelector(
  activeCompany,
  (company) => company?.shortName ?? '',
);

/**
 * [Селектор] Профиль Арендатора
 */
const tenantInfo = (state) => userData(state)?.tenantInfo;

/**
 * [Селектор] Признак согласия на ЭДО
 */
const isUserConsentToEdm = (state) => tenantInfo(state)?.edoConsent ?? true;

/**
 * [Селектор] Тип арендатора
 */
const tenantType = (state) => tenantInfo(state)?.type;

/**
 * [Селектор] Тип арендатора ЮЛ
 */
const isTenantTypeJuridical = (state) =>
  tenantType(state) === TENANT_TYPES.JURIDICAL_PERSON;

/**
 * [Селектор] Тип арендатора ИП
 */
const isTenantTypeEntrepreneur = (state) =>
  tenantType(state) === TENANT_TYPES.ENTREPRENEUR;

/**
 * [Селектор] Тип арендатора ФЛ
 */
const isTenantTypeNatural = (state) =>
  tenantType(state) === TENANT_TYPES.NATURAL_PERSON;

/**
 * [Селектор] Информация о ЮЛ
 */
const tenantJuridicalInfo = (state) => tenantInfo(state)?.juridicalPerson || {};

/**
 * [Селектор] Информация о ИП
 */
const tenantEntrepreneurInfo = (state) => tenantInfo(state)?.entrepreneur || {};

/**
 * [Селектор] Информация о ФЛ
 */
const tenantNaturalInfo = (state) => tenantInfo(state)?.naturalPerson || {};

const userNameSelector = (state) => userData(state)?.name;

/**
 * [Селектор] ФИО пользователя
 */
const userFullName = createSelector(userNameSelector, (name) =>
  name ? getUserFullName(name, true) : '',
);

/**
 * [Селектор] Permissions пользователя
 */
const userPermissions = (state) => userData(state)?.permissions ?? [];

/**
 * Функция создает селектор, который проверяет наличие permission у пользователя
 */
const hasPermission = (permission) =>
  createSelector(userPermissions, (permissions) =>
    permissions.includes(permission),
  );

/**
 * [Селектор] Проверяет наличие permission edo.EdoConsent у пользователя
 */
const canEdoEdoConsent = hasPermission(PERMISSIONS.edo.edoConsent);

/**
 * [Селектор] Проверяет наличие permission IncomingDocument.ConfirmReceipt у пользователя
 */
const canIncomingDocumentConfirmReceipt = hasPermission(
  PERMISSIONS.incomingDocument.confirmReceipt,
);

/**
 * [Селектор] Проверяет наличие permission IncomingDocument.sign у пользователя
 */
const canIncomingDocumentSign = hasPermission(
  PERMISSIONS.incomingDocument.sign,
);

export const selectors = {
  userData,
  isUserCheckStatusNone,
  isUserCheckStatusPending,
  organizations,
  activeCompanyEsiaOid,
  activeCompany,
  activeCompanyShortName,
  isUserConsentToEdm,
  tenantInfo,
  tenantType,
  isTenantTypeJuridical,
  isTenantTypeEntrepreneur,
  isTenantTypeNatural,
  tenantJuridicalInfo,
  tenantEntrepreneurInfo,
  tenantNaturalInfo,
  userFullName,
  userPermissions,
  canEdoEdoConsent,
  canIncomingDocumentConfirmReceipt,
  canIncomingDocumentSign,
};
