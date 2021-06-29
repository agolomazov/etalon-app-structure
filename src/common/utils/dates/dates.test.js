import moment from 'moment';
import {
  isDateAfter,
  isDateBefore,
  isDateSameOrBefore,
  isDateSameOrAfter,
  getFromToDate,
  setDateFormat,
  setServerDateFormat,
  setDateToServerDateFormat,
  setDateWideFormat,
  isDateBetween,
  isDateRangeBetween,
  getDateTime,
  isDateTimeAfter,
  isDateTimeBefore,
  getMonthStartDay,
  setCalendarMonthYearFormat,
  setCalendarShortWeekdayFormat,
  getDateObject,
} from './index';

moment.locale('ru');

const dateLaterOne = '2020-01-19';
const dateErlierOne = '2019-04-25';
const dateLaterTwo = '2011-01-24';
const dateErlierTwo = '2001-02-25';
const dateLaterThree = '1987-09-06';
const dateErlierThree = '1987-04-16';

const dateLaterOneUserFormat = '19.01.2020';
const dateErlierOneUserFormat = '25.04.2019';
const dateLaterTwoUserFormat = '24.01.2011';
const dateErlierTwoUserFormat = '25.02.2001';
const dateLaterThreeUserFormat = '06.09.1987';
const dateErlierThreeUserFormat = '16.04.1987';

const startDateRangeOne = '01.01.2007';
const endDateRangeOne = '27.01.2021';
const startDateRangeTwo = '01.01.2011';
const endDateRangeTwo = '24.01.2011';
const startDateRangeThree = '30.03.1985';
const endDateRangeThree = '20.12.1986';

const startDateOne = '2019-04-25';
const endDateOne = '2020-01-19';
const startDateTwo = '2010-01-05';
const endDateTwo = '2015-02-22';
const startDateThree = '1985-03-30';
const endDateThree = '1986-12-20';

const dateFirst = '2020-01-19';
const dateSecond = '2019-04-25';
const dateThird = '1987-09-06';

const dateTiemeFirst = '2020-07-10T07:13:57Z';
const dateTiemeSecond = '2019-07-10T07:13:59Z';
const dateTiemeThird = '2019-07-10T07:13:57Z';

const momentDateOne = moment('2019-10-10');
const momentDateTwo = moment('2013-01-14');
const momentDateThree = moment('2019-05-03');

describe('isDateAfter - Метод проверки если первая дата, позже второй', () => {
  test('Сравниваем две даты', () => {
    expect(isDateAfter(dateLaterOne, dateErlierOne)).toBeTruthy();
    expect(isDateAfter(dateLaterTwo, dateErlierTwo)).toBeTruthy();
    expect(isDateAfter(dateLaterThree, dateErlierThree)).toBeTruthy();
    expect(isDateAfter(dateErlierOne, dateLaterOne)).toBeFalsy();
    expect(isDateAfter(dateErlierTwo, dateLaterTwo)).toBeFalsy();
    expect(isDateAfter(dateErlierThree, dateLaterThree)).toBeFalsy();
    expect(isDateAfter(dateLaterTwo, dateLaterTwo)).toBeFalsy();
  });
});

describe('isDateSameOrAfter - Метод проверки если первая дата позже или равна второй в пользовательском формате', () => {
  test('Сравниваем две даты', () => {
    expect(
      isDateSameOrAfter(dateLaterOne, dateErlierOneUserFormat),
    ).toBeTruthy();
    expect(
      isDateSameOrAfter(dateLaterTwo, dateErlierTwoUserFormat),
    ).toBeTruthy();
    expect(
      isDateSameOrAfter(dateLaterThree, dateErlierThreeUserFormat),
    ).toBeTruthy();
    expect(
      isDateSameOrAfter(dateErlierOne, dateLaterOneUserFormat),
    ).toBeFalsy();
    expect(
      isDateSameOrAfter(dateErlierTwo, dateLaterTwoUserFormat),
    ).toBeFalsy();
    expect(
      isDateSameOrAfter(dateErlierThree, dateLaterThreeUserFormat),
    ).toBeFalsy();
    expect(
      isDateSameOrAfter(dateLaterTwo, dateLaterTwoUserFormat),
    ).toBeTruthy();
  });
});

describe('isDateBefore - Метод проверки если первая дата, раньше второй', () => {
  test('Сравниваем две даты', () => {
    expect(isDateBefore(dateErlierOne, dateLaterOne)).toBeTruthy();
    expect(isDateBefore(dateErlierTwo, dateLaterTwo)).toBeTruthy();
    expect(isDateBefore(dateErlierThree, dateLaterThree)).toBeTruthy();
    expect(isDateBefore(dateLaterOne, dateErlierOne)).toBeFalsy();
    expect(isDateBefore(dateLaterTwo, dateErlierTwo)).toBeFalsy();
    expect(isDateBefore(dateLaterThree, dateErlierThree)).toBeFalsy();
    expect(isDateBefore(dateErlierThree, dateErlierThree)).toBeFalsy();
  });
});

describe('isDateSameOrBefore - Метод проверки если первая дата, раньше или равна второй в пользовательском формате', () => {
  test('Сравниваем две даты', () => {
    expect(
      isDateSameOrBefore(dateErlierOne, dateLaterOneUserFormat),
    ).toBeTruthy();
    expect(
      isDateSameOrBefore(dateErlierTwo, dateLaterTwoUserFormat),
    ).toBeTruthy();
    expect(
      isDateSameOrBefore(dateErlierThree, dateLaterThreeUserFormat),
    ).toBeTruthy();
    expect(
      isDateSameOrBefore(dateLaterOne, dateErlierOneUserFormat),
    ).toBeFalsy();
    expect(
      isDateSameOrBefore(dateLaterTwo, dateErlierTwoUserFormat),
    ).toBeFalsy();
    expect(
      isDateSameOrBefore(dateLaterThree, dateErlierThreeUserFormat),
    ).toBeFalsy();
    expect(
      isDateSameOrBefore(dateErlierThree, dateErlierThreeUserFormat),
    ).toBeTruthy();
  });
});

describe('isDateBetween - Метод проверки если дата находится в диапазоне дат в пользовательском формате', () => {
  test('Проверяем дату в диапазоне', () => {
    expect(
      isDateBetween(dateErlierOne, startDateRangeOne, endDateRangeOne),
    ).toBeTruthy();
    expect(
      isDateBetween(dateLaterOne, startDateRangeOne, endDateRangeOne),
    ).toBeTruthy();
    expect(
      isDateBetween(dateErlierTwo, startDateRangeTwo, endDateRangeTwo),
    ).toBeFalsy();
    expect(
      isDateBetween(dateLaterTwo, startDateRangeTwo, endDateRangeTwo),
    ).toBeTruthy();
    expect(
      isDateBetween(dateErlierThree, startDateRangeThree, endDateRangeThree),
    ).toBeFalsy();
    expect(
      isDateBetween(dateLaterThree, startDateRangeThree, endDateRangeThree),
    ).toBeFalsy();
  });
});

describe('isDateRangeBetween - Метод проверки если диапозон дат находится в диапазоне дат в пользовательском формате', () => {
  test('Проверяем дату в диапазоне', () => {
    expect(
      isDateRangeBetween(
        startDateOne,
        endDateOne,
        startDateRangeOne,
        endDateRangeOne,
      ),
    ).toBeTruthy();
    expect(
      isDateRangeBetween(
        startDateTwo,
        endDateTwo,
        startDateRangeOne,
        endDateRangeOne,
      ),
    ).toBeTruthy();
    expect(
      isDateRangeBetween(
        startDateThree,
        endDateThree,
        startDateRangeThree,
        endDateRangeThree,
      ),
    ).toBeTruthy();
    expect(
      isDateRangeBetween(
        startDateThree,
        endDateTwo,
        startDateRangeOne,
        endDateRangeOne,
      ),
    ).toBeFalsy();
  });
});

describe('getFromToDate - Метод преобразет даты в строку "с... по..."', () => {
  test('Простое преобразование дат', () => {
    expect(getFromToDate(startDateOne, endDateOne)).toBe(
      'с 25.04.2019 по 19.01.2020',
    );
    expect(getFromToDate(startDateTwo, endDateTwo)).toBe(
      'с 05.01.2010 по 22.02.2015',
    );
    expect(getFromToDate(undefined, endDateTwo)).toBe('по 22.02.2015');
    expect(getFromToDate(startDateTwo)).toBe('с 05.01.2010 ');
  });
});

describe('setDateFormat - Метод преобразет дату полученую от сервера в читаемый единый формат', () => {
  test('Простое преобразование формата', () => {
    expect(setDateFormat(dateFirst)).toBe('19.01.2020');
    expect(setDateFormat(dateSecond)).toBe('25.04.2019');
    expect(setDateFormat(dateThird)).toBe('06.09.1987');
  });
});

describe('setServerDateFormat - Метод преобразет дату в формате ДД.ММ.ГГГГ в серверный формат', () => {
  test('Простое преобразование формата', () => {
    expect(setServerDateFormat('19.01.2020')).toBe('2020-01-19');
    expect(setServerDateFormat('25.04.2019')).toBe('2019-04-25');
    expect(setServerDateFormat('06.09.1987')).toBe('1987-09-06');
  });
});

describe('setDateToServerDateFormat - Метод преобразет дату в формате ДД.ММ.ГГГГ в серверный формат', () => {
  test('Простое преобразование формата', () => {
    expect(setDateToServerDateFormat(new Date(2020, 0, 19))).toBe('2020-01-19');
    expect(setDateToServerDateFormat(new Date(2019, 3, 25))).toBe('2019-04-25');
    expect(setDateToServerDateFormat(new Date(1987, 8, 6))).toBe('1987-09-06');
  });
});

describe('setDateWideFormat - Метод преобразет дату в формат "01 января 2020', () => {
  test('Простое преобразование формата', () => {
    expect(setDateWideFormat(dateFirst)).toBe('19 января 2020');
    expect(setDateWideFormat(dateSecond)).toBe('25 апреля 2019');
    expect(setDateWideFormat(dateThird)).toBe('6 сентября 1987');
  });
});

describe('getDateTime - Метод преобразует дату и время полученные от сервера в читаемый формат', () => {
  test('Должен вернуть дату и время в читаемом формате', () => {
    expect(getDateTime('2020-07-11T01:50:57Z')).toBe('11.07.2020 в 04:50');
    expect(getDateTime('2020-07-11T07:11:57Z')).toBe('11.07.2020 в 10:11');
    expect(getDateTime('2019-01-24T12:14:00Z')).toBe('24.01.2019 в 15:14');
    expect(getDateTime('1987-09-06T18:24:22Z')).toBe('06.09.1987 в 22:24');
  });
});

describe('isDateTimeAfter - Метод проверяет если первая дата и время позже второй', () => {
  test('Должен вернуть корректный boolean', () => {
    expect(isDateTimeAfter(dateTiemeFirst, dateTiemeSecond)).toBeTruthy();
    expect(isDateTimeAfter(dateTiemeFirst, dateTiemeThird)).toBeTruthy();
    expect(isDateTimeAfter(dateTiemeSecond, dateTiemeFirst)).toBeFalsy();
    expect(isDateTimeAfter(dateTiemeSecond, dateTiemeThird)).toBeTruthy();
    expect(isDateTimeAfter(dateTiemeThird, dateTiemeFirst)).toBeFalsy();
    expect(isDateTimeAfter(dateTiemeThird, dateTiemeSecond)).toBeFalsy();
  });
});

describe('isDateTimeBefore - Метод проверяет если первая дата и время раньше второй', () => {
  test('Должен вернуть корректный boolean', () => {
    expect(isDateTimeBefore(dateTiemeFirst, dateTiemeSecond)).toBeFalsy();
    expect(isDateTimeBefore(dateTiemeFirst, dateTiemeThird)).toBeFalsy();
    expect(isDateTimeBefore(dateTiemeSecond, dateTiemeFirst)).toBeTruthy();
    expect(isDateTimeBefore(dateTiemeSecond, dateTiemeThird)).toBeFalsy();
    expect(isDateTimeBefore(dateTiemeThird, dateTiemeFirst)).toBeTruthy();
    expect(isDateTimeBefore(dateTiemeThird, dateTiemeSecond)).toBeTruthy();
  });
});

describe('getDateObject - Метод возвращает первый день месяца от заданной даты', () => {
  test('Должен вернуть корректную дату', () => {
    expect(getDateObject(momentDateOne)).toStrictEqual(
      new Date('2019', '09', '10'),
    );
    expect(getDateObject(momentDateTwo)).toStrictEqual(
      new Date('2013', '00', '14'),
    );
    expect(getDateObject(momentDateThree)).toStrictEqual(
      new Date('2019', '04', '03'),
    );
  });
});

describe('getMonthStartDay - Метод возвращает первый день месяца от заданной даты', () => {
  test('Должен вернуть корректную дату', () => {
    expect(getMonthStartDay(momentDateOne)).toStrictEqual(
      new Date('2019', '09', '01'),
    );
    expect(getMonthStartDay(momentDateTwo)).toStrictEqual(
      new Date('2013', '00', '01'),
    );
    expect(getMonthStartDay(momentDateThree)).toStrictEqual(
      new Date('2019', '04', '01'),
    );
  });
});

describe('setCalendarMonthYearFormat - Метод возвращает отформатированные месяц и год', () => {
  test('Должен вернуть корректные месяц и год', () => {
    expect(setCalendarMonthYearFormat('2019-10-02')).toBe('октябрь 2019');
    expect(setCalendarMonthYearFormat('2021-11-04')).toBe('ноябрь 2021');
    expect(setCalendarMonthYearFormat('2000-09-30')).toBe('сентябрь 2000');
    expect(setCalendarMonthYearFormat('2009-01-01')).toBe('январь 2009');
  });
});

describe('setCalendarShortWeekdayFormat - Метод возвращает отформатированные день недели', () => {
  test('Должен вернуть корректный день недели', () => {
    expect(setCalendarShortWeekdayFormat('2021-02-22')).toBe('пн');
    expect(setCalendarShortWeekdayFormat('2021-02-23')).toBe('вт');
    expect(setCalendarShortWeekdayFormat('2021-02-24')).toBe('ср');
    expect(setCalendarShortWeekdayFormat('2021-02-25')).toBe('чт');
    expect(setCalendarShortWeekdayFormat('2021-02-26')).toBe('пт');
    expect(setCalendarShortWeekdayFormat('2021-02-27')).toBe('сб');
    expect(setCalendarShortWeekdayFormat('2020-01-05')).toBe('вс');
  });
});
