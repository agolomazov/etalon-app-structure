import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';
import { useActions } from '@common/hooks';
import { LabeledField } from '@common/components';

import { useItems } from '../../../hooks';

import {
  FORM_NAME,
  APPEAL_FIELDS,
  RECIPIENT_TYPES,
  RECIPIENT_DROPDOWN_ITEMS,
} from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';

import { OverpaymentRefundBankDetails } from './OverpaymentRefundBankDetails';

/**
 * ## Компонент Шаг 4. Введите данные получателя
 *
 * @example
 * <OverpaymentRefund />
 *
 * @param {object} props - Параметры компонента
 * @param {boolean} props.shouldRender - должен ли рендериться компонент
 *
 * @returns {React.FC} Шаг 4. Введите данные получателя
 */
export const OverpaymentRefund = ({ shouldRender }) => {
  const setAppealField = useActions(actions.setAppealField);

  const {
    recipientType,
    personFio,
    personInn,
    passportSeries,
    passportNumber,
    passportFmsUnit,
    passportDate,
    companyName,
    companyInn,
    companyKpp,
    ...bankDetails
  } = useSelector(selectors.appealRefund);

  const onChangeAppealField = useCallback((e) => {
    const { name: fieldName, value } = e.component || e;
    setAppealField(fieldName, value);
  }, []);

  const recipientTypeItems = useItems({
    items: RECIPIENT_DROPDOWN_ITEMS,
    onChange: onChangeAppealField,
  });

  if (!shouldRender) {
    return null;
  }

  const requiredMessage = getUiMessages('requiredMessage');

  return (
    <>
      <L.H6 className="margin-bottom-12">4. Введите данные получателя</L.H6>

      <L.DropDownSelect
        className="width-55 padding-right-8 margin-bottom-16"
        placeholder="Выберите"
        isRequired
        requiredMessage={requiredMessage}
        name={APPEAL_FIELDS.recipientType}
        form={FORM_NAME}
        {...recipientTypeItems}
      />

      <L.Div shouldRender={!!recipientType}>
        <L.Div shouldRender={recipientType === RECIPIENT_TYPES.NATURAL_PERSON}>
          <L.Dl className="list form w-30 margin-bottom-16">
            <LabeledField label="Фамилия Имя Отчество получателя">
              <L.Input
                placeholder="Введите"
                isRequired
                requiredMessage={requiredMessage}
                name={APPEAL_FIELDS.personFio}
                form={FORM_NAME}
                value={personFio}
                onChange={onChangeAppealField}
                maxLength={255}
              />
            </LabeledField>

            <LabeledField label="ИНН">
              <L.MaskedInput
                placeholder="Введите"
                className="width-35"
                validator="innPrivate"
                mask={'#'.repeat(12)}
                isRequired
                requiredMessage={requiredMessage}
                name={APPEAL_FIELDS.personInn}
                form={FORM_NAME}
                value={personInn}
                onChange={onChangeAppealField}
              />
            </LabeledField>
          </L.Dl>

          <L.H6 className="margin-bottom-16">Паспортные данные</L.H6>

          <L.Dl className="list form w-30 margin-bottom-32">
            <LabeledField label="Серия">
              <L.MaskedInput
                className="width-35"
                placeholder="Введите"
                mask={'#'.repeat(4)}
                isRequired
                requiredMessage={requiredMessage}
                name={APPEAL_FIELDS.passportSeries}
                form={FORM_NAME}
                value={passportSeries}
                onChange={onChangeAppealField}
              />
            </LabeledField>

            <LabeledField label="Номер">
              <L.MaskedInput
                className="width-35"
                placeholder="Введите"
                mask={'#'.repeat(6)}
                isRequired
                requiredMessage={requiredMessage}
                name={APPEAL_FIELDS.passportNumber}
                form={FORM_NAME}
                value={passportNumber}
                onChange={onChangeAppealField}
              />
            </LabeledField>

            <LabeledField label="Кем выдан">
              <L.Input
                placeholder="Введите"
                isRequired
                requiredMessage={requiredMessage}
                name={APPEAL_FIELDS.passportFmsUnit}
                form={FORM_NAME}
                value={passportFmsUnit}
                onChange={onChangeAppealField}
                maxLength={255}
              />
            </LabeledField>

            <LabeledField label="Дата выдачи">
              <L.DatePicker
                className="input-xs"
                placeholder="дд.мм.гггг"
                isRequired
                requiredMessage={requiredMessage}
                name={APPEAL_FIELDS.passportDate}
                form={FORM_NAME}
                value={passportDate}
                onChange={onChangeAppealField}
              />
            </LabeledField>
          </L.Dl>
        </L.Div>

        <L.Dl
          className="list form w-30 margin-bottom-32"
          shouldRender={recipientType !== RECIPIENT_TYPES.NATURAL_PERSON}
        >
          <LabeledField label="Наименование организации">
            <L.Input
              placeholder="Введите"
              isRequired
              requiredMessage={requiredMessage}
              name={APPEAL_FIELDS.companyName}
              form={FORM_NAME}
              value={companyName}
              onChange={onChangeAppealField}
              maxLength={255}
            />
          </LabeledField>

          <LabeledField label="ИНН">
            <L.MaskedInput
              placeholder="Введите"
              className="width-35"
              isRequired
              requiredMessage={requiredMessage}
              validator="innCorp"
              mask={'#'.repeat(10)}
              name={APPEAL_FIELDS.companyInn}
              form={FORM_NAME}
              value={companyInn}
              onChange={onChangeAppealField}
            />
          </LabeledField>

          <LabeledField label="КПП">
            <L.MaskedInput
              placeholder="Введите"
              className="width-35"
              isRequired
              requiredMessage={requiredMessage}
              validator="kpp"
              mask={'#'.repeat(9)}
              name={APPEAL_FIELDS.companyKpp}
              form={FORM_NAME}
              value={companyKpp}
              onChange={onChangeAppealField}
            />
          </LabeledField>
        </L.Dl>

        <OverpaymentRefundBankDetails
          recipientType={recipientType}
          bankDetails={bankDetails}
          onChangeAppealField={onChangeAppealField}
        />
      </L.Div>
    </>
  );
};
