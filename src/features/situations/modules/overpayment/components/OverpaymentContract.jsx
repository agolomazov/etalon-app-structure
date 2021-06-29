import React, { useState, useCallback, useEffect, useRef } from 'react';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';

import { getUiMessages } from '@common/messages';
import { useActions } from '@common/hooks';
import { NumberPrefixInputRender, LabeledField } from '@common/components';
import { setDateFormat } from '@common/utils';

import { FORM_NAME, APPEAL_FIELDS } from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';

/**
 * ## Компонент Шаг 1. Выберите договор, по которому есть переплата
 *
 * @example
 * <OverpaymentContract contracts={contracts} />
 *
 * @param {object} props - Параметры компонента
 * @param {Array} props.contracts - список контрактов
 *
 * @returns {React.FC} Компонент Шаг 1. Выберите договор, по которому есть переплата
 */
export const OverpaymentContract = ({ contracts = [] }) => {
  const { setContract } = useActions(actions);
  const contract = useSelector(selectors.appealContract);
  const { overpaymentAmount = '0', date = '', number = '' } = contract || {};

  const onlyOneTimeRef = useRef(true);
  const contractRef = useRef(null);
  const [contractNumber, setContractNumber] = useState('');

  const onChangeContractNumber = useCallback((e) => {
    onlyOneTimeRef.current = null;
    const { value, suggestion } = e.component;
    setContractNumber(value);
    setContract(suggestion);
  }, []);

  useEffect(() => {
    if (number && number !== contractNumber) {
      setContractNumber(number);
    }
  }, [number, contractNumber]);

  useEffect(() => {
    if (number && onlyOneTimeRef.current && number === contractNumber) {
      contractRef.current.input.focus();
      contractRef.current.input.blur();
      onlyOneTimeRef.current = null;
    }
  }, [number, contractNumber]);

  return (
    <>
      <L.H6 className="margin-bottom-12">
        1.Выберите договор, по которому есть переплата
      </L.H6>
      <L.Dl className="list form w-30 margin-bottom-32">
        <LabeledField label="Номер договора">
          <L.AutoComplete
            ref={contractRef}
            className="width-35"
            inputRender={NumberPrefixInputRender}
            isRequired
            requiredMessage={getUiMessages('requiredMessage')}
            shouldCorrectValue
            form={FORM_NAME}
            name={APPEAL_FIELDS.contract}
            data={contracts}
            value={contractNumber}
            textField="number"
            onChange={onChangeContractNumber}
            maxLength={20}
          />
        </LabeledField>

        <LabeledField label="Дата договора">
          <L.DatePicker
            className="input-xs"
            placeholder="дд.мм.гггг"
            isDisabled
            name={APPEAL_FIELDS.contractDate}
            value={date ? setDateFormat(date) : ''}
          />
        </LabeledField>

        <L.Dt>Сумма переплаты</L.Dt>
        <L.Dd>
          <L.RUB precision="2">{overpaymentAmount}</L.RUB>
          <L.Tooltip title="На текущий момент" position="right">
            <L.I className="novicon-question txt-gray margin-left-8" />
          </L.Tooltip>
        </L.Dd>
      </L.Dl>
    </>
  );
};
