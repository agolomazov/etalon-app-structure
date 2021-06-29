import moment from 'moment';

import { DATE_FORMAT } from '@common/utils';

import { genFormName, makeDatePeriod, makeMinMaxDates } from './utils';

const startDate = '2020-01-01';
const expirationDate = '2020-02-01';
const expirationDateInFuture = '2120-02-01';
const expectStartDate = '01.01.2020';
const expectExpirationDate = '01.02.2020';

describe('genFormName - Генератор названия формы', () => {
  test('Простая проверка', () => {
    expect(genFormName(1)).toBe('form1');
    expect(genFormName('1')).toBe('form1');
  });
});

describe('makeDatePeriod - Метод формирует дипазон дат', () => {
  test('Дата окончания === срок действия, если срок действия завершен на текущую дату', () => {
    const period = makeDatePeriod(startDate, expirationDate);
    expect(period[0]).toBe(expectStartDate);
    expect(period[1]).toBe(expectExpirationDate);
  });

  test('Дата окончания === текущая дата, если срок действия не завершен на текущую дату', () => {
    const period = makeDatePeriod(startDate, expirationDateInFuture);
    expect(period[0]).toBe(expectStartDate);
    expect(period[1]).toBe(moment().format(DATE_FORMAT));
  });
});

describe('makeMinMaxDates - Формирует массив с минимальной и максимальной датой', () => {
  test('Дата окончания === срок действия, если срок действия завершен на текущую дату', () => {
    const period = makeMinMaxDates(startDate, expirationDate);
    expect(moment(period[0]).format(DATE_FORMAT)).toBe(expectStartDate);
    expect(moment(period[1]).format(DATE_FORMAT)).toBe(expectExpirationDate);
  });

  test('Дата окончания === текущая дата, если срок действия не завершен на текущую дату', () => {
    const period = makeMinMaxDates(startDate, expirationDateInFuture);
    expect(moment(period[0]).format(DATE_FORMAT)).toBe(expectStartDate);
    expect(moment(period[1]).format(DATE_FORMAT)).toBe(moment().format(DATE_FORMAT));
  });
});
