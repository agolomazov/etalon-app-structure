/**
 * ## Статус проверки пользователя
 * @const
 * @type {object}
 */
export const USER_CHECK_STATUS = {
  /** Проверка не осуществлялась */
  NONE: 'none',
  /** Проверка находится в процессе выполнения */
  PENDING: 'pending',
  /** Проверка выполнена */
  DONE: 'done',
};

/**
 * ## Список permissions
 * @const
 */
export const PERMISSIONS = {
  edo: {
    // работа с согласием на ЭДО
    edoConsent: 'Arlk.edo.edoConsent',
  },
  incomingDocument: {
    // подтверждение получения входящих документов
    confirmReceipt: 'Arlk.incomingDocument.confirmReceipt',
    // подписание/отклонение входящих документов
    sign: 'Arlk.incomingDocument.sign',
  },
};
