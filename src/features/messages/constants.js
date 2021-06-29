import { FILES_UPLOAD_CONFIG } from '@src/constants';

/**
 * Типы статусов сообщений
 */
export const APPEAL_STATUS = {
  DRAFT: 'Черновик',
  FINAL_ANSWER: 'Итоговый ответ',
  ADDITIONAL_INFO_REQUESTED: 'Запрошена дополнительная информация',
  INTERIM_ANSWER: 'Промежуточный ответ',
  SENT: 'Отправлено',
  DELIVERED: 'Доставлено',
  ADDITIONAL_INFO_PROVIDED: 'Предоставлена дополнительная информация',
};

/**
 * Типы статусов входящих документов
 */
export const INCOMING_DOCUMENT_STATUS = {
  SENT: 'Отправлено',
  DELIVERED: 'Доставлено',
  SIGN_REQUESTED: 'Запрошена подпись',
  SIGNED: 'Подписан',
  REJECTED: 'Отклонен',
};

/**
 * Типы обращений
 */
export const APPEAL_TYPES = {
  // Обращения по ЖС
  SCANNED_ACT: 'SCANNED_ACT',
  REQUEST_ACT: 'REQUEST_ACT',
  MISSING_CONTRACT_IN_LK: 'MISSING_CONTRACT_IN_LK',
  CHANGE_CONTACT_DETAILS: 'CHANGE_CONTACT_DETAILS',
  CHANGE_JURIDICAL_ADDRESS: 'CHANGE_JURIDICAL_ADDRESS',
  CHANGE_COMPANY_NAME: 'CHANGE_COMPANY_NAME',
  CHANGE_ORGANIZATIONAL_LEGAL_FORM: 'CHANGE_ORGANIZATIONAL_LEGAL_FORM',
  CHANGE_DIRECTOR: 'CHANGE_DIRECTOR',
  MISSING_PAYMENT: 'MISSING_PAYMENT',
  NO_SUITABLE_LIFE_SITUATION: 'NO_SUITABLE_LIFE_SITUATION',
  COMPLAINT_ON_ACTION: 'COMPLAINT_ON_ACTION',
  COMPLAINT_ON_DOCUMENT: 'COMPLAINT_ON_DOCUMENT',
  MISSING_DATA_IN_FACILITY: 'MISSING_DATA_IN_FACILITY',
  SUBLEASE_NOTICE: 'SUBLEASE_NOTICE',
  OFFSET_TO_DIFFERENT_CONTRACT: 'OFFSET_TO_DIFFERENT_CONTRACT',
  OVERPAYMENT_REFUND: 'OVERPAYMENT_REFUND',
  CHANGE_FACILITY_RENTAL: 'CHANGE_FACILITY_RENTAL',
  CONSENT_TO_PAPER_WORKFLOW: 'CONSENT_TO_PAPER_WORKFLOW',
  REFUSAL_FROM_PAPER_WORKFLOW: 'REFUSAL_FROM_PAPER_WORKFLOW',
  // Типы входящих документов
  INCOMING_DOCUMENT_SIGNATURE_REQUIRED: 'REQUIRED_CONFIRMATION_REQUIRED_SIGN',
  INCOMING_DOCUMENT_SIGNATURE_NOT_REQUIRED:
    'REQUIRED_CONFIRMATION_NOT_REQUIRED_SIGN',
  INCOMING_DOCUMENT_SIGNATURE_AND_CONFIRMATION_NOT_REQUIRED:
    'NOT_REQUIRED_CONFIRMATION_NOT_REQUIRED_SIGN',
};

/**
 * Формат даты и времени в разделе Сообщения
 */
export const APPEAL_DATE_TIME_FORMAT = 'DD.MM.YYYY [в] HH:mm';

/**
 * Класс иконки с направлением сообщения
 */
export const MESSAGE_DIRECTON_ICONS = {
  OUT: 'novicon-double-arrow-right',
  IN: 'novicon-double-arrow-left',
};

/**
 * префикс получаемого от бэкэнда URL эндпоинта
 */
export const BACKEND_URL_PREFIX = '/api/v1/';

/**
 * разрешенные к загрузке файлы
 */
export const ALLOWED_UPLOAD_FILES = FILES_UPLOAD_CONFIG.ALLOWED_FILES;

/**
 * максимальный размер файла
 */
export const MAX_UPLOAD_FILE_SIZE = FILES_UPLOAD_CONFIG.MAX_FILE_SIZE;

/**
 * максимальное количество загружаемых файлов
 */
export const MAX_UPLOAD_FILES_COUNT = FILES_UPLOAD_CONFIG.FILES_LIMIT;

/**
 * Расшифровки дополнительных кодов, которые приход с обращениями
 * и которых нет в словаре полученном от сервера
 */
export const DICTIONARY = {
  overpaymentCauseTypes: [
    {
      code: 'EXCESSIVE_TRANSFER',
      name: 'Излишнее перечисление',
    },
    {
      code: 'WRONG_TRANSFER',
      name: 'Ошибочное перечисление',
    },
  ],
  obligationTypes: [
    {
      code: 'MAIN',
      name: 'Основное обязательство',
    },
    {
      code: 'PENALTY',
      name: 'Пени',
    },
  ],
  landCategory: [
    {
      code: 'AGRICULTURAL_LAND',
      name: 'Земли сельскохозяйственного значения',
    },
    {
      code: 'SETTLEMENTS_LAND',
      name: 'Земли населенных пунктов',
    },
    {
      code: 'INDUSTRY_LAND',
      name: 'Земли промышленности и иного специального назначения',
    },
    {
      code: 'PROTECTED_AREAS_LAND',
      name: 'Земли особо охраняемых территорий и объектов',
    },
    {
      code: 'FOREST_LAND',
      name: 'Земли лесного фонда',
    },
    {
      code: 'WATER_FUND_LAND',
      name: 'Земли водного фонда',
    },
    {
      code: 'RESERVE_LAND',
      name: 'Земли запаса',
    },
  ],
};
