import { setServerDateFormat } from '@common/utils';

import { SITUATION_APPEAL_TYPES } from '../../constants';

/**
 * Метод преобразует обращение "Направить скан-копию подписанного акта сверки" в серверный формат
 *
 * @param {Array} appeals - массив обращения
 * @param {object} appealFilesGroupedByAppealId файлы по обращению
 *
 * @returns {object} Dto для отправки на BE
 */
const mapAppealsScannedActToDto = (appeals, appealFilesGroupedByAppealId) => {
  const appealsDto = appeals.map(
    ({ id, contractId, contractNumber, contractDate, datePeriod }) => ({
      id,
      contract: {
        id: contractId || undefined,
        number: contractNumber,
        date: setServerDateFormat(contractDate),
      },
      reconciliationActBeginDate: setServerDateFormat(datePeriod[0]),
      reconciliationActEndDate: setServerDateFormat(datePeriod[1]),
      fileId: appealFilesGroupedByAppealId[id]?.[0]?.fileId,
    }),
  );

  return {
    appeals: appealsDto,
  };
};

/**
 * Метод преобразует обращение "Запросить акт сверки" в серверный формат
 *
 * @param {Array} appeals - массив обращения
 *
 * @returns {object} Dto для отправки на BE
 */
const mapAppealsRequestActToDto = mapAppealsScannedActToDto;

/**
 * Метод преобразует обращение "Направить акт сверки и подписать ЭЦП" в серверный формат
 *
 * @param {Array} appeals - массив обращения
 *
 * @returns {object} Dto для отправки на BE
 */
const mapAppealsSignedActToDto = mapAppealsScannedActToDto;

/**
 * ## Объект с маппингом. Маппит обращения в серверный формат
 * @const
 * @type {object}
 */
const APPEAL_DTO_MAPPER = {
  signed: mapAppealsSignedActToDto,
  [SITUATION_APPEAL_TYPES.SCANNED_ACT]: mapAppealsScannedActToDto,
  [SITUATION_APPEAL_TYPES.REQUEST_ACT]: mapAppealsRequestActToDto,
};

/**
 * Метод преобразует обращения в серверный формат
 *
 * @param {object} params входные параметры
 * @param {object} params.appealData данные по обращению
 * @param {string} params.appealType тип обращения
 * @param {object} params.params.appealFilesGroupedByAppealId файлы по обращению
 *
 * @returns {object} объект, готовый к отправке на BE
 */
export const appealMapper = ({
  appealData,
  appealType,
  appealFilesGroupedByAppealId,
}) =>
  APPEAL_DTO_MAPPER[appealType]
    ? APPEAL_DTO_MAPPER[appealType](appealData, appealFilesGroupedByAppealId)
    : appealData;
