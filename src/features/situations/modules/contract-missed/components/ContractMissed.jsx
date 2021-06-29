import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';
import { useActions } from '@common/hooks';
import {
  NumberPrefixInputRender,
  LabeledField,
  SubmitButton,
} from '@common/components';

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
 * ## Компонент ЖС отсутствует договор аренды
 *
 * @example
 * <ContractMissed landlords={landlords}/>
 *
 * @param {Object} props - Параметры компонента
 * @property {Array} props.landlords - список арендодателей
 *
 * @returns {React.FC} Компонент ЖС отсутствует договор аренды
 */
export const ContractMissed = ({ landlords = [] }) => {
  const { setAppealField } = useActions(actions);
  const {
    id: appealId,
    landlord,
    contractNumber,
    contractDate,
    address,
    cadastralNumber,
    comment,
  } = useSelector(selectors.appeal);
  const isSomethingLoading = useSelector(selectors.isSomethingLoading);

  const onChangeAppealField = useCallback((e) => {
    const { name, value } = e.component;
    setAppealField(name, value);
  }, []);

  const onSubmit = useLifeSituationSubmit({
    appealIds: [appealId],
    appealType: SITUATION_APPEAL_TYPES.CONTRACT_MISSED,
    appealSelector: selectors.appeal,
    appealMapper,
  });

  const requiredMessage = getUiMessages('requiredMessage');

  return (
    <LifeSituation
      lifeSituationType={SITUATION_TYPES.CONTRACT_MISSED}
      afterCreateLifeSituationAction={actions.afterCreateLifeSituationFlow}
      beforeExitLifeSituationAction={actions.beforeExitLifeSituationFlow}
    >
      <LifeSituationWrapper>
        <LifeSituationMain>
          <L.Dl className="list form w-30 margin-bottom-32">
            <LabeledField label="Арендодатель по договору">
              <L.DropDownSelect
                placeholder="Выберите"
                isRequired
                requiredMessage={requiredMessage}
                form="contract-missed-form"
                name={APPEAL_FIELDS.landlord}
                data={landlords}
                textField="name"
                value={landlord}
                onChange={onChangeAppealField}
              />
            </LabeledField>

            <LabeledField label="Номер договора">
              <L.Input
                className="width-35"
                inputRender={NumberPrefixInputRender}
                isRequired
                requiredMessage={requiredMessage}
                form="contract-missed-form"
                name={APPEAL_FIELDS.contractNumber}
                value={contractNumber}
                onChange={onChangeAppealField}
                maxLength={20}
              />
            </LabeledField>

            <LabeledField label="Дата договора">
              <L.DatePicker
                className="input-xs"
                placeholder="дд.мм.гггг"
                isRequired
                requiredMessage={requiredMessage}
                form="contract-missed-form"
                name={APPEAL_FIELDS.contractDate}
                value={contractDate}
                onChange={onChangeAppealField}
              />
            </LabeledField>

            <LabeledField label="Адрес объекта">
              <L.Input
                placeholder="Введите адрес объекта"
                isRequired
                requiredMessage={requiredMessage}
                form="contract-missed-form"
                name={APPEAL_FIELDS.address}
                value={address}
                onChange={onChangeAppealField}
                maxLength={255}
              />
            </LabeledField>

            <LabeledField label="Кадастровый номер объекта">
              <L.Input
                className="width-35"
                placeholder="Введите кадастровый номер объекта"
                validator="cadastralNumber"
                form="contract-missed-form"
                name={APPEAL_FIELDS.cadastralNumber}
                value={cadastralNumber}
                onChange={onChangeAppealField}
              />
            </LabeledField>

            <LabeledField
              label="Документ"
              description="Загрузите скан-копию бумажного договора"
            >
              <AttachmentDrop
                appealId={appealId}
                isRequired
                form="contract-missed-form"
                name={APPEAL_FIELDS.file}
              />
            </LabeledField>

            <LabeledField label="Комментарий">
              <L.Textarea
                placeholder="Текст сообщения"
                form="contract-missed-form"
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
            form="contract-missed-form"
            onClick={onSubmit}
          >
            {getUiMessages('btnSubmit')}
          </SubmitButton>
        </LifeSituationFooter>
      </LifeSituationWrapper>
    </LifeSituation>
  );
};
