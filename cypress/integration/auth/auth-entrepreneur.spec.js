import { TENANT_TYPES, LOGIN_TYPES } from '@support/common/constants';
import { auth } from './auth';
import {
  ALL_PERMISSIONS,
  // BASE_PERMISSIONS,
  // SIGN_PERMISSIONS,
  // CONFIRM_PERMISSIONS,
} from './permissions';

const cases = [
  {
    withPermissions: ALL_PERMISSIONS.withPermissions,
    loginType: LOGIN_TYPES.ENTREPRENEUR,
    tenantType: TENANT_TYPES.ENTREPRENEUR,
    text: 'с привилегиями руководителя',
  },

  // Нет возможности тестировать из-за ограничений
  // {
  //   withPermissions: BASE_PERMISSIONS.withPermissions,
  //   withoutPermissions: BASE_PERMISSIONS.withoutPermissions,
  //   loginType: LOGIN_TYPES.ENTREPRENEUR,
  //   tenantType: TENANT_TYPES.ENTREPRENEUR,
  //   text: 'с базовой привилегией',
  // },
  // {
  //   withPermissions: SIGN_PERMISSIONS.withPermissions,
  //   withoutPermissions: SIGN_PERMISSIONS.withoutPermissions,
  //   loginType: LOGIN_TYPES.ENTREPRENEUR,
  //   tenantType: TENANT_TYPES.ENTREPRENEUR,
  //   text: 'с привилегией подписания входящих документов',
  // },
  // {
  //   withPermissions: CONFIRM_PERMISSIONS.withPermissions,
  //   withoutPermissions: CONFIRM_PERMISSIONS.withoutPermissions,
  //   loginType: LOGIN_TYPES.ENTREPRENEUR,
  //   tenantType: TENANT_TYPES.ENTREPRENEUR,
  //   text: 'с привилегией подтверждения получения входящих документов',
  // },
];

describe('авторизация ИП', () => {
  auth(cases);
});
