/**
 * Информация по каждому обращению
 * @const
 */
export const APPEAL_DETAILS = {
  /** Получить акт сверки */
  REQUEST_ACT: {
    type: 'REQUEST_ACT',
    title: (contractNumber, contractDate) =>
      `Получить акт сверки по договору № ${contractNumber} от ${contractDate}`,
  },
  /** Направить скан копию подписанного акта сверки */
  SCANNED_ACT: {
    type: 'SCANNED_ACT',
    title: (contractNumber, contractDate) =>
      `Направить скан копию подписанного акта сверки по договору № ${contractNumber} от ${contractDate}`,
  },
  /** В ЛК отсутствует информация о моем договоре аренды */
  MISSING_CONTRACT_IN_LK: {
    type: 'MISSING_CONTRACT_IN_LK',
    title: (contractNumber, contractDate) =>
      `Отсутствует информация о договоре аренды № ${contractNumber} от ${contractDate}`,
  },
  /** Сообщить об отсутствии данных по арендованным объектам */
  MISSING_DATA_IN_FACILITY: {
    type: 'MISSING_DATA_IN_FACILITY',
    title: (contractNumber, contractDate) =>
      `Сообщить об отсутствии данных по арендованным объектам по договору № ${contractNumber} от ${contractDate}`,
  },
  /** Внести изменения в характеристики арендованных объектов */
  CHANGE_FACILITY_RENTAL: {
    type: 'CHANGE_FACILITY_RENTAL',
    title: (contractNumber, contractDate) =>
      `Внесение изменения в характеристики арендованных объектов по договору № ${contractNumber} от ${contractDate}`,
  },
  /** Зачет денежных средств на другой договор */
  OFFSET_TO_DIFFERENT_CONTRACT: {
    type: 'OFFSET_TO_DIFFERENT_CONTRACT',
    title: (contractNumber, contractDate) =>
      `Зачет переплаты по договору № ${contractNumber} от ${contractDate} на другой договор`,
  },
  /** Возврат денежных средств */
  OVERPAYMENT_REFUND: {
    type: 'OVERPAYMENT_REFUND',
    title: (contractNumber, contractDate) =>
      `Возврат переплаты по договору № ${contractNumber} от ${contractDate}`,
  },
  /** Смена юридического адреса/КПП */
  CHANGE_JURIDICAL_ADDRESS: {
    type: 'CHANGE_JURIDICAL_ADDRESS',
    title: () => 'Смена юридического адреса/КПП',
  },
  /** Смена организационно-правовой формы/ИНН */
  CHANGE_ORGANIZATIONAL_LEGAL_FORM: {
    type: 'CHANGE_ORGANIZATIONAL_LEGAL_FORM',
    title: () => 'Смена организационно-правовой формы/ИНН',
  },
  /** Смена наименования ЮЛ */
  CHANGE_COMPANY_NAME: {
    type: 'CHANGE_COMPANY_NAME',
    title: () => 'Смена наименования ЮЛ',
  },
  /** Смена руководителя */
  CHANGE_DIRECTOR: {
    type: 'CHANGE_DIRECTOR',
    title: () => 'Смена руководителя',
  },
  /** Смена контактных данных */
  CHANGE_CONTACT_DETAILS: {
    type: 'CHANGE_CONTACT_DETAILS',
    title: () => 'Смена контактных данных',
  },
  /** Отсутствует платеж по договору аренды */
  MISSING_PAYMENT: {
    type: 'MISSING_PAYMENT',
    title: (contractNumber, contractDate) =>
      `Отсутствует платеж по договору аренды № ${contractNumber} от ${contractDate}`,
  },
  /** Уведомление об субаренде */
  SUBLEASE_NOTICE: {
    type: 'SUBLEASE_NOTICE',
    title: (contractNumber, contractDate) =>
      `Уведомление о субаренде по договору № ${contractNumber} от ${contractDate}`,
  },
  /** Жалоба на акт (документ) */
  COMPLAINT_ON_DOCUMENT: {
    type: 'COMPLAINT_ON_DOCUMENT',
    title: (documentNumber, documentDate) =>
      `Жалоба на акт (документ) № ${documentNumber} от ${documentDate}`,
  },
  /** Жалоба на действие/бездействие должностных лиц */
  COMPLAINT_ON_ACTION: {
    type: 'COMPLAINT_ON_ACTION',
    title: (rosimOffice) =>
      `Жалоба на действие/бездействие должностных лиц ${rosimOffice}`,
  },
  /** Нетипизированное обращение */
  NO_SUITABLE_LIFE_SITUATION: {
    type: 'NO_SUITABLE_LIFE_SITUATION',
    title: () => 'Нетипизированное обращение в Росимущество',
  },
  /** Согласие на получение документов на бумажном носителе */
  CONSENT_TO_PAPER_WORKFLOW: {
    type: 'CONSENT_TO_PAPER_WORKFLOW',
    title: () => 'Согласие на получение документов на бумажном носителе',
  },
  /** Согласие на получение документов на бумажном носителе */
  REFUSAL_FROM_PAPER_WORKFLOW: {
    type: 'REFUSAL_FROM_PAPER_WORKFLOW',
    title: () => 'Отказ от получения документов на бумажном носителе',
  },
  /** Входящий документ, требует подписи */
  INCOMING_DOCUMENT_SIGNATURE_REQUIRED: {
    type: 'INCOMING_DOCUMENT_SIGNATURE_REQUIRED',
  },
  /** Входящий документ, не требует подписи */
  INCOMING_DOCUMENT_SIGNATURE_NOT_REQUIRED: {
    type: 'INCOMING_DOCUMENT_SIGNATURE_NOT_REQUIRED',
  },
};

/**
 * Типы статусов сообщений
 */
export const APPEAL_STATES = {
  SENT: { code: 'SENT', name: 'Отправлено' },
  DELIVERED: { code: 'DELIVERED', name: 'Доставлено' },
  INTERIM_ANSWER: { code: 'INTERIM_ANSWER', name: 'Промежуточный ответ' },
  ADDITIONAL_INFO_REQUESTED: {
    code: 'ADDITIONAL_INFO_REQUESTED',
    name: 'Запрошена дополнительная информация',
  },
  ADDITIONAL_INFO_PROVIDED: {
    code: 'ADDITIONAL_INFO_PROVIDED',
    name: 'Предоставлена дополнительная информация',
  },
  FINAL_ANSWER: { code: 'FINAL_ANSWER', name: 'Итоговый ответ' },
  SIGN_REQUESTED: { code: 'SIGN_REQUESTED', name: 'Запрошена подпись' },
  SIGNED: { code: 'SIGNED', name: 'Подписан' },
  REJECTED: { code: 'REJECTED', name: 'Отклонен' },
};

/**
 * Мок значения ТУ Росимущества
 */
export const ROSSIM_OFFICE_MOCK = 'ТУ Росимущества по г.Москве';
