/**
 * Режим окружения
 */
export const ENV_MODE = {
  DEV: 'DEV',
  IFT: 'IFT',
};

/**
 * ## Формат даты
 * @const
 */
export const DATE_FORMAT = 'DD.MM.YYYY';

/**
 * ## Серверный формат даты
 * @const
 */
export const SERVER_DATE_FORMAT = 'YYYY-MM-DD';

/**
 * ## Тип организации для логина
 * @const
 */
export const LOGIN_TYPES = {
  NATURAL: 'natural',
  JURIDICAL: 'juridical',
  ENTREPRENEUR: 'entrepreneur',
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
 * ## Привилегии пользователя
 * @const
 */
export const PERMISSIONS = {
  GENERIC: {
    // привилегия базового доступа на чтение
    READ: 'Arlk.generic.read',
    // привилегия базового доступа на запись
    WRITE: 'Arlk.generic.write',
  },
  EDO: {
    // привилегия подтверждения согласия на ЭДО
    EDO_CONSENT: 'Arlk.edo.edoConsent',
  },
  INCOMING_DOCUMENT: {
    // привилегия подтверждения получения входящих документов.
    CONFIRM_RECEIPT: 'Arlk.incomingDocument.confirmReceipt',
    // привилегия подписания входящих документов
    SIGN: 'Arlk.incomingDocument.sign',
  },
};

/**
 * ## Файлы
 * @const
 */
export const FIXTURE_FILES = {
  LITTLE_PNG: 'little.png',
  LARGE_PNG: 'large.png',
  EXTRA_LARGE_PNG: 'extralarge.png',
  ONE_PNG: '1.png',
  TWO_PNG: '2.png',
  THREE_PNG: '3.png',
  FOUR_PNG: '4.png',
  FIVE_PNG: '5.png',
};

/**
 * ## Текстовки ошибок полей ввода
 * @const
 */
export const ERROR_MESSAGES = {
  INPUT_REQUIRED: 'Заполните',
  FILE_REQUIRED: 'Необходимо добавить файл',
  WRONG_SUBTENANT_INN: 'Введите ИНН субарендатора',
  WRONG_NATURAL_INN: 'Введите ИНН физического лица',
  WRONG_JURIDICAL_INN: 'Введите ИНН юридического лица',
  WRONG_CADASTRAL_NUMBER: 'Введите кадастровый номер',
  WRONG_EMAIL: 'Введите адрес электронной почты',
};

/**
 * ## Мок привилегий пользователя
 * @const
 */
export const PERMISSIONS_MOCK = {
  withPermissions: [PERMISSIONS.EDO.EDO_CONSENT],
};

/**
 * ## Типы объектов аренды
 * @const
 */
export const FACILITY_TYPES = [
  { code: 'LAND_PLOT', name: 'Земельный участок' },
  { code: 'BUILDING', name: 'Здания, сооружения' },
  { code: 'SHARES_IN_RIGHT', name: 'Доли в праве' },
  { code: 'MOVABLE_PROPERTY', name: 'Движимое имущество' },
  { code: 'AIRCRAFTS_AND_SHIPS', name: 'Воздушные и морские суда' },
  { code: 'PROPERTY_COMPLEX', name: 'Имущественный комплекс' },
  { code: 'OTHER_MOVABLE_PROPERTY', name: 'Иное движимое имущество' },
  { code: 'LAND_PLOT_COMPLEX', name: 'Комплекс земельных участков' },
  { code: 'ROOM', name: 'Помещения' },
];
