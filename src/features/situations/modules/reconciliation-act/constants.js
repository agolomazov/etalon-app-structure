import { SITUATION_APPEAL_TYPES } from '../../constants';
import { createTypesItems } from '../../utils';

/**
 * ## Максимальное количество обращений по 1 ЖС
 * @const
 */
export const APPEALS_MAX_COUNT = 30;

/**
 * ## Тип обращения
 * @const
 */
export const APPEAL_TYPES = {
  scanned: 'scanned',
  requested: 'requested',
};

/**
 * ## Объект с маппингом. Маппит локальный тип обращения в тип обращения для BE
 * @const
 */
export const APPEAL_TYPE_MAP = {
  [APPEAL_TYPES.scanned]: {
    displayText: 'Направить скан-копию подписанного акта сверки',
    situationAppealType: SITUATION_APPEAL_TYPES.SCANNED_ACT,
  },
  [APPEAL_TYPES.requested]: {
    displayText: 'Запросить акт сверки',
    situationAppealType: SITUATION_APPEAL_TYPES.REQUEST_ACT,
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
 * ## Анкетные поля для обращения
 * @const
 */
export const APPEAL_FIELDS = {
  /** Id обращения */
  id: 'id',
  /** Id договора */
  contractId: 'contractId',
  /** Номер договора */
  contractNumber: 'contractNumber',
  /** Дата договора */
  contractDate: 'contractDate',
  /** Период формирования акта сверки */
  datePeriod: 'datePeriod',
  /** Загружаемый файл */
  file: 'file',
  /** В процессе загрузки */
  isLoading: 'isLoading',
  /** В процессе загрузки файл */
  isFileLoading: 'isFileLoading',
};
