import { APP_ROUTES, FILES_UPLOAD_CONFIG } from '@src/constants';

/**
 * ## Максимальный размер загружаемого на сервер файла в байтах
 * @const
 * @type {number}
 */
export const SITUATION_MAX_UPLOAD_FILE_SIZE = FILES_UPLOAD_CONFIG.MAX_FILE_SIZE;

/**
 * ## Разрешенные типы файлов для загрузки
 * @const
 * @type {string}
 */
export const SITUATION_ALLOWED_FILES = FILES_UPLOAD_CONFIG.ALLOWED_FILES;

/**
 * ## Максимальное количество загружаемых файлов
 * @const
 * @type {number}
 */
export const SITUATION_FILES_LIMIT_AMOUNT = FILES_UPLOAD_CONFIG.FILES_LIMIT;

/**
 * ## Типы жизненных ситуаций
 * @const
 */
export const SITUATION_TYPES = {
  /** ЖС "Получить акт сверки" */
  RECONCILIATION_ACT: 'reconciliation-act',
  /** ЖС "Отсутствует договор аренды" */
  CONTRACT_MISSED: 'missing-contract',
  /** ЖС "Отсутствует платеж по договору аренды" */
  PAYMENT_MISSED: 'missing-payment',
  /** ЖС "Изменить реквизиты ЮЛ" */
  CHANGE_DETAILS_JURIDICAL: 'change-juridical-person-props',
  /** ЖС "Уведомление о субаренде" */
  SUBLEASE_NOTICE: 'sublease-notice',
  /** ЖС "Нет подходящей ЖС" */
  NO_SUITABLE: 'no-suitable-life-situation',
  /** ЖС "Подать жалобу" */
  COMPLAINT: 'complaint',
  /** ЖС "Распорядиться переплатой" */
  OVERPAYMENT: 'overpayment',
  /** ЖС "Внести изменения в характеристики арендованных объектов" */
  CHANGE_OBJECT_INFO: 'change-facility-rental',
  /** ЖС "Заявление на получение / на отказ от получения документов на бумажном носителе" */
  PAPER_WORKFLOW_APPLICATION: 'paper-documents',
};

/**
 * ## Типы обращений
 * @const
 */
export const SITUATION_APPEAL_TYPES = {
  /** Направить скан-копию подписанного акта сверки */
  SCANNED_ACT: 'scanned-act',
  /** Запросить акт сверки */
  REQUEST_ACT: 'request-act',
  /** Отсутствует договор аренды */
  CONTRACT_MISSED: 'missing-contract-in-lk',
  /** Отсутствует платеж по договору аренды */
  PAYMENT_MISSED: 'missing-payment',
  /** Смена юридического адреса/КПП для ЖС "Изменить реквизиты ЮЛ" */
  CHANGE_DETAILS_JURIDICAL_ADDRESS: 'change-juridical-address',
  /** Смена организационно-правовой формы/ИНН для ЖС "Изменить реквизиты ЮЛ" */
  CHANGE_DETAILS_JURIDICAL_INN: 'change-organizational-legal-form',
  /** Смена наименования ЮЛ для ЖС "Изменить реквизиты ЮЛ" */
  CHANGE_DETAILS_JURIDICAL_NAME: 'change-company-name',
  /** Смена контактных данных для ЖС "Изменить реквизиты ЮЛ" */
  CHANGE_DETAILS_JURIDICAL_CONTACTS: 'change-contact-details',
  /** Смена руководителя для ЖС "Изменить реквизиты ЮЛ" */
  CHANGE_DETAILS_JURIDICAL_LEADER: 'change-director',
  /** Уведомление о субаренде */
  SUBLEASE_NOTICE: 'sublease-notice',
  /** Нет подходящей ЖС */
  NO_SUITABLE: 'no-suitable-life-situation',
  /** Жалоба на акт (документ) по ЖС Подать жалобу */
  COMPLAINT_DOCUMENT: 'complaint-on-document',
  /** Жалоба на действие/бездействие должностных лиц по ЖС Подать жалобу */
  COMPLAINT_ACTION: 'complaint-on-action',
  /** Зачет денежных средств на другой договор для ЖС "Распорядиться переплатой" */
  OVERPAYMENT_TRANSFER: 'offset-to-different-contract',
  /** Возврат денежных средств для ЖС "Распорядиться переплатой" */
  OVERPAYMENT_REFUND: 'overpayment-refund',
  /** Внести изменения в характеристики арендованных объектов ЖС "Внести изменения в характеристики арендованных объектов" */
  CHANGE_OBJECT_INFO: 'change-facility-rental',
  /** Сообщить об отсутствии данных по арендованным объектам ЖС "Внести изменения в характеристики арендованных объектов" */
  MISSING_DATA: 'missing-data-in-facility',
  /** Согласие на получение документов на бумажном носителе */
  CONSENT_TO_PAPER_WORKFLOW: 'consent-to-paper-workflow',
  /** Отказ от получения документов на бумажном носителе */
  REFUSAL_FROM_PAPER_WORKFLOW: 'refusal-from-paper-workflow',
};

/**
 * ## Типы форм для скачивания
 * @const
 * @type {object}
 */
export const SITUATION_FORM_TYPES = {
  /** Форма заявления для ЖС "Распорядиться переплатой" */
  OVERPAYMENT_APPEAL_DOCUMENT: 'appeal-document',
  /** Форма заявления для ЖС "Заявление на получение / на отказ от получения документов на бумажном носителе" */
  PAPER_WORKFLOW_APPLICATION_APPEAL_DOCUMENT: 'application/file',
};

/**
 * ## Список жизненных ситуаций
 * @const
 * @type {Array}
 */
export const SITUATIONS_GRID_ITEMS = [
  {
    title: 'Получить акт сверки взаимных расчетов',
    to: APP_ROUTES.SITUATION_ACT,
    tags:
      'расчеты состояние расчетов детализация сверка взаиморасчеты направить',
  },
  {
    title: 'Отсутствует платеж по договору аренды',
    to: APP_ROUTES.SITUATION_PAYMENT_MISSED,
    tags:
      // eslint-disable-next-line max-len
      'нет платежа платежное поручение квитанция платежка платёжка не зачислили незачисленный платеж платёж',
  },
  {
    title: 'В Личном кабинете отсутствует информация о моем договоре аренды',
    to: APP_ROUTES.SITUATION_CONTRACT_MISSED,
    tags: 'нет договора поиск договора добавить',
  },
  {
    title: 'Изменить реквизиты Арендатора',
    to: APP_ROUTES.SITUATION_CHANGE_DETAILS,
    tags:
      // eslint-disable-next-line max-len
      'юридический адрес смена директора гендиректора руководителя кпп инн организационно правовая форма название компании организации телефон контактный email для связи электронной почты профиль',
  },
  {
    title: 'Изменить персональные данные',
    to: '#',
    hidden: true,
    tags: '',
  },
  {
    title: 'Распорядиться переплатой',
    to: APP_ROUTES.SITUATION_OVERPAYMENT,
    tags:
      // eslint-disable-next-line max-len
      'вернуть переплату возврат переплаты что делать с переплатой зачесть зачет зачёт вернуть деньги перевести перенести',
  },
  {
    title: 'Уведомление о субаренде',
    to: APP_ROUTES.SITUATION_SUBLEASE_NOTICE,
    tags: 'субаренда уведомить передача в субаренду аренду',
  },
  {
    title:
      // eslint-disable-next-line max-len
      'Заявление на получение / на отказ от получения документов на бумажном носителе',
    to: APP_ROUTES.SITUATION_PAPER_CARRIER,
    tags:
      // eslint-disable-next-line max-len
      'отказаться от получения только по почте почта получать бумаге через лк лка получать электронный вариант без бумаги',
  },
  {
    title: 'Жалобы на акты, действия / бездействия должностных лиц',
    to: APP_ROUTES.SITUATION_COMPLAINT,
    tags:
      // eslint-disable-next-line max-len
      'подать оставить жалобу пожаловаться нет ответа не отвечают нарушение нарушено',
  },
  {
    title: 'Нет подходящей жизненной ситуации',
    to: APP_ROUTES.SITUATION_NO_SUITABLE,
    tags:
      // eslint-disable-next-line max-len
      'нетипизированный запрос не найден найдена необходимая нет нужной требуемой',
  },
  {
    title: 'Внести изменения в характеристики арендованных объектов',
    to: APP_ROUTES.SITUATION_CHANGE_OBJECT_INFO,
    tags:
      // eslint-disable-next-line max-len
      'площадь адрес назначение объекта кадастровый номер вид разрешенного использования тип нет информации отсутствует информация дополнить уточнить изменить данные',
  },
];

/**
 * ## Список ЖС, если поиск не дал результатов
 * @const
 * @type {Array}
 */
export const NOT_FOUND_SITUATIONS_GRID_ITEMS = [
  {
    title: 'Нет подходящей жизненной ситуации',
    to: APP_ROUTES.SITUATION_NO_SUITABLE,
  },
];

/**
 * ## Мапер формирования имени файла для скачивания
 * @const
 * @type {Object}
 */
export const FILE_NAME_MAP = {
  [SITUATION_APPEAL_TYPES.OVERPAYMENT_TRANSFER]: {
    fileName: 'Заявление о зачете денежных средств',
    fileExtension: 'pdf',
  },
  [SITUATION_APPEAL_TYPES.OVERPAYMENT_REFUND]: {
    fileName: 'Заявление о возврате денежных средств',
    fileExtension: 'pdf',
  },
  [SITUATION_APPEAL_TYPES.CONSENT_TO_PAPER_WORKFLOW]: {
    fileName: 'Заявление на получение документов на бумажном носителе',
    fileExtension: 'pdf',
  },
  [SITUATION_APPEAL_TYPES.REFUSAL_FROM_PAPER_WORKFLOW]: {
    fileName: 'Заявление на отказ от получения документов на бумажном носителе',
    fileExtension: 'pdf',
  },
};
