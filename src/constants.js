/**
 * ## Настройки для работы с API
 * @const
 * @type {string}
 */
export const API_VERSION = 'v1';

/**
 * ## API сервисы
 * @const
 */
export const API_SERVICES = {
  /** API сервис Профиль Арендатора */
  TENANT_PROFILE: 'tenant-profile',
  /** API сервис Договоры Арендатора */
  TENANT_CONTRACT: 'tenant-contract',
};

/**
 * ## Настройка путей для роутера
 */
export const APP_ROUTES = {
  MAIN_PAGE: '/',
  CONTRACTS: '/contracts',
  CONTRACT_DETAILS: (contractId) => `/contracts/${contractId}`,
  CONTRACT_PAYMENT: (contractId) => `/contracts/${contractId}/payment`,
  CONTRACT_PAYMENT_UPS: (contractId) => `/contracts/${contractId}/payment/ups`,
  RENTAL_OBJECTS: '/rental-objects',
  PROFILE: '/profile',
  SITUATIONS: '/situations',
  SITUATION_ACT: '/situations/situation-act',
  SITUATION_CONTRACT_MISSED: '/situations/situation-contract',
  SITUATION_PAYMENT_MISSED: '/situations/situation-payment',
  SITUATION_CHANGE_DETAILS: '/situations/situation-change-details',
  SITUATION_SUBLEASE_NOTICE: '/situations/situation-sublease',
  SITUATION_NO_SUITABLE: '/situations/situation-no-suitable',
  SITUATION_COMPLAINT: '/situations/situation-complaint',
  SITUATION_OVERPAYMENT: '/situations/situation-overpayment',
  SITUATION_CHANGE_OBJECT_INFO: '/situations/situation-change-object-info',
  SITUATION_PAPER_CARRIER: '/situations/situation-paper-carrier',
  MESSAGES: '/messages',
  MESSAGES_APPEAL: (appealId) => `/messages/${appealId}`,
  UNCONFIRMED_USER: '/error-unconfirmed-user',
  ACCESS_DENIED: '/access-denied',
  HELP: '/help',
  SUPPORT: '/help/support',
  FEEDBACK: '/feedback',
  CONSENT_TO_EDM: '/consent-to-edm',
  NOT_A_TENANT: '/not-a-tenant',
};

/**
 * ## URL главной страницы Росимущества
 * @const
 */
export const ROSIM_URL = '/rosim-mock/';

/**
 * ## URL страницы Росимущества c контактными данными
 * @const
 */
export const ROSIM_CONTACTS_URL =
  'https://www.rosim.ru/about/structure/regional';

/**
 * ## URL для логаута из ЕСИА
 * @const
 */
export const LOGOUT_URL = '/openid-connect-auth/logout';

/**
 * ## Список урлов
 * @const
 */
export const APP_URLS = {
  /**
   * Ссылка на файл обращения
   *
   * @param {string} appealId - идентификатор обращения
   * @param {string} fileId - идентификатор файла
   *
   * @returns {string} Ссылка на файл обращения
   */
  appealFileUrl: (appealId, fileId) =>
    `${API_SERVICES.TENANT_CONTRACT}/api/${API_VERSION}` +
    `/appeal/${appealId}/file/${fileId}`,
};

/**
 * ## Список query параметров
 * @const
 */
export const APP_QUERY_PARAMS = {
  CONTRACT_ID: 'contractId',
  APPEAL_TYPE: 'appealType',
};

/**
 * ## Список query значений
 * @const
 */
export const APP_QUERY_VALUES = {
  APPEAL_TYPE_MISSING_INFO: 'missing-data-in-facility',
  APPEAL_TYPE_CHANGE_INFO: 'change-facility-rental',
};

/**
 * ## Список типов арендатора
 * @const
 */
export const TENANT_TYPES = {
  NATURAL_PERSON: 'NATURAL_PERSON',
  ENTREPRENEUR: 'ENTREPRENEUR',
  JURIDICAL_PERSON: 'JURIDICAL_PERSON',
};

/**
 * ## Маппер для типа арендатора
 * @const
 */
export const TENANT_TYPE_MAP = {
  [TENANT_TYPES.NATURAL_PERSON]: {
    displayText: 'Физическое лицо',
  },
  [TENANT_TYPES.ENTREPRENEUR]: {
    displayText: 'Индивидуальный предприниматель',
  },
  [TENANT_TYPES.JURIDICAL_PERSON]: {
    displayText: 'Юридическое лицо',
  },
};

/**
 * ## Список навигации для Aside панели
 * @const
 * @type {object}
 * @property {Array<object>} main - Массив с ссылками в верхней части панели
 * @property {Array<object>} additional - Массив с ссылками в нижней части панели
 * @property {string} to - ссылка на страницу
 * @property {string} iconSrc - ссылка на иконку
 * @property {string} title - название
 * @property {bool} inDevelop - если true, находится в разработке
 */
export const ASIDE_NAV_LINKS = {
  main: [
    {
      to: APP_ROUTES.CONTRACTS,
      iconSrc: 'https://cdn.esphere.ru/images/ri/icon-contract.svg',
      title: 'Мои договоры',
    },
    {
      to: APP_ROUTES.RENTAL_OBJECTS,
      iconSrc: 'https://cdn.esphere.ru/images/ri/icon-object.svg',
      title: 'Мои объекты',
    },
    {
      to: APP_ROUTES.SITUATIONS,
      iconSrc: 'https://cdn.esphere.ru/images/ri/icon-situation.svg',
      title: 'Жизненные ситуации',
    },
    {
      to: APP_ROUTES.MESSAGES,
      iconSrc: 'https://cdn.esphere.ru/images/ri/icon-message.svg',
      title: 'Сообщения',
    },
  ],
  additional: [
    {
      to: APP_ROUTES.FEEDBACK,
      iconSrc: 'https://cdn.esphere.ru/images/nova/icons/sms-accounting.svg',
      title: 'Оставить отзыв',
    },
    {
      to: APP_ROUTES.HELP,
      iconSrc: 'https://cdn.esphere.ru/images/nova/icons/help-monochrome.svg',
      title: 'Помощь',
    },
  ],
};

/**
 * ## Конфигурация для загрузки файлов на сервер
 * @const
 * @type {object}
 */
export const FILES_UPLOAD_CONFIG = {
  /** Максимальный размер загружаемого на сервер файла в байтах */
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  /** Разрешенные типы файлов для загрузки */
  ALLOWED_FILES: '.pdf,.bmp,.jpg,.png',
  /** Максимальное количество загружаемых файлов */
  FILES_LIMIT: 5,
};

/**
 * ## Список типов периодов начисления
 * @const
 * @type {object}
 */
export const ACCRUAL_PERIOD_TYPES = {
  MONTH: 'MONTH',
  QUARTER: 'QUARTER',
  HALF_YEAR: 'HALF_YEAR',
  YEAR: 'YEAR',
  ARBITRARY: 'ARBITRARY',
};

/**
 * ## Список статусов договоров
 * @const
 * @type {object}
 */
export const CONTRACT_STATUS_TYPES = {
  ACTIVE: 'ACTIVE',
  TERMINATED: 'TERMINATED',
};

/**
 * ## Список кодов ошибок приложения
 * @const
 */
export const ERROR_CODES = {
  UNCONFIRMED_USER: 'code_Неподтвержденная УЗ',
  ARLK0021: 'ARLK-0021',
};

/**
 * ## Количество элементов на странице
 * @const
 * @type {number}
 */
export const DEFAULT_PAGE_SIZE = 10;

/**
 * ## Пустое содержание
 * @const
 * @type {string}
 */
export const EMPTY_CONTENT = '—';
