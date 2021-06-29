import { SITUATION_APPEAL_TYPES } from '../../constants';

/**
 * Метод преобразует обращение "Смена юридического адреса/КПП" в серверный формат
 *
 * @param {object} appeal - объект с полями обращения
 * @param {Array} fileIdList - массив с вложениями
 *
 * @returns {object} Dto для отправки на BE
 */
const mapAppealChangeJuridicalAddressToDto = (appeal, fileIdList) => {
  const { id, comment } = appeal;

  return {
    appeals: [
      {
        id,
        comment: comment.trim() || undefined,
        fileIdList,
      },
    ],
  };
};

/**
 * Метод преобразует обращение "Смена организационно-правовой формы/ИНН" в серверный формат
 *
 * @param {object} appeal - объект с полями обращения
 *
 * @returns {object} Dto для отправки на BE
 */
const mapAppealChangeJuridicalInnToDto = mapAppealChangeJuridicalAddressToDto;

/**
 * Метод преобразует обращение "Смена наименования ЮЛ" в серверный формат
 *
 * @param {object} appeal - объект с полями обращения
 *
 * @returns {object} Dto для отправки на BE
 */
const mapAppealChangeJuridicalNameToDto = mapAppealChangeJuridicalAddressToDto;

/**
 * Метод преобразует обращение "Смена контактных данных" в серверный формат
 *
 * @param {object} appeal - объект с полями обращения
 *
 * @returns {object} Dto для отправки на BE
 */
const mapAppealChangeJuridicalContactsToDto = (appeal) => {
  const { id, tel, email, comment } = appeal;

  return {
    appeals: [
      {
        id,
        phone: tel ? `+7${tel}` : undefined,
        email: email.trim() || undefined,
        comment: comment.trim() || undefined,
      },
    ],
  };
};

/**
 * Метод преобразует обращение "Смена руководителя" в серверный формат
 *
 * @param {object} appeal - объект с полями обращения
 * @param {Array} fileIdList - массив с вложениями
 *
 * @returns {object} Dto для отправки на BE
 */
const mapAppealChangeJuridicalLeaderToDto = (appeal, fileIdList) => {
  const {
    id,
    name: firstName,
    surname: lastName,
    patronymic,
    comment,
  } = appeal;

  return {
    appeals: [
      {
        id,
        name: {
          firstName,
          lastName,
          middleName: patronymic.trim() || undefined,
        },
        comment: comment.trim() || undefined,
        fileIdList,
      },
    ],
  };
};

/**
 * ## Объект с маппингом. Маппит обращения в серверный формат
 * @const
 * @type {object}
 */
/* eslint-disable max-len */
const APPEAL_DTO_MAPPER = {
  [SITUATION_APPEAL_TYPES.CHANGE_DETAILS_JURIDICAL_ADDRESS]: mapAppealChangeJuridicalAddressToDto,
  [SITUATION_APPEAL_TYPES.CHANGE_DETAILS_JURIDICAL_INN]: mapAppealChangeJuridicalInnToDto,
  [SITUATION_APPEAL_TYPES.CHANGE_DETAILS_JURIDICAL_NAME]: mapAppealChangeJuridicalNameToDto,
  [SITUATION_APPEAL_TYPES.CHANGE_DETAILS_JURIDICAL_CONTACTS]: mapAppealChangeJuridicalContactsToDto,
  [SITUATION_APPEAL_TYPES.CHANGE_DETAILS_JURIDICAL_LEADER]: mapAppealChangeJuridicalLeaderToDto,
};
/* eslint-enable max-len */

/**
 * Метод преобразует обращения в серверный формат
 *
 * @param {object} params входные параметры
 * @param {object} params.appealData данные по обращению
 * @param {string} params.appealType тип обращения, одно из SITUATION_APPEAL_TYPES.CHANGE_DETAILS_JURIDICAL_...
 * @param {object} params.appealFilesGroupedByAppealId файлы по обращению
 *
 * @returns {object} объект, готовый к отправке на BE
 */
export const appealMapper = ({
  appealData,
  appealType,
  appealFilesGroupedByAppealId,
}) => {
  const fileIdList = appealFilesGroupedByAppealId[appealData.id]?.map(
    ({ fileId }) => fileId,
  );

  return APPEAL_DTO_MAPPER[appealType]
    ? APPEAL_DTO_MAPPER[appealType](appealData, fileIdList)
    : appealData;
};
