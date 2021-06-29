/**
 * Метод извлекает код ошибки КриптоПро из сообщения об ошибки
 *
 * @param {string} errorMessage - текст ошибки
 *
 * @returns {string} код ошибки или пустая строка
 */
export const extractCryptoProErrorCode = (errorMessage = '') => {
  const [errorCode = ''] = errorMessage.match(/0[Xx][\dA-Fa-f]{8,8}/) || [];

  return errorCode;
};
