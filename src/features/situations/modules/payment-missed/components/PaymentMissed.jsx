import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import {
  NumberPrefixInputRender,
  LabeledField,
  CurrencyInput,
  SubmitButton,
} from '@common/components';
import { setDateFormat } from '@common/utils';
import { getUiMessages } from '@common/messages';
import { useActions } from '@common/hooks';

import { SITUATION_TYPES, SITUATION_APPEAL_TYPES } from '../../../constants';

import {
  LifeSituation,
  LifeSituationWrapper,
  LifeSituationMain,
  LifeSituationFooter,
} from '../../../components';
import { useLifeSituationSubmit } from '../../../hooks';

import { AttachmentDrop } from '../../attachments';

import { APPEAL_FIELDS } from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';
import { appealMapper } from '../mapper';

/**
 * ## Компонент ЖС Отсутствует платеж по договору аренды
 *
 * @example
 * <PaymentMissed contracts={contracts}/>
 *
 * @param {Object} props - Параметры компонента
 * @param {Array} props.contracts - список договоров
 *
 * @returns {React.FC} Компонент ЖС Отсутствует платеж по договору аренды
 */
export const PaymentMissed = ({ contracts = [] }) => {
  const setAppealField = useActions(actions.setAppealField);

  const {
    id: appealId,
    contractId,
    contractNumber,
    contractDate,
    payer,
    paymentOrderNumber,
    paymentOrderDate,
    paymentAmount,
    paymentPeriod,
    comment,
  } = useSelector(selectors.appeal);

  const isSomethingLoading = useSelector(selectors.isSomethingLoading);

  const onChangeAppealField = useCallback((e) => {
    const { name, value } = e.component;
    setAppealField(name, value);
  }, []);

  const onChangeContractNumber = useCallback((e) => {
    const { name, value, suggestion } = e.component;
    setAppealField(name, value);
    if (suggestion) {
      const { id, date = '' } = suggestion;
      setAppealField(APPEAL_FIELDS.contractId, id);
      setAppealField(APPEAL_FIELDS.contractDate, setDateFormat(date));
    } else {
      setAppealField(APPEAL_FIELDS.contractId, null);
    }
  }, []);

  const onSubmit = useLifeSituationSubmit({
    appealIds: [appealId],
    appealType: SITUATION_APPEAL_TYPES.PAYMENT_MISSED,
    appealSelector: selectors.appeal,
    appealMapper,
  });

  return (
    <LifeSituation
      lifeSituationType={SITUATION_TYPES.PAYMENT_MISSED}
      afterCreateLifeSituationAction={actions.afterCreateLifeSituationFlow}
      beforeExitLifeSituationAction={actions.beforeExitLifeSituationFlow}
    >
      <LifeSituationWrapper>
        <LifeSituationMain>
          <L.H6 className="margin-bottom-12">
            1. Выберите договор, по которому проводилась оплата
          </L.H6>

          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-16">
            <LabeledField label="Номер договора">
              <L.AutoComplete
                className="width-55 padding-right-8"
                inputRender={NumberPrefixInputRender}
                isRequired
                form="payment-missed-form"
                name={APPEAL_FIELDS.contractNumber}
                data={contracts}
                textField="number"
                value={contractNumber}
                onChange={onChangeContractNumber}
                maxLength={20}
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>

            <LabeledField label="Дата договора">
              <L.DatePicker
                className="input-xs"
                placeholder="дд.мм.гггг"
                isDisabled={!!contractId}
                isRequired
                form="payment-missed-form"
                name={APPEAL_FIELDS.contractDate}
                value={contractDate}
                onChange={onChangeAppealField}
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>
          </L.Dl>

          <L.H6 className="margin-bottom-12">
            2. Укажите сведения о платежном поручении
          </L.H6>

          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-16">
            <LabeledField
              label="Плательщик"
              description="ФИО или наименование ЮЛ"
              classNameDescription="txt-gray"
            >
              <L.Input
                className="width-100"
                placeholder="Введите ФИО или наименование ЮЛ"
                isRequired
                form="payment-missed-form"
                name={APPEAL_FIELDS.payer}
                value={payer}
                onChange={onChangeAppealField}
                maxLength={255}
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>

            <LabeledField label="Номер платёжного поручения">
              <L.Input
                className="width-55"
                inputRender={NumberPrefixInputRender}
                allowedSymbols="numbers"
                isRequired
                form="payment-missed-form"
                name={APPEAL_FIELDS.paymentOrderNumber}
                value={paymentOrderNumber}
                onChange={onChangeAppealField}
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>

            <LabeledField label="Дата платёжного поручения">
              <L.DatePicker
                className="input-xs"
                placeholder="дд.мм.гггг"
                isRequired
                form="payment-missed-form"
                name={APPEAL_FIELDS.paymentOrderDate}
                value={paymentOrderDate}
                onChange={onChangeAppealField}
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>

            <LabeledField label="Сумма платежа">
              <CurrencyInput
                className="width-55"
                isRequired
                form="payment-missed-form"
                name={APPEAL_FIELDS.paymentAmount}
                value={paymentAmount}
                onChange={onChangeAppealField}
                maxLength={255}
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>

            <LabeledField label="Период платежа">
              <L.Input
                className="width-55"
                placeholder="Введите период"
                isRequired
                form="payment-missed-form"
                name={APPEAL_FIELDS.paymentPeriod}
                value={paymentPeriod}
                onChange={onChangeAppealField}
                maxLength={255}
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>

            <LabeledField label="Подтверждающий документ">
              <AttachmentDrop
                appealId={appealId}
                isRequired
                form="payment-missed-form"
                name={APPEAL_FIELDS.file}
              />
            </LabeledField>

            <LabeledField label="Комментарий">
              <L.Textarea
                placeholder="Текст сообщения"
                form="payment-missed-form"
                name={APPEAL_FIELDS.comment}
                value={comment}
                onChange={onChangeAppealField}
                maxLength={1000}
              />
            </LabeledField>
          </L.Dl>
        </LifeSituationMain>
        <LifeSituationFooter>
          <SubmitButton
            _success
            isDisabled={isSomethingLoading}
            form="payment-missed-form"
            onClick={onSubmit}
          >
            {getUiMessages('btnSubmit')}
          </SubmitButton>
        </LifeSituationFooter>
      </LifeSituationWrapper>
    </LifeSituation>
  );
};
