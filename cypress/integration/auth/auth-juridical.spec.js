import { TENANT_TYPES, LOGIN_TYPES } from '@support/common/constants';
import { auth } from './auth';
import {
  BASE_PERMISSIONS,
  ALL_PERMISSIONS,
  CONFIRM_PERMISSIONS,
  SIGN_PERMISSIONS,
} from './permissions';

const cases = [
  {
    withPermissions: BASE_PERMISSIONS.withPermissions,
    withoutPermissions: BASE_PERMISSIONS.withoutPermissions,
    loginType: LOGIN_TYPES.JURIDICAL,
    tenantType: TENANT_TYPES.JURIDICAL_PERSON,
    text: 'с базовой привилегией',
  },
  {
    withPermissions: SIGN_PERMISSIONS.withPermissions,
    withoutPermissions: SIGN_PERMISSIONS.withoutPermissions,
    loginType: LOGIN_TYPES.JURIDICAL,
    tenantType: TENANT_TYPES.JURIDICAL_PERSON,
    text: 'с привилегией подписания входящих документов',
  },
  {
    withPermissions: CONFIRM_PERMISSIONS.withPermissions,
    withoutPermissions: CONFIRM_PERMISSIONS.withoutPermissions,
    loginType: LOGIN_TYPES.JURIDICAL,
    tenantType: TENANT_TYPES.JURIDICAL_PERSON,
    text: 'с привилегией подтверждения получения входящих документов',
  },
  {
    withPermissions: ALL_PERMISSIONS.withPermissions,
    loginType: LOGIN_TYPES.JURIDICAL,
    tenantType: TENANT_TYPES.JURIDICAL_PERSON,
    text: 'с привилегиями руководителя',
  },
];

describe('авторизация ЮЛ', () => {
  auth(cases);
});
