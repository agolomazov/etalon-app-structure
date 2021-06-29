/**
 * Метод преобразует обращение "Согласие на получение / Отказ от получения документов на бумажном носителе" в серверный формат
 *
 * @param {object} params входные параметры
 * @param {object} params.appealData данные по обращению
 *
 * @returns {object} объект, готовый к отправке на BE
 */
export const appealMapper = ({ appealData }) => {
  const { id, applicationFileId, powerOfAttorneyFileId } = appealData;
  return {
    appeals: [
      {
        id,
        applicationFileId,
        powerOfAttorneyFileId,
      },
    ],
  };
};
