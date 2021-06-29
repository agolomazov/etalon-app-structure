import { SITUATION_APPEAL_TYPES } from '../../constants';
import { createTypesItems } from '../../utils';

/**
 * ## Тип обращения
 * @const
 * @type {object}
 */
export const APPEAL_TYPES = {
  address: 'address',
  inn: 'inn',
  name: 'name',
  contacts: 'contacts',
  leader: 'leader',
};

/**
 * ## Объект с маппингом типа обращения
 * @const
 * @type {object}
 */
export const APPEAL_TYPE_MAP = {
  [APPEAL_TYPES.address]: {
    displayText: 'Смена юридического адреса/КПП',
    situationAppealType:
      SITUATION_APPEAL_TYPES.CHANGE_DETAILS_JURIDICAL_ADDRESS,
  },
  [APPEAL_TYPES.inn]: {
    displayText: 'Смена организационно-правовой формы/ИНН',
    situationAppealType: SITUATION_APPEAL_TYPES.CHANGE_DETAILS_JURIDICAL_INN,
  },
  [APPEAL_TYPES.name]: {
    displayText: 'Смена наименования ЮЛ',
    situationAppealType: SITUATION_APPEAL_TYPES.CHANGE_DETAILS_JURIDICAL_NAME,
  },
  [APPEAL_TYPES.contacts]: {
    displayText: 'Смена контактных данных',
    situationAppealType:
      SITUATION_APPEAL_TYPES.CHANGE_DETAILS_JURIDICAL_CONTACTS,
  },
  [APPEAL_TYPES.leader]: {
    displayText: 'Смена руководителя',
    situationAppealType: SITUATION_APPEAL_TYPES.CHANGE_DETAILS_JURIDICAL_LEADER,
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
  /** Фамилия */
  surname: 'surname',
  /** Имя */
  name: 'name',
  /** Отчество */
  patronymic: 'patronymic',
  /** Телефон */
  tel: 'tel',
  /** Почта */
  email: 'email',
  /** Загружаемый файл */
  file: 'file',
  /** Комментарий */
  comment: 'comment',
};
