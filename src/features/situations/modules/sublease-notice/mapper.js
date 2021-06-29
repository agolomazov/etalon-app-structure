import { setServerDateFormat } from '@common/utils';

/**
 * Метод преобразует обращение "Уведомление о субаренде" в серверный формат
 *
 * @param {object} params входные параметры
 * @param {object} params.appealData данные по обращению
 * @param {object} params.appealFilesGroupedByAppealId файлы по обращению
 *
 * @returns {object} объект, готовый к отправке на BE
 */
export const appealMapper = ({ appealData, appealFilesGroupedByAppealId }) => {
  const {
    id,
    contract,
    subtenant,
    subtenantInn,
    subtenantContractNumber,
    subtenantContractDate,
    subtenantDatePeriod,
    comment,
  } = appealData;

  const fileIdList = appealFilesGroupedByAppealId[id]?.map(
    ({ fileId }) => fileId,
  );

  return {
    appeals: [
      {
        id,
        contract: {
          id: contract.id,
          date: contract.date,
          number: contract.number,
        },
        subtenant,
        subtenantInn,
        subleaseContract: {
          id: id.toString(),
          number: subtenantContractNumber,
          date: setServerDateFormat(subtenantContractDate),
        },
        subleaseContractDateFrom: setServerDateFormat(subtenantDatePeriod[0]),
        subleaseContractDateTo: setServerDateFormat(subtenantDatePeriod[1]),
        comment: comment.trim() || undefined,
        fileId: fileIdList[0],
      },
    ],
  };
};
