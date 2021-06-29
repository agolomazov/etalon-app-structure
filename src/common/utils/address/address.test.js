import {addressFormat} from './index';

describe('addressFormat - Метод очистки адреса для лучшей сортировки', () => {
  test('Простое преобразование', () => {
    expect(addressFormat('г.Москва, Красная площадь д.1')).toBe('г.москва,краснаяплощадьд.1');
    expect(addressFormat('Санкт-Петербург, Невский пр., д.26/2')).toBe('санкт-петербург,невскийпр.,д.26/2');
    expect(addressFormat('Деревня   Гадюкино!')).toBe('деревнягадюкино!');
  });
});
