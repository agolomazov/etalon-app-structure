import { TENANT_TYPES, LOGIN_TYPES } from '@support/common/constants';
import { auth } from './auth';
import { ALL_PERMISSIONS } from './permissions';

const cases = [
  {
    withPermissions: ALL_PERMISSIONS.withPermissions,
    loginType: LOGIN_TYPES.NATURAL,
    tenantType: TENANT_TYPES.NATURAL_PERSON,
    text: 'с привилегиями руководителя',
  },
];

describe('авторизация ФЛ', () => {
  auth(cases);
});
