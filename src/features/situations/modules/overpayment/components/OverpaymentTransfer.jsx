import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';
import { useActions } from '@common/hooks';
import { NumberPrefixInputRender, LabeledField } from '@common/components';

import { useItems } from '../../../hooks';

import {
  FORM_NAME,
  APPEAL_FIELDS,
  OBLIGATION_DROPDOWN_ITEMS,
} from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';

/**
 * ## Компонент Шаг 4. Укажите договор, в счет которого будет произведен перезачет
 *
 * @example
 * <OverpaymentTransfer contracts={contracts} />
 *
 * @param {object} props - Параметры компонента
 * @param {object} props.contracts - список договоров
 * @param {boolean} props.shouldRender - должен ли рендериться компонент
 *
 * @returns {React.FC} Компонент Шаг 4. Укажите договор, в счет которого будет произведен перезачет
 */
export const OverpaymentTransfer = ({ contracts = [], shouldRender }) => {
  const { setAppealTransferContract, setAppealField } = useActions(actions);

  const {
    transferContractId,
    transferContractNumber,
    transferContractDate,
    transferPeriod,
  } = useSelector(selectors.appealTransfer);

  const onChangeTransferContractNumber = useCallback((e) => {
    const { value: contractNumber, suggestion: contract } = e.component || e;
    setAppealTransferContract({ contractNumber, contract });
  }, []);

  const onChangeAppealField = useCallback((e) => {
    const { name: fieldName, value } = e.component || e;
    setAppealField(fieldName, value);
  }, []);

  const transferObligationTypeItems = useItems({
    items: OBLIGATION_DROPDOWN_ITEMS,
    onChange: onChangeAppealField,
  });

  if (!shouldRender) {
    return null;
  }

  const requiredMessage = getUiMessages('requiredMessage');

  return (
    <>
      <L.H6 className="margin-bottom-12">
        4. Укажите договор, в счет которого будет произведен перезачет
      </L.H6>
      <L.Dl className="list form w-30 margin-bottom-32">
        <LabeledField label="Номер договора">
          <L.AutoComplete
            className="width-35"
            inputRender={NumberPrefixInputRender}
            isRequired
            requiredMessage={requiredMessage}
            form={FORM_NAME}
            name={APPEAL_FIELDS.transferContractNumber}
            data={contracts}
            textField="number"
            value={transferContractNumber}
            onChange={onChangeTransferContractNumber}
            maxLength={20}
          />
        </LabeledField>

        <LabeledField label="Дата договора">
          <L.DatePicker
            className="input-xs"
            placeholder="дд.мм.гггг"
            isRequired
            requiredMessage={requiredMessage}
            isDisabled={!!transferContractId}
            form={FORM_NAME}
            name={APPEAL_FIELDS.transferContractDate}
            value={transferContractDate}
            onChange={onChangeAppealField}
          />
        </LabeledField>

        <LabeledField label="Тип обязательства">
          <L.DropDownSelect
            className="width-35"
            placeholder="Выберите"
            isRequired
            requiredMessage={requiredMessage}
            form={FORM_NAME}
            name={APPEAL_FIELDS.transferObligationType}
            {...transferObligationTypeItems}
          />
        </LabeledField>

        <LabeledField label="Период погашения обязательства">
          <L.Input
            className="width-35"
            placeholder="Введите"
            isRequired
            requiredMessage={requiredMessage}
            form={FORM_NAME}
            name={APPEAL_FIELDS.transferPeriod}
            value={transferPeriod}
            onChange={onChangeAppealField}
            maxLength={255}
          />
        </LabeledField>
      </L.Dl>
    </>
  );
};
