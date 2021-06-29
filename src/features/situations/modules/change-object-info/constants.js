import { SITUATION_APPEAL_TYPES } from '../../constants';
import { createTypesItems } from '../../utils';

/**
 * ## Тип обращения
 * @const
 * @type {object}
 */
export const APPEAL_TYPES = {
  CHANGE_INFO: 'change-facility-rental',
  MISSING_DATA: 'missing-data-in-facility',
};

/**
 * ## Объект с маппингом типа обращения
 * @const
 * @type {object}
 */
export const APPEAL_TYPE_MAP = {
  [APPEAL_TYPES.MISSING_DATA]: {
    displayText: 'Сообщить об отсутствии данных по объектам',
    situationAppealType: SITUATION_APPEAL_TYPES.MISSING_DATA,
  },
  [APPEAL_TYPES.CHANGE_INFO]: {
    displayText: 'Внести изменения в характеристики объектов',
    situationAppealType: SITUATION_APPEAL_TYPES.CHANGE_OBJECT_INFO,
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
  /** Территориальный орган */
  documentId: 'documentId',
  /** Номер документа */
  documentNumber: 'documentNumber',
  /** Дата документа */
  documentDate: 'documentDate',
  /** Адрес объекта */
  objectAdress: 'objectAdress',
  /** Кадастровый номер объекта */
  cadastralNumber: 'cadastralNumber',
  /** Тип объекта */
  objectType: 'objectType',
  /** Загружаемые файлы */
  file: 'file',
  /** Изменяемые поля */
  changesSelect: 'changesSelect',
  /** Новый адрес */
  changeAdressValue: 'changeAdressValue',
  /** Новая площадь */
  changeAreaValue: 'changeAreaValue',
  /** Новый вид разрешенного использования */
  changePermisionType: 'changePermisionType',
  /** Новая категория */
  changeCategoryValue: 'changeCategoryValue',
  /** Новое назначение объекта */
  changeObjectIntendValue: 'changeObjectIntendValue',
  /** Новый кадастровый номер */
  changeCadastralValue: 'changeCadastralValue',
  /** Новый комментарий */
  changeCommentValue: 'changeCommentValue',
};

/**
 * Категория земли
 */
export const LAND_CATEGORY = [
  {
    value: 'AGRICULTURAL_LAND',
    name: 'Земли сельскохозяйственного значения',
  },
  {
    value: 'SETTLEMENTS_LAND',
    name: 'Земли населенных пунктов',
  },
  {
    value: 'INDUSTRY_LAND',
    name: 'Земли промышленности и иного специального назначения',
  },
  {
    value: 'PROTECTED_AREAS_LAND',
    name: 'Земли особо охраняемых территорий и объектов',
  },
  {
    value: 'FOREST_LAND',
    name: 'Земли лесного фонда',
  },
  {
    value: 'WATER_FUND_LAND',
    name: 'Земли водного фонда',
  },
  {
    value: 'RESERVE_LAND',
    name: 'Земли запаса',
  },
];

export const CHANGES_OPTIONS = {
  LAND_PLOT: [
    'Адрес объекта',
    'Вид разрешенного использования',
    'Категория',
    'Кадастровый номер',
    'Площадь',
  ],
  OBJECT: [
    'Адрес объекта',
    'Кадастровый номер',
    'Назначение объекта',
    'Площадь',
  ],
};
