import { setServerDateFormat } from '@common/utils';
import { SITUATION_APPEAL_TYPES } from '../../constants';

/**
 * Метод преобразует общие поля обращения
 *
 * @param {object} appeal - объект с полями обращения
 * @param {object} appealFilesGroupedByAppealId файлы по обращению
 *
 * @returns {object} объект с общими полями в серверном формате
 */
const mapAppealGeneralFields = (appeal, appealFilesGroupedByAppealId) => {
  const {
    id,
    complaintReason: complaintCause,
    userDemand: demands,
    rosimOffice: { id: landlordId },
  } = appeal;

  const fileIdList = appealFilesGroupedByAppealId[id]?.map(
    ({ fileId }) => fileId,
  );

  return {
    id,
    complaintCause,
    demands,
    landlordId,
    fileIdList: fileIdList?.length > 0 ? fileIdList : undefined,
  };
};

/**
 * Метод преобразует обращение "Жалоба на акт (документ)" в серверный формат
 *
 * @param {object} appeal - объект с полями обращения
 * @param {object} appealFilesGroupedByAppealId файлы по обращению
 *
 * @returns {object} Dto для отправки на BE
 */
const mapAppealComplaintDocumentToDto = (
  appeal,
  appealFilesGroupedByAppealId,
) => {
  const { documentNumber, documentDate } = appeal;

  return {
    appeals: [
      {
        ...mapAppealGeneralFields(appeal, appealFilesGroupedByAppealId),
        documentNumber,
        documentDate: setServerDateFormat(documentDate),
      },
    ],
  };
};

/**
 * Метод преобразует обращение "Жалоба на действие/бездействие должностных лиц" в серверный формат
 *
 * @param {object} appeal - объект с полями обращения
 * @param {object} appealFilesGroupedByAppealId файлы по обращению
 *
 * @returns {object} Dto для отправки на BE
 */
const mapAppealComplaintActionToDto = (
  appeal,
  appealFilesGroupedByAppealId,
) => ({
  appeals: [
    {
      ...mapAppealGeneralFields(appeal, appealFilesGroupedByAppealId),
    },
  ],
});

/**
 * ## Объект с маппингом. Маппит обращения в серверный формат
 * @const
 * @type {object}
 */
const APPEAL_DTO_MAPPER = {
  [SITUATION_APPEAL_TYPES.COMPLAINT_DOCUMENT]: mapAppealComplaintDocumentToDto,
  [SITUATION_APPEAL_TYPES.COMPLAINT_ACTION]: mapAppealComplaintActionToDto,
};

/**
 * Метод преобразует обращения в серверный формат
 *
 * @param {object} params входные параметры
 * @param {object} params.appealData данные по обращению
 * @param {string} params.appealType тип обращения, одно из SITUATION_APPEAL_TYPES.COMPLAINT_...
 * @param {object} params.appealFilesGroupedByAppealId файлы по обращению
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
