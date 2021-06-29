import { SITUATION_APPEAL_TYPES } from '../../constants';

/**
 * Метод преобразует обращение "Внести изменения в характеристики арендованных объектов" в серверный формат
 *
 * @param {object} appeal данные по обращению
 * @param {object} appealFilesGroupedByAppealId файлы по обращению
 *
 * @returns {object} объект, готовый к отправке на BE
 */
export const mapAppealChangeDataToDto = (
  appeal,
  appealFilesGroupedByAppealId,
) => {
  const {
    id,
    contract,
    cadastralNumber,
    objectType,
    objectAdress,
    changeAdressValue,
    changeAreaValue,
    changePermisionType,
    changeCategoryValue,
    changeObjectIntendValue,
    changeCadastralValue,
    changeCommentValue,
  } = appeal;

  const fileId = appealFilesGroupedByAppealId[id]?.[0]?.fileId;

  return {
    appeals: [
      {
        id,
        contract: {
          id: contract.id,
          date: contract.date,
          number: contract.number,
        },
        facilityAddress: objectAdress || undefined,
        newFacilityAddress: changeAdressValue || undefined,
        cadastralNumber: cadastralNumber || undefined,
        facilityType: objectType.code || undefined,
        facilityArea: String(changeAreaValue) || undefined,
        permittedUse: changePermisionType || undefined,
        facilityCategory: changeCategoryValue.value || undefined,
        facilityPurpose: changeObjectIntendValue || undefined,
        newCadastralNumber: changeCadastralValue || undefined,
        comment: changeCommentValue.trim() || undefined,
        fileId,
      },
    ],
  };
};

/**
 * Метод преобразует обращение "Сообщить об отсутствии данных по арендованным объектам" в серверный формат
 *
 * @param {object} appeal данные по обращению
 *
 * @returns {object} объект, готовый к отправке на BE
 */
export const mapAppealMissingDataToDto = (appeal) => {
  const { contract, missingData, changeCommentValue, id } = appeal;

  return {
    appeals: [
      {
        id,
        contract: {
          id: contract.id,
          date: contract.date,
          number: contract.number,
        },
        missingFacilityData: missingData.missingData,
        comment: changeCommentValue.trim() || undefined,
      },
    ],
  };
};

/**
 * ## Объект с маппингом. Маппит обращения в серверный формат
 * @const
 * @type {object}
 */
const APPEAL_DTO_MAPPER = {
  [SITUATION_APPEAL_TYPES.CHANGE_OBJECT_INFO]: mapAppealChangeDataToDto,
  [SITUATION_APPEAL_TYPES.MISSING_DATA]: mapAppealMissingDataToDto,
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
