import { getUserFullName } from './index';

const nameOne = {
  lastName: 'Шлом',
  firstName: 'Анатолий',
  middleName: 'Михайлович',
}

const nameTwo = {
  lastName: 'Иванов',
  firstName: 'Иван',
  middleName: 'Иванович',
}

describe('getUserFullName - Метод преобразет объект с именем в удобный формат', () => {
  test('Простое преобразование объекта', () => {
    expect(getUserFullName(nameOne, true)).toBe('Анатолий Михайлович Шлом');
    expect(getUserFullName(nameTwo, true)).toBe('Иван Иванович Иванов');
  });
  test('Преобразование объекта с сокращением фамилии', () => {
    expect(getUserFullName(nameOne, false)).toBe('Анатолий Михайлович Ш.');
    expect(getUserFullName(nameOne)).toBe('Анатолий Михайлович Ш.');
    expect(getUserFullName(nameTwo)).toBe('Иван Иванович И.');
  });
});
