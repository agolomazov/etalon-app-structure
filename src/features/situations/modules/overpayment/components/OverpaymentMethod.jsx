import React from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';
import { useActions } from '@common/hooks';
import { LabeledField, CurrencyInput } from '@common/components';

import { useItems, useDownloadFormIsLoading } from '../../../hooks';

import {
  FORM_NAME,
  APPEAL_FIELDS,
  APPEAL_TYPES,
  APPEAL_TYPE_MAP,
  APPEAL_DROPDOWN_ITEMS,
  REASON_DROPDOWN_ITEMS,
  OBLIGATION_DROPDOWN_ITEMS,
} from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';

/**
 * ## Компонент Шаг 2. Выберите способ распоряжения переплатой
 *
 * @example
 * <OverpaymentMethod />
 *
 * @param {object} props - Параметры компонента
 *
 * @returns {React.FC} Компонент Шаг 2. Выберите способ распоряжения переплатой
 */
export const OverpaymentMethod = () => {
  const {
    chooseAppealTypeFlow,
    setReason,
    setAppealField,
    setAmount,
  } = useActions(actions);

  const appealType = useSelector(selectors.appealType);
  const amount = useSelector(selectors.appealAmount);
  const isAmountAttention = useSelector(selectors.isAmountAttention);
  const isSomethingLoading = useSelector(selectors.isSomethingLoading);
  const isDownloadFormLoading = useDownloadFormIsLoading();

  const amountDescription =
    APPEAL_TYPE_MAP[appealType]?.amountDescription || null;

  const attentionText = APPEAL_TYPE_MAP[appealType]?.attentionText || '';

  const appealTypeItems = useItems({
    items: APPEAL_DROPDOWN_ITEMS,
    onChange: ({ value }) => chooseAppealTypeFlow(value),
  });

  const reasonItems = useItems({
    items: REASON_DROPDOWN_ITEMS,
    onChange: ({ value }) => setReason(value),
  });

  const contractObligationTypeItems = useItems({
    items: OBLIGATION_DROPDOWN_ITEMS,
    onChange: ({ name, value }) => setAppealField(name, value),
  });

  const requiredMessage = getUiMessages('requiredMessage');

  return (
    <>
      <L.H6 className="margin-bottom-12">
        2. Выберите способ распоряжения переплатой
      </L.H6>
      <L.DropDownSelect
        className="width-55 padding-right-8 margin-bottom-16"
        placeholder="Выберите"
        isRequired
        requiredMessage={requiredMessage}
        isDisabled={isSomethingLoading || isDownloadFormLoading}
        name={APPEAL_FIELDS.appealType}
        form={FORM_NAME}
        {...appealTypeItems}
      />
      <L.Dl
        className="list form w-30 margin-bottom-32"
        shouldRender={!!appealType}
      >
        <LabeledField
          label="Сумма"
          description={amountDescription}
          classNameDescription="txt-gray"
        >
          <CurrencyInput
            className="width-35"
            isRequired
            requiredMessage={requiredMessage}
            name={APPEAL_FIELDS.amount}
            form={FORM_NAME}
            value={amount}
            maxLength={255}
            onChange={(e) => setAmount(e.component.value)}
          />
        </LabeledField>

        <L.Div
          className="width-55 padding-right-8 margin-bottom-16"
          shouldRender={isAmountAttention}
        >
          <L.Div className="message warning inner-12">
            <L.I
              className="novicon-exclamation-in-circle-fill
                         txt-warning padding-right-8"
            />
            {attentionText}
          </L.Div>
        </L.Div>

        <LabeledField label="Причина переплаты">
          <L.DropDownSelect
            className="width-35"
            placeholder="Выберите"
            isRequired
            requiredMessage={requiredMessage}
            name={APPEAL_FIELDS.reason}
            form={FORM_NAME}
            {...reasonItems}
          />
        </LabeledField>

        <LabeledField
          label="Тип обязательства"
          shouldRender={appealType === APPEAL_TYPES.TRANSFER}
        >
          <L.DropDownSelect
            className="width-35"
            placeholder="Выберите"
            isRequired
            requiredMessage={requiredMessage}
            name={APPEAL_FIELDS.contractObligationType}
            form={FORM_NAME}
            {...contractObligationTypeItems}
          />
        </LabeledField>
      </L.Dl>
    </>
  );
};
