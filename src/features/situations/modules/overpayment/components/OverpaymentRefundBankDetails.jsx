import React from 'react';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';
import { LabeledField } from '@common/components';

import { FORM_NAME, APPEAL_FIELDS, RECIPIENT_TYPES } from '../constants';

/**
 * ## Компонент Шаг 5. Укажите банковские реквизиты
 *
 * @example
 * <OverpaymentRefundBankDetails recipientType={recipientType} bankDetails={bankDetails} onChangeAppealField={onChangeAppealField} />
 *
 * @param {object} props - Параметры компонента
 * @param {string} props.recipientType - тип получателя, одно из RECIPIENT_TYPES
 * @param {object} props.bankDetails - банковские реквизиты
 * @param {Function} props.onChangeAppealField - коллбек, обработчик изменения поля формы
 *
 * @returns {React.FC} Компонент Шаг 5. Укажите банковские реквизиты
 */
export const OverpaymentRefundBankDetails = ({
  recipientType,
  bankDetails,
  onChangeAppealField,
}) => {
  const {
    bank,
    bik,
    bankAccount,
    correspondentAccount,
    personalAccount,
    kbk,
  } = bankDetails;

  const requiredMessage = getUiMessages('requiredMessage');

  return (
    <>
      <L.H6 className="margin-bottom-16">5. Укажите банковские реквизиты</L.H6>

      <L.Dl className="list form w-30 margin-bottom-32">
        <LabeledField label="Наименование банка">
          <L.Input
            placeholder="Введите"
            isRequired
            requiredMessage={requiredMessage}
            name={APPEAL_FIELDS.bank}
            form={FORM_NAME}
            value={bank}
            onChange={onChangeAppealField}
            maxLength={255}
          />
        </LabeledField>

        <LabeledField label="БИК">
          <L.MaskedInput
            className="width-35"
            placeholder="Введите"
            mask={'#'.repeat(9)}
            isRequired
            requiredMessage={requiredMessage}
            name={APPEAL_FIELDS.bik}
            form={FORM_NAME}
            value={bik}
            onChange={onChangeAppealField}
          />
        </LabeledField>

        <LabeledField label="Банковский счет">
          <L.MaskedInput
            className="width-35"
            placeholder="Введите"
            mask={'#'.repeat(20)}
            isRequired
            requiredMessage={requiredMessage}
            name={APPEAL_FIELDS.bankAccount}
            form={FORM_NAME}
            value={bankAccount}
            onChange={onChangeAppealField}
          />
        </LabeledField>

        <LabeledField
          label="Корреспондентский счет"
          shouldRender={recipientType !== RECIPIENT_TYPES.FISCAL_ORGANIZATION}
        >
          <L.MaskedInput
            className="width-35"
            placeholder="Введите"
            mask={'#'.repeat(20)}
            isRequired
            requiredMessage={requiredMessage}
            name={APPEAL_FIELDS.correspondentAccount}
            form={FORM_NAME}
            value={correspondentAccount}
            onChange={onChangeAppealField}
          />
        </LabeledField>

        <LabeledField
          label="Лицевой счет"
          shouldRender={recipientType === RECIPIENT_TYPES.FISCAL_ORGANIZATION}
        >
          <L.MaskedInput
            className="width-35"
            placeholder="Введите"
            mask={'#'.repeat(20)}
            isRequired
            requiredMessage={requiredMessage}
            name={APPEAL_FIELDS.personalAccount}
            form={FORM_NAME}
            value={personalAccount}
            onChange={onChangeAppealField}
          />
        </LabeledField>

        <LabeledField
          label="КБК"
          shouldRender={recipientType === RECIPIENT_TYPES.FISCAL_ORGANIZATION}
        >
          <L.MaskedInput
            className="width-35"
            placeholder="Введите"
            mask={'#'.repeat(20)}
            isRequired
            requiredMessage={requiredMessage}
            name={APPEAL_FIELDS.kbk}
            form={FORM_NAME}
            onChange={onChangeAppealField}
            value={kbk}
          />
        </LabeledField>
      </L.Dl>
    </>
  );
};
