import { ACCRUAL_PERIOD_TYPES } from '@src/constants';
import { getDictionaryText, getFullPeriodText } from './index';

const arr = [
  {
    code: 'LAND_PLOT',
    name: 'Земельный участок',
  },
  {
    code: 'BUILDING',
    name: 'Здания, сооружения',
  },
  {
    code: 'SHARES_IN_RIGHT',
    name: 'Доли в праве',
  },
  {
    code: 'MOVABLE_PROPERTY',
    name: 'Движимое имущество',
  },
  {
    code: 'AIRCRAFTS_AND_SHIPS',
    name: 'Воздушные и морские суда',
  },
  {
    code: 'PROPERTY_COMPLEX',
    name: 'Имущественный комплекс',
  },
  {
    code: 'OTHER_MOVABLE_PROPERTY',
    name: 'Иное движимое имущество',
  },
  {
    code: 'LAND_PLOT_COMPLEX',
    name: 'Комплекс земельных участков',
  },
  {
    code: 'ROOM',
    name: 'Помещения',
  },
];

const PERIOD_DICTIONARY = [
  { code: 'MONTH', name: 'месяц' },
  { code: 'QUARTER', name: 'квартал' },
  { code: 'HALF_YEAR', name: 'полугодие' },
  { code: 'YEAR', name: 'год' },
  { code: 'ARBITRARY', name: 'произвольно' },
];

describe('getDictionaryText - возвращает поле name при совпадении code в массиве объектов из словаря', () => {
  test('Должен вернуть корректное значение', () => {
    expect(getDictionaryText(arr, '')).toBe(null);
    expect(getDictionaryText(arr, 'Any_Value')).toBe(null);
    expect(getDictionaryText(arr, 'Any_Value', 'Значение не найдено')).toBe(
      'Значение не найдено',
    );
    expect(getDictionaryText(arr, 'ROOM', 'Значение не найдено')).toBe(
      'Помещения',
    );
    expect(
      getDictionaryText(arr, 'PROPERTY_COMPLEX', 'Значение не найдено'),
    ).toBe('Имущественный комплекс');
    expect(getDictionaryText(arr, 'OTHER_MOVABLE_PROPERTY')).toBe(
      'Иное движимое имущество',
    );
    expect(getDictionaryText(arr, 'LAND_PLOT')).toBe('Земельный участок');
  });
});

describe('getFullPeriodText - возвращает корректный текст сообщения о начислении', () => {
  test('Должен вернуть корректное значение', () => {
    expect(
      getFullPeriodText(ACCRUAL_PERIOD_TYPES.MONTH, PERIOD_DICTIONARY),
    ).toBe('Начислено за текущий месяц');
    expect(
      getFullPeriodText(ACCRUAL_PERIOD_TYPES.QUARTER, PERIOD_DICTIONARY),
    ).toBe('Начислено за текущий квартал');
    expect(
      getFullPeriodText(ACCRUAL_PERIOD_TYPES.HALF_YEAR, PERIOD_DICTIONARY),
    ).toBe('Начислено за текущее полугодие');
    expect(
      getFullPeriodText(ACCRUAL_PERIOD_TYPES.YEAR, PERIOD_DICTIONARY),
    ).toBe('Начислено за текущий год');
    expect(
      getFullPeriodText(ACCRUAL_PERIOD_TYPES.ARBITRARY, PERIOD_DICTIONARY),
    ).toBe('Начислено за текущий период');
    expect(getFullPeriodText(null, PERIOD_DICTIONARY)).toBe('Начислено');
    expect(getFullPeriodText(undefined, PERIOD_DICTIONARY)).toBe('Начислено');
    expect(getFullPeriodText('no match', PERIOD_DICTIONARY)).toBe(
      'Начислено за текущий период',
    );
  });
});
