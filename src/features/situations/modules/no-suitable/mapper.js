/**
 * Метод преобразует обращение "Нет подходящей ЖС" в серверный формат
 *
 * @param {object} params входные параметры
 * @param {object} params.appealData данные по обращению
 * @param {object} params.appealFilesGroupedByAppealId файлы по обращению
 *
 * @returns {object} объект, готовый к отправке на BE
 */
export const appealMapper = ({ appealData, appealFilesGroupedByAppealId }) => {
  const { id, rosimOffice, appealTitle, appealBody } = appealData;

  const fileIdList = appealFilesGroupedByAppealId[id]?.map(
    ({ fileId }) => fileId,
  );

  return {
    appeals: [
      {
        id,
        landlordId: rosimOffice.id,
        appealSubject: appealTitle,
        appealText: appealBody,
        fileIdList: fileIdList?.length > 0 ? fileIdList : undefined,
      },
    ],
  };
};
