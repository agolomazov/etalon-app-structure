import { PERMISSIONS } from '@support/common/constants';

/**
 * ## Группа базовых привилегий
 * @const
 */
export const BASE_PERMISSIONS = {
  withPermissions: [PERMISSIONS.GENERIC.READ, PERMISSIONS.GENERIC.WRITE],
  withoutPermissions: [
    PERMISSIONS.EDO.EDO_CONSENT,
    PERMISSIONS.INCOMING_DOCUMENT.CONFIRM_RECEIPT,
    PERMISSIONS.INCOMING_DOCUMENT.SIGN,
  ],
};

/**
 * ## Группа с привилегий подписания документов
 * @const
 */
export const SIGN_PERMISSIONS = {
  withPermissions: [PERMISSIONS.INCOMING_DOCUMENT.SIGN],
  withoutPermissions: [PERMISSIONS.EDO.EDO_CONSENT],
};

/**
 * ## Группа с привилегий подтверждения получения документов
 * @const
 */
export const CONFIRM_PERMISSIONS = {
  withPermissions: [PERMISSIONS.INCOMING_DOCUMENT.CONFIRM_RECEIPT],
  withoutPermissions: [
    PERMISSIONS.EDO.EDO_CONSENT,
    PERMISSIONS.INCOMING_DOCUMENT.SIGN,
  ],
};

/**
 * ## Группа привилегий руководителя
 * @const
 */
export const ALL_PERMISSIONS = {
  withPermissions: [
    PERMISSIONS.GENERIC.READ,
    PERMISSIONS.GENERIC.WRITE,
    PERMISSIONS.EDO.EDO_CONSENT,
    PERMISSIONS.INCOMING_DOCUMENT.CONFIRM_RECEIPT,
    PERMISSIONS.INCOMING_DOCUMENT.SIGN,
  ],
};
