/**
 * ## Метод формирования имени пользователя
 * @example
 * getUserFullName(name, false);
 *
 * @param {object} name - объект с именем арендатора
 * {firstName:'Имя', lastName:'фамилия',middleName: 'отчество'}
 * @param {boolean} isFull - false - сокращает фамилию до 1 буквы, true - полное ФИО
 *
 * @returns {string} имя в формате "Иван Иванович И." или "Иван Иванович Иванов"
 */
export const getUserFullName = (name, isFull) =>
  `${name.firstName}${name.middleName ? ` ${name.middleName}` : ``} ${
    isFull ? name.lastName : `${name.lastName[0]}.`
  }`;
