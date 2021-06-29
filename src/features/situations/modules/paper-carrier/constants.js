import { SITUATION_APPEAL_TYPES } from '../../constants';
import { createTypesItems } from '../../utils';

/**
 * ## Тип обращения
 * @const
 * @type {object}
 */
export const APPEAL_TYPES = {
  consent: 'consent',
  refusal: 'refusal',
};

/**
 * ## Объект с маппингом типа обращения
 * @const
 * @type {object}
 */
export const APPEAL_TYPE_MAP = {
  [APPEAL_TYPES.consent]: {
    displayText: 'Получение документов на бумажном носителе',
    situationAppealType: SITUATION_APPEAL_TYPES.CONSENT_TO_PAPER_WORKFLOW,
    scannedAppealFileLinkId: 'CONSENT_SCANNED_APPEAL',
    scannedPowerOfAttorneyFileLinkId: 'CONSENT_SCANNED_POWER_OF_ATTORNEY',
  },
  [APPEAL_TYPES.refusal]: {
    displayText: 'Отказ от получения документов на бумажном носителе',
    situationAppealType: SITUATION_APPEAL_TYPES.REFUSAL_FROM_PAPER_WORKFLOW,
    scannedAppealFileLinkId: 'REFUSAL_SCANNED_APPEAL',
    scannedPowerOfAttorneyFileLinkId: 'REFUSAL_SCANNED_POWER_OF_ATTORNEY',
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
 * @type {object}
 */
export const APPEAL_FIELDS = {
  /** Id обращения */
  id: 'id',
  /** Тип обращения */
  appealType: 'appealType',
  /** скан-образ подписанного заявления */
  appealFile: 'appealFile',
  /** скан-образ доверенности */
  powerOfAttorneyFile: 'powerOfAttorneyFile',
};
