import moment from 'moment';

import {
  getFileExtension,
  getFileName,
  formatFileSize,
  isFileDuplicate,
  deleteFileFromArray,
  addDateToFileName,
} from './index';

const fileArray = [
  { path: '2.pdf', name: '2.pdf', lastModified: 1595239341258, size: 1024 },
  { path: '3.pdf', name: '3.pdf', lastModified: 1595239358528, size: 0 },
  {
    path: '1 — копия.pdf',
    name: '1 — копия.pdf',
    lastModified: 1595239329404,
    size: 1000000,
  },
  {
    path: 'Анкета.pdf',
    name: 'Анкета.pdf',
    lastModified: 1595184356986,
    size: 1209381,
  },
];
const fileArrayOne = [
  { path: '2.pdf', name: '2.pdf', lastModified: 1595239341258, size: 1024 },
  { path: '3.pdf', name: '3.pdf', lastModified: 1595239358528, size: 0 },
  {
    path: 'Анкета.pdf',
    name: 'Анкета.pdf',
    lastModified: 1595184356986,
    size: 1209381,
  },
];
const fileArrayTwo = [
  { path: '2.pdf', name: '2.pdf', lastModified: 1595239341258, size: 1024 },
  { path: '3.pdf', name: '3.pdf', lastModified: 1595239358528, size: 0 },
  {
    path: '1 — копия.pdf',
    name: '1 — копия.pdf',
    lastModified: 1595239329404,
    size: 1000000,
  },
];

const fileOne = {
  path: '3.pdf',
  name: '3.pdf',
  lastModified: 1595259358528,
  size: 0,
};
const fileTwo = {
  path: '221.pdf',
  name: '221.pdf',
  lastModified: 1595239341258,
  size: 1024,
};
const fileCopy = {
  path: '1 — копия.pdf',
  name: '1 — копия.pdf',
  lastModified: 1595239329404,
  size: 1000000,
};
const fileCopyToo = {
  path: 'Анкета.pdf',
  name: 'Анкета.pdf',
  lastModified: 1595184356986,
  size: 1209381,
};
const today = moment().format('DD.MM.YYYY');

describe('getFileExtension - Метод получает расширение имени файла', () => {
  test('Должен вернуть корректное значение', () => {
    expect(getFileExtension('test.jpg')).toBe('.jpg');
    expect(getFileExtension('one-more-test.pdf')).toBe('.pdf');
    expect(getFileExtension('still.testing')).toBe('.testing');
    expect(getFileExtension('test.my.function.txt')).toBe('.txt');
    expect(getFileExtension('test')).toBe('');
  });
});

describe('getFileName - Метод получает имени файла без расширения', () => {
  test('Должен вернуть корректное значение', () => {
    expect(getFileName('test.jpg')).toBe('test');
    expect(getFileName('one-more-test.pdf')).toBe('one-more-test');
    expect(getFileName('still.testing')).toBe('still');
    expect(getFileName('test.my.function.txt')).toBe('test.my.function');
    expect(getFileName('test')).toBe('test');
  });
});

describe('formatFileSize - Форматирует размер файла в читаемый формат', () => {
  test('Должен вернуть корректное значение', () => {
    expect(formatFileSize(0)).toBe('0 Б');
    expect(formatFileSize(1024)).toBe('1.00 КБ');
    expect(formatFileSize(1024 * 1024)).toBe('1.00 МБ');
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1.00 ГБ');
  });
});

describe('isFileDuplicate - Проверяет есть ли объект в массив файлов', () => {
  test('Должен вернуть корректное значение', () => {
    expect(isFileDuplicate(fileArray, fileOne)).toBeFalsy();
    expect(isFileDuplicate(fileArray, fileTwo)).toBeFalsy();
    expect(isFileDuplicate(fileArray, fileCopy)).toBeTruthy();
    expect(isFileDuplicate(fileArray, fileCopyToo)).toBeTruthy();
  });
});

describe('deleteFileFromArray - Удаляет объект из массива файлов', () => {
  test('Должен вернуть корректный масив', () => {
    expect(deleteFileFromArray(fileArray, fileCopy)).toStrictEqual(
      fileArrayOne,
    );
    expect(deleteFileFromArray(fileArray, fileCopyToo)).toStrictEqual(
      fileArrayTwo,
    );
    expect(deleteFileFromArray(fileArray, fileOne)).toStrictEqual(fileArray);
    expect(deleteFileFromArray(fileArray, fileTwo)).toStrictEqual(fileArray);
  });
});

describe('addDateToFileName - формирует имя файла и добавляет в него текущую дату', () => {
  test('Должен вернуть корректное значение', () => {
    expect(addDateToFileName('квитанция', 'pdf')).toBe(
      `квитанция_${today}.pdf`,
    );
    expect(addDateToFileName('test', 'txt')).toBe(`test_${today}.txt`);
    expect(addDateToFileName('', '')).toBe(`_${today}.`);
    expect(addDateToFileName('')).toBe(`_${today}.pdf`);
    expect(addDateToFileName('test')).toBe(`test_${today}.pdf`);
    expect(addDateToFileName()).toBe(`документ_${today}.pdf`);
  });
});
