import { setServerDateFormat } from '@common/utils';

/**
 * Метод преобразует обращение "В личном кабинете отсутствует информация о моем договоре аренды" в серверный формат
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
    landlord: { id: landlordId } = {},
    contractNumber,
    contractDate,
    address: facilityRentalAddress,
    cadastralNumber,
    comment,
  } = appealData;

  const [{ fileId }] = appealFilesGroupedByAppealId[id];

  return {
    appeals: [
      {
        id,
        landlordId,
        contractNumber,
        facilityRentalAddress,
        contractDate: setServerDateFormat(contractDate),
        cadastralNumber: cadastralNumber.trim() || undefined,
        comment: comment.trim() || undefined,
        fileId,
      },
    ],
  };
};
