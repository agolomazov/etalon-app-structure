import { SITUATION_APPEAL_TYPES } from '../../constants';
import { createTypesItems } from '../../utils';

/**
 * ## Тип обращения
 * @const
 */
export const APPEAL_TYPES = {
  DOCUMENT: 'document',
  ACTION: 'action',
};

/**
 * ## Объект с маппингом типа обращения
 * @const
 */
export const APPEAL_TYPE_MAP = {
  [APPEAL_TYPES.DOCUMENT]: {
    displayText: 'На акт (документ)',
    situationAppealType: SITUATION_APPEAL_TYPES.COMPLAINT_DOCUMENT,
  },
  [APPEAL_TYPES.ACTION]: {
    displayText: 'На действие или бездействие должностных лиц',
    situationAppealType: SITUATION_APPEAL_TYPES.COMPLAINT_ACTION,
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
  /** Тип обращения */
  appealType: 'appealType',
  /** Территориальный орган */
  rosimOffice: 'rosimOffice',
  /** Номер документа */
  documentNumber: 'documentNumber',
  /** Дата документа */
  documentDate: 'documentDate',
  /** Причина жалобы */
  complaintReason: 'complaintReason',
  /** Требования пользователя */
  userDemand: 'userDemand',
  /** Загружаемые файлы  */
  files: 'files',
};
