import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import {
  NumberPrefixInputRender,
  LabeledField,
  SubmitButton,
} from '@common/components';
import { setDateFormat, getDateObject } from '@common/utils';
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
 * ## Компонент ЖС "Уведомление о субаренде"
 *
 * @example
 * <SubleaseNotice contracts={contracts} />
 *
 * @param {object} props - параматры компонента
 * @param {Array} props.contracts - список договоров
 *
 * @returns {React.FC} Компонент ЖС "Уведомление о субаренде"
 */
export const SubleaseNotice = ({ contracts }) => {
  const setAppealField = useActions(actions.setAppealField);
  const {
    id: appealId,
    contract,
    subtenant,
    subtenantInn,
    subtenantContractNumber,
    subtenantContractDate,
    subtenantDatePeriod,
    comment,
  } = useSelector(selectors.appeal);
  const isSomethingLoading = useSelector(selectors.isSomethingLoading);

  const { date: contractDate = '', startDate, expirationDate } = contract || {};
  const minContractDate = startDate ? getDateObject(startDate) : null;
  const maxContractDate = expirationDate ? getDateObject(expirationDate) : null;

  const [contractNumber, setContractNumber] = React.useState('');

  const onChangeAppealField = useCallback((e) => {
    const { name, value } = e.component;
    setAppealField(name, value);
  }, []);

  const onChangeContractNumber = useCallback((e) => {
    const { name, value, suggestion } = e.component;
    setContractNumber(value);
    setAppealField(name, suggestion || null);
  }, []);

  const onSubmit = useLifeSituationSubmit({
    appealIds: [appealId],
    appealType: SITUATION_APPEAL_TYPES.SUBLEASE_NOTICE,
    appealSelector: selectors.appeal,
    appealMapper,
  });

  return (
    <LifeSituation
      lifeSituationType={SITUATION_TYPES.SUBLEASE_NOTICE}
      afterCreateLifeSituationAction={actions.afterCreateLifeSituationFlow}
      beforeExitLifeSituationAction={actions.beforeExitLifeSituationFlow}
    >
      <LifeSituationWrapper>
        <LifeSituationMain>
          <L.H6 className="margin-bottom-12">1. Выберите договор</L.H6>

          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-32">
            <LabeledField label="Номер договора">
              <L.Div className="flex-row">
                <L.AutoComplete
                  className="width-35"
                  inputRender={NumberPrefixInputRender}
                  data={contracts}
                  textField="number"
                  isRequired
                  shouldCorrectValue
                  form="sublease-notice"
                  name={APPEAL_FIELDS.contract}
                  value={contractNumber}
                  onChange={onChangeContractNumber}
                  maxLength={20}
                  requiredMessage={getUiMessages('requiredMessage')}
                />
              </L.Div>
            </LabeledField>

            <LabeledField label="Дата договора">
              <L.DatePicker
                className="input-xs"
                placeholder="дд.мм.гггг"
                isDisabled
                name={APPEAL_FIELDS.contractDate}
                value={contractDate ? setDateFormat(contractDate) : ''}
                onChange={onChangeAppealField}
              />
            </LabeledField>
          </L.Dl>

          <L.H6 className="margin-bottom-12">
            2. Информация о договоре субаренды
          </L.H6>

          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-32">
            <LabeledField
              classNameDescription="txt-gray"
              label="Субарендатор"
              description="ФИО или наименование ЮЛ"
            >
              <L.Input
                placeholder="Введите ФИО или наименование ЮЛ"
                isRequired
                form="sublease-notice"
                name={APPEAL_FIELDS.subtenant}
                value={subtenant}
                onChange={onChangeAppealField}
                maxLength={255}
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>

            <LabeledField
              classNameDescription="txt-gray"
              label="ИНН"
              description="Субарендатора"
            >
              <L.Input
                className="width-35"
                placeholder="Введите ИНН субарендатора"
                isRequired
                validator="inn"
                form="sublease-notice"
                name={APPEAL_FIELDS.subtenantInn}
                value={subtenantInn}
                onChange={onChangeAppealField}
                requiredMessage={getUiMessages('requiredMessage')}
                invalidMessage={getUiMessages('wrongSubleaseTaxNumber')}
              />
            </LabeledField>

            <LabeledField
              classNameDescription="txt-gray"
              label="Номер договора"
              description="Субаренды"
            >
              <L.Input
                className="width-35"
                placeholder="Введите номер договора субаренды"
                isRequired
                form="sublease-notice"
                name={APPEAL_FIELDS.subtenantContractNumber}
                value={subtenantContractNumber}
                onChange={onChangeAppealField}
                maxLength={20}
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>

            <LabeledField
              classNameDescription="txt-gray"
              label="Дата договора"
              description="Субаренды"
            >
              <L.DatePicker
                className="input-xs"
                placeholder="дд.мм.гггг"
                isRequired
                form="sublease-notice"
                name={APPEAL_FIELDS.subtenantContractDate}
                value={subtenantContractDate}
                onChange={onChangeAppealField}
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>

            <LabeledField
              classNameDescription="txt-gray"
              label="Период действия договора"
              description="Субаренды"
            >
              <L.DateRange
                placeholder={['дд.мм.гггг', 'дд.мм.гггг']}
                isRequired
                min={minContractDate}
                max={maxContractDate}
                form="sublease-notice"
                name={APPEAL_FIELDS.subtenantDatePeriod}
                value={subtenantDatePeriod}
                onChange={onChangeAppealField}
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>

            <LabeledField
              label="Договор"
              description="Загрузите скан-копию договора субаренды"
            >
              <AttachmentDrop
                appealId={appealId}
                isRequired
                form="sublease-notice"
                name={APPEAL_FIELDS.file}
              />
            </LabeledField>

            <LabeledField label="Комментарий">
              <L.Textarea
                placeholder="Текст сообщения"
                form="sublease-notice"
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
            form="sublease-notice"
            onClick={onSubmit}
          >
            {getUiMessages('btnSubmit')}
          </SubmitButton>
        </LifeSituationFooter>
      </LifeSituationWrapper>
    </LifeSituation>
  );
};
