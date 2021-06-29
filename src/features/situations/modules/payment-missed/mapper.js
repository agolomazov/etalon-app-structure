import { setServerDateFormat } from '@common/utils';

/**
 * Метод преобразует обращение "Отсутствует платеж по договору аренды" в серверный формат
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
    contractNumber,
    contractDate,
    contractId,
    payer: payerName,
    paymentOrderNumber,
    paymentOrderDate,
    paymentAmount,
    paymentPeriod,
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
          id: contractId || undefined,
          date: setServerDateFormat(contractDate),
          number: contractNumber,
        },
        payerName,
        paymentOrder: {
          number: Number(paymentOrderNumber),
          date: setServerDateFormat(paymentOrderDate),
        },
        paymentAmount,
        paymentPeriod,
        comment: comment.trim() || undefined,
        fileId: fileIdList[0],
      },
    ],
  };
};
