import { SITUATION_APPEAL_TYPES } from '../../constants';
import { createTypesItems } from '../../utils';

/**
 * ## Максимальное количество платежных поручений
 * @const
 */
export const PAYMENT_ORDERS_MAX_COUNT = 10;

/**
 * ============================================================================
 */

/**
 * ## Тип обращения
 * @const
 */
export const APPEAL_TYPES = {
  TRANSFER: 'transfer',
  REFUND: 'refund',
};

/**
 * ## Объект с маппингом типа обращения
 * @const
 */
export const APPEAL_TYPE_MAP = {
  [APPEAL_TYPES.TRANSFER]: {
    displayText: 'Зачет денежных средств на другой договор',
    amountDescription: 'Требующая перезачета',
    attentionText: `Внимание! Сумма перезачета превышает
                    величину установленной переплаты по договору.`,
    situationAppealType: SITUATION_APPEAL_TYPES.OVERPAYMENT_TRANSFER,
    downloadAppealStepNumber: 5,
    scannedAppealFileLinkId: 'OVERPAYMENT_TRANSFER_SCANNED_APPEAL',
  },
  [APPEAL_TYPES.REFUND]: {
    displayText: 'Возврат денежных средств',
    amountDescription: 'К возврату',
    attentionText: `Внимание! Сумма для возврата превышает
                    величину установленной переплаты по договору.`,
    situationAppealType: SITUATION_APPEAL_TYPES.OVERPAYMENT_REFUND,
    downloadAppealStepNumber: 6,
    scannedAppealFileLinkId: 'OVERPAYMENT_REFUND_SCANNED_APPEAL',
  },
};

/**
 * ## Список типов обращений для выпадающего списка
 * @const
 * @type {Array}
 */
export const APPEAL_DROPDOWN_ITEMS = createTypesItems(
  APPEAL_TYPES,
  APPEAL_TYPE_MAP,
);

/**
 * ============================================================================
 */

/**
 * ## Причина переплаты
 * @const
 */
export const REASON_TYPES = {
  MISTAKE: 'WRONG_TRANSFER',
  OVERDRAFT: 'EXCESSIVE_TRANSFER',
};

/**
 * ## Объект с маппингом причины переплаты
 * @const
 */
export const REASON_TYPE_MAP = {
  [REASON_TYPES.MISTAKE]: {
    displayText: 'Ошибочное перечисление',
  },
  [REASON_TYPES.OVERDRAFT]: {
    displayText: 'Излишнее перечисление',
  },
};

/**
 * ## Список причин переплаты для выпадающего списка
 * @const
 * @type {Array}
 */
export const REASON_DROPDOWN_ITEMS = createTypesItems(
  REASON_TYPES,
  REASON_TYPE_MAP,
);

/**
 * ============================================================================
 */

/**
 * ## Тип получателя
 * @const
 */
export const RECIPIENT_TYPES = {
  NATURAL_PERSON: 'NATURAL_PERSON',
  JURIDICAL_PERSON: 'JURIDICAL_PERSON',
  FISCAL_ORGANIZATION: 'FISCAL_ORGANIZATION',
};

/**
 * ## Объект с маппингом типа получателя
 * @const
 */
export const RECIPIENT_TYPE_MAP = {
  [RECIPIENT_TYPES.NATURAL_PERSON]: {
    displayText: 'Физическое лицо',
  },
  [RECIPIENT_TYPES.JURIDICAL_PERSON]: {
    displayText: 'Юридическое лицо',
  },
  [RECIPIENT_TYPES.FISCAL_ORGANIZATION]: {
    displayText: 'Бюджетная организация',
  },
};

/**
 * ## Список типов получателя для выпадающего списка
 * @const
 * @type {Array}
 */
export const RECIPIENT_DROPDOWN_ITEMS = createTypesItems(
  RECIPIENT_TYPES,
  RECIPIENT_TYPE_MAP,
);

/**
 * ============================================================================
 */

/**
 * ## Тип обязательства
 * @const
 */
export const OBLIGATION_TYPES = {
  PRINCIPAL: 'MAIN',
  PENALTY: 'PENALTY',
};

/**
 * ## Объект с маппингом типа обязательства
 * @const
 */
export const OBLIGATION_TYPE_MAP = {
  [OBLIGATION_TYPES.PRINCIPAL]: {
    displayText: 'Основное обязательство',
  },
  [OBLIGATION_TYPES.PENALTY]: {
    displayText: 'Пени',
  },
};

/**
 * ## Список типов обязательств для выпадающего списка
 * @const
 * @type {Array}
 */
export const OBLIGATION_DROPDOWN_ITEMS = createTypesItems(
  OBLIGATION_TYPES,
  OBLIGATION_TYPE_MAP,
);

/**
 * ============================================================================
 */

/**
 * ## Название формы для скачивания заявления
 * @const
 * @type {string}
 */
export const FORM_NAME = 'overpayment-download-form';

/**
 * ## Название формы для загрузки заявления
 * @const
 * @type {string}
 */
export const UPLOAD_FORM_NAME = 'overpayment-upload-form';

/**
 * ## Анкетные поля для обращения
 * @const
 */
export const APPEAL_FIELDS = {
  /** Id обращения */
  id: 'id',
  /** Тип обращения */
  appealType: 'appealType',
  /** контракт по которому есть переплата */
  contract: 'contract',
  /** номер контракта по которому есть переплата */
  contractDate: 'contractDate',
  /** Сумма требующая перезачета / к возврату */
  amount: 'amount',
  /** Причина переплаты */
  reason: 'reason',
  /** Id платежного поручения */
  paymentOrderId: 'paymentOrderId',
  /** Номер платежного поручения */
  paymentOrderNumber: 'paymentOrderNumber',
  /** Дата платежного поручения */
  paymentOrderDate: 'paymentOrderDate',
  /** Подтверждающий документ платежного поручения */
  paymentOrderFile: 'paymentOrderFile',
  /** Тип обязательства по договору, по которому есть переплата */
  contractObligationType: 'contractObligationType',
  /** Id договора при зачете ДС */
  transferContractId: 'transferContractId',
  /** Номер договора при зачете ДС */
  transferContractNumber: 'transferContractNumber',
  /** Дата договора при зачете ДС */
  transferContractDate: 'transferContractDate',
  /** Тип обязательства при зачете ДС */
  transferObligationType: 'transferObligationType',
  /** Период погашения обязательства при зачете ДС */
  transferPeriod: 'transferPeriod',
  /** Тип получателя */
  recipientType: 'recipientType',
  /** Фамилия Имя Отчество получателя */
  personFio: 'personFio',
  /** ИНН получателя */
  personInn: 'personInn',
  /** Серия паспорта */
  passportSeries: 'passportSeries',
  /** Номер паспорта */
  passportNumber: 'passportNumber',
  /** Кем выдан паспорт */
  passportFmsUnit: 'passportFmsUnit',
  /** Дата выдачи паспорта */
  passportDate: 'passportDate',
  /** Наименование организации */
  companyName: 'companyName',
  /** ИНН организации */
  companyInn: 'companyInn',
  /** КПП организации */
  companyKpp: 'companyKpp',
  /** Наименование банка  */
  bank: 'bank',
  /** БИК */
  bik: 'bik',
  /** Банковский счет */
  bankAccount: 'bankAccount',
  /** Корреспондентский счет */
  correspondentAccount: 'correspondentAccount',
  /** Лицевой счет */
  personalAccount: 'personalAccount',
  /** КБК */
  kbk: 'kbk',
  /** Скан-образ подписанного заявления  */
  scannedAppealFile: 'scannedAppealFile',
};
