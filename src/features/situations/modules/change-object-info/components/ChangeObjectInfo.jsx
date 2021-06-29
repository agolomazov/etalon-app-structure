/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { useActions } from '@common/hooks';
import { getUiMessages } from '@common/messages';
import {
  NumberPrefixInputRender,
  LabeledField,
  SubmitButton,
} from '@common/components';
import { setDateFormat, getDictionaryText } from '@common/utils';

import { SITUATION_TYPES } from '../../../constants';

import {
  LifeSituation,
  LifeSituationWrapper,
  LifeSituationMain,
  LifeSituationFooter,
  MultiSelectTagsUnionRender,
} from '../../../components';
import { useLifeSituationSubmit } from '../../../hooks';
import { AttachmentDrop } from '../../attachments';
import {
  APPEAL_FIELDS,
  LAND_CATEGORY,
  CHANGES_OPTIONS,
  APPEAL_TYPES,
  APPEAL_TYPE_MAP,
  APPEAL_DROPDOWN_ITEMS,
} from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';
import { appealMapper } from '../mapper';

/**
 * ## Компонент ЖС "Внести изменения в характеристики арендованных объектов"
 *
 * @example
 * <ChangeObjectInfo
 *   contracts={contracts}
 *   facilityRentalTypes={facilityRentalTypes}
 *   objectsList={objectsList}
 * />
 * @param {Object} props - Параметры компонента
 * @param {Array} props.contracts - список договоров
 * @param {Array} props.facilityRentalTypes - типы объектов аренды
 * @param {Array} props.objectsList - список объектов аренды
 *
 * @returns {React.FC} Компонент ЖС "Внести изменения в характеристики арендованных объектов"
 */
export const ChangeObjectInfo = ({
  contracts = [],
  objectsList = [],
  facilityRentalTypes,
}) => {
  const {
    setAppealField,
    chooseAppealTypeFlow,
    setContract,
    situationOnContractChangeFlow,
  } = useActions(actions);
  const appealType = useSelector(selectors.appealType);
  const contract = useSelector(selectors.appealContract) || {};
  const { missingDataExists = false, missingData = {} } = useSelector(
    selectors.appealMissingData,
  );
  const {
    id: appealId,
    objectAdress,
    cadastralNumber,
    objectType,
    changeAdressValue,
    changeAreaValue,
    changePermisionType,
    changeCategoryValue,
    changeObjectIntendValue,
    changeCommentValue,
    changeCadastralValue,
  } = useSelector(selectors.appeal);
  const isSomethingLoading = useSelector(selectors.isSomethingLoading);

  const [contractNumber, setContractNumber] = useState('');

  useEffect(() => {
    if (contract?.number) {
      setContractNumber(contract.number);
    }
  }, [contract]);

  const onChangeAppealField = useCallback((e) => {
    const { name, value } = e.component;
    setAppealField(name, value);
  }, []);

  const onAppealTypeChange = useCallback((e) => {
    chooseAppealTypeFlow(e.component.value.type);
  }, []);

  const onChangeDocumentNumber = useCallback((e) => {
    const { value, suggestion } = e.component;
    setContractNumber(value);
    setContract(suggestion);
    if (suggestion) {
      situationOnContractChangeFlow();
    }
  }, []);

  const onChangeObjectAddress = useCallback(
    (e) => {
      const { name, value, suggestion } = e.component;
      setAppealField(name, value);
      if (suggestion) {
        const { address, typeId } = suggestion;
        setAppealField(APPEAL_FIELDS.objectAdress, address);
        setAppealField(
          APPEAL_FIELDS.cadastralNumber,
          suggestion.cadastralNumber,
        );

        setAppealField(APPEAL_FIELDS.objectType, {
          code: typeId,
          name: getDictionaryText(facilityRentalTypes, typeId, typeId),
        });
      } else {
        setAppealField(APPEAL_FIELDS.address, null);
        setAppealField(APPEAL_FIELDS.cadastralNumber, null);
        setAppealField(APPEAL_FIELDS.objectType, '');
      }
    },
    [facilityRentalTypes],
  );

  const [multiSelectValue, setMultiSelectValue] = React.useState([]);
  const [fieldsList, setFieldsList] = React.useState([]);
  const [isMultiSelectOpen, setIsMultiSelectOpen] = React.useState(false);

  const handleChange = (ev) => setMultiSelectValue(ev.component.value);

  useEffect(() => {
    if (!isMultiSelectOpen) {
      setFieldsList(multiSelectValue);
    }
  }, [multiSelectValue, isMultiSelectOpen]);

  const handleClear = () => {
    setMultiSelectValue([]);
    setFieldsList([]);
    setIsMultiSelectOpen(false);
  };

  const handleSubmitMultiselect = () => {
    setFieldsList(multiSelectValue);
    setIsMultiSelectOpen(false);
  };

  const onSubmit = useLifeSituationSubmit({
    appealIds: [appealId],
    appealType: APPEAL_TYPE_MAP[appealType]?.situationAppealType,
    appealSelector: selectors.appeal,
    appealMapper,
  });
  const shouldRenderField = (label) => fieldsList.includes(label);

  const isAddressMatches =
    objectsList.filter((el) => el.address === objectAdress).length > 0;

  const requiredMessage = getUiMessages('requiredMessage');

  return (
    <LifeSituation
      lifeSituationType={SITUATION_TYPES.CHANGE_OBJECT_INFO}
      afterCreateLifeSituationAction={actions.afterCreateLifeSituationFlow}
      beforeExitLifeSituationAction={actions.beforeExitLifeSituationFlow}
    >
      <LifeSituationWrapper>
        <LifeSituationMain>
          <L.H6 className="margin-bottom-12">
            1. Выберите арендованный объект, характеристики которого требуют
            уточнений
          </L.H6>
          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-32">
            <LabeledField label="Номер договора">
              <L.AutoComplete
                className="width-55 padding-right-8"
                inputRender={NumberPrefixInputRender}
                isRequired
                requiredMessage={requiredMessage}
                shouldCorrectValue
                form="changeRentInfo"
                name={APPEAL_FIELDS.documentNumber}
                data={contracts}
                textField="number"
                value={contractNumber}
                onChange={onChangeDocumentNumber}
                maxLength={20}
              />
            </LabeledField>
            <LabeledField label="Дата договора">
              <L.DatePicker
                className="input-xs"
                placeholder="дд.мм.гггг"
                isDisabled
                isRequired
                requiredMessage={requiredMessage}
                form="changeRentInfo"
                name={APPEAL_FIELDS.documentDate}
                value={contract.date ? setDateFormat(contract.date) : null}
                onChange={onChangeAppealField}
              />
            </LabeledField>
            <LabeledField label="Выберите действие">
              <L.DropDownSelect
                className="width-55 padding-right-8 margin-bottom-16"
                placeholder="Выберите"
                data={APPEAL_DROPDOWN_ITEMS}
                isDisabled={!missingDataExists || contractNumber === ''}
                textField="displayText"
                value={APPEAL_TYPE_MAP[appealType]}
                onChange={onAppealTypeChange}
                form="changeRentInfo"
                name="appealType"
                isRequired
                requiredMessage={requiredMessage}
              />
            </LabeledField>
            <LabeledField
              label="Отсутствующая информация"
              shouldRender={appealType === APPEAL_TYPES.MISSING_DATA}
            >
              <L.Dl
                className="list
                          w-40
                          padding-x-16
                          padding-top-16
                          padding-bottom-8
                          secondary
                          width-80
                          margin-bottom-none"
              >
                {missingData.address && (
                  <>
                    <L.Dt>Адрес: </L.Dt>
                    <L.Dd>{missingData.address}</L.Dd>
                  </>
                )}
                {missingData.area && (
                  <>
                    <L.Dt>Площадь: </L.Dt>
                    <L.Dd>{missingData.area}</L.Dd>
                  </>
                )}
                {missingData.cadastralNumber && (
                  <>
                    <L.Dt>Кадастровый номер: </L.Dt>
                    <L.Dd>{missingData.cadastralNumber}</L.Dd>
                  </>
                )}
              </L.Dl>
            </LabeledField>
            <LabeledField
              label="Комментарий"
              shouldRender={appealType === APPEAL_TYPES.MISSING_DATA}
            >
              <L.Textarea
                name={APPEAL_FIELDS.changeCommentValue}
                form="changeRentInfo"
                placeholder="Текст сообщения"
                value={changeCommentValue}
                onChange={onChangeAppealField}
                maxLength={1000}
              />
            </LabeledField>
            {appealType === APPEAL_TYPES.CHANGE_INFO && (
              <>
                <LabeledField label="Адрес объекта">
                  <L.AutoComplete
                    placeholder="Введите адрес объекта"
                    isDisabled={!contract.id}
                    isRequired
                    requiredMessage={requiredMessage}
                    form="changeRentInfo"
                    data={objectsList}
                    textField="address"
                    name={APPEAL_FIELDS.objectAdress}
                    value={objectAdress}
                    onChange={onChangeObjectAddress}
                    maxLength={1000}
                  />
                  <L.Div className="width-80 margin-top-4 txt-gray">
                    Начните вводить адрес. В случае его отсутствия в
                    предложенном списке, введите его собственноручно в
                    соответствии с договором.
                  </L.Div>
                </LabeledField>
                <LabeledField
                  shouldRender={isAddressMatches}
                  label="Кадастровый номер"
                >
                  <L.Input
                    className="width-35"
                    form="changeRentInfo"
                    validator="cadastralNumber"
                    name={APPEAL_FIELDS.cadastralNumber}
                    value={cadastralNumber}
                    onChange={onChangeAppealField}
                    isDisabled
                  />
                </LabeledField>
                <LabeledField label="Тип объекта">
                  <L.DropDownSelect
                    className="width-35"
                    placeholder="Введите"
                    form="changeRentInfo"
                    data={facilityRentalTypes}
                    textField="name"
                    name={APPEAL_FIELDS.objectType}
                    value={objectType}
                    onChange={onChangeAppealField}
                    isRequired
                    requiredMessage={requiredMessage}
                    isDisabled={isAddressMatches || !contract.id}
                  />
                </LabeledField>
              </>
            )}
          </L.Dl>
          {appealType === APPEAL_TYPES.CHANGE_INFO && (
            <>
              <L.H6 className="margin-bottom-12">
                2. Укажите характеристики, которые требуют внесения изменений
              </L.H6>
              <L.Dl className="list form w-30 margin-bottom-32">
                <LabeledField label="Характеристики объекта">
                  <L.MultiSelect
                    name={APPEAL_FIELDS.changesSelect}
                    className="width-100"
                    form="changeRentInfo"
                    data={
                      objectType.code === 'LAND_PLOT'
                        ? CHANGES_OPTIONS.LAND_PLOT
                        : CHANGES_OPTIONS.OBJECT
                    }
                    value={multiSelectValue}
                    onClick={() => setIsMultiSelectOpen(!isMultiSelectOpen)}
                    placeholder="Выберите характеристики"
                    maxTags={4}
                    isRequired
                    requiredMessage={requiredMessage}
                    shouldKeepSuggestions
                    shouldSelectedGoFirst
                    shouldHideInput
                    canSelectAll
                    isOpen={isMultiSelectOpen}
                    onChange={handleChange}
                    onBlur={() => setIsMultiSelectOpen(false)}
                    onFocus={() => setIsMultiSelectOpen(true)}
                    hasCheckBoxes
                    tagsUnionRender={MultiSelectTagsUnionRender}
                    listRender={({ elementProps }) => (
                      <>
                        <L.Ul {...elementProps} />
                        <L.Ul className="list-h inner-16 txt-right border-top">
                          <L.Li>
                            <L.Button
                              className="blank more"
                              onClick={handleClear}
                            >
                              {getUiMessages('btnClearList')}
                            </L.Button>
                          </L.Li>
                          <L.Li>
                            <L.Button
                              className="success"
                              onClick={handleSubmitMultiselect}
                            >
                              {getUiMessages('btnSelect')}
                            </L.Button>
                          </L.Li>
                        </L.Ul>
                      </>
                    )}
                  />
                </LabeledField>
                <LabeledField
                  label="Новый адрес объекта"
                  shouldRender={shouldRenderField('Адрес объекта')}
                >
                  <L.Input
                    form="changeRentInfo"
                    name={APPEAL_FIELDS.changeAdressValue}
                    placeholder="Введите новый адрес"
                    value={
                      changeAdressValue !== null
                        ? changeAdressValue
                        : objectAdress
                    }
                    onChange={onChangeAppealField}
                    isRequired
                    requiredMessage={requiredMessage}
                    maxLength={1000}
                  />
                </LabeledField>
                <LabeledField
                  label="Новый кадастровый номер"
                  shouldRender={shouldRenderField('Кадастровый номер')}
                >
                  <L.Input
                    className="width-35"
                    name={APPEAL_FIELDS.changeCadastralValue}
                    form="changeRentInfo"
                    placeholder="Введите новый кадастровый номер"
                    value={changeCadastralValue}
                    onChange={onChangeAppealField}
                    validator="cadastralNumber"
                    isRequired
                    requiredMessage={requiredMessage}
                  />
                </LabeledField>
                <LabeledField
                  label="Площадь"
                  shouldRender={shouldRenderField('Площадь')}
                >
                  <L.NumericTextBox
                    form="changeRentInfo"
                    name={APPEAL_FIELDS.changeAreaValue}
                    format="#.####"
                    placeholder="Введите"
                    className="width-30"
                    value={Number(changeAreaValue)}
                    onChange={onChangeAppealField}
                    isRequired
                    requiredMessage={requiredMessage}
                    min="0.0001"
                    inputRender={({ Element, elementProps }) => (
                      <>
                        <Element
                          {...elementProps}
                          className="autocomplete-input
                                    padding-right-none
                                    txt-right"
                        />
                        <L.Span
                          className="input-addon
                                    shrink-0
                                    margin-left-4
                                    margin-right-8
                                    txt-gray"
                        >
                          кв. м
                        </L.Span>
                      </>
                    )}
                  />
                </LabeledField>
                <LabeledField
                  label="Вид разрешенного использования"
                  shouldRender={shouldRenderField(
                    'Вид разрешенного использования',
                  )}
                >
                  <L.Textarea
                    form="changeRentInfo"
                    placeholder="Введите"
                    name={APPEAL_FIELDS.changePermisionType}
                    value={changePermisionType}
                    onChange={onChangeAppealField}
                    isRequired
                    requiredMessage={requiredMessage}
                    maxLength={255}
                  />
                </LabeledField>
                <LabeledField
                  label="Категория"
                  shouldRender={shouldRenderField('Категория')}
                >
                  <L.DropDownSelect
                    form="changeRentInfo"
                    name={APPEAL_FIELDS.changeCategoryValue}
                    placeholder="Выберите"
                    data={LAND_CATEGORY}
                    textField="name"
                    value={changeCategoryValue}
                    onChange={onChangeAppealField}
                    isRequired
                    requiredMessage={requiredMessage}
                  />
                </LabeledField>
                <LabeledField
                  label="Назначение объекта"
                  shouldRender={shouldRenderField('Назначение объекта')}
                >
                  <L.Input
                    form="changeRentInfo"
                    name={APPEAL_FIELDS.changeObjectIntendValue}
                    placeholder="Введите назначение объекта"
                    value={changeObjectIntendValue}
                    onChange={onChangeAppealField}
                    isRequired
                    requiredMessage={requiredMessage}
                    maxLength={255}
                  />
                </LabeledField>
                <LabeledField
                  label="Документ"
                  description="Загрузите скан-копии документов, подтверждающих
                  изменение данных"
                >
                  <AttachmentDrop
                    appealId={appealId}
                    form="changeRentInfo"
                    name={APPEAL_FIELDS.file}
                  />
                </LabeledField>
                <LabeledField label="Комментарий">
                  <L.Textarea
                    name={APPEAL_FIELDS.changeCommentValue}
                    form="changeRentInfo"
                    placeholder="Текст сообщения"
                    value={changeCommentValue}
                    onChange={onChangeAppealField}
                    maxLength={1000}
                  />
                </LabeledField>
              </L.Dl>
            </>
          )}
        </LifeSituationMain>
        <LifeSituationFooter>
          <SubmitButton
            _success
            isDisabled={isSomethingLoading}
            form="changeRentInfo"
            onClick={onSubmit}
          >
            {getUiMessages('btnSubmit')}
          </SubmitButton>
        </LifeSituationFooter>
      </LifeSituationWrapper>
    </LifeSituation>
  );
};
