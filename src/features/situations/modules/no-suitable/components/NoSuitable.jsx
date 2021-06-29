import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';
import { LabeledField, SubmitButton } from '@common/components';
import { useActions } from '@common/hooks';

import { SITUATION_TYPES, SITUATION_APPEAL_TYPES } from '../../../constants';

import {
  LifeSituation,
  LifeSituationWrapper,
  LifeSituationMain,
  LifeSituationFooter,
} from '../../../components';
import { useLifeSituationSubmit } from '../../../hooks';

import { AttachmentDrop, AttachmentsList } from '../../attachments';

import { APPEAL_FIELDS } from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';
import { appealMapper } from '../mapper';

/**
 * ## Компонент ЖС "Нет подходящей ЖС"
 *
 * @example
 * <NoSuitable/>
 * @param {Object} props - Параметры компонента
 * @param {Array} props.rosimOffice - список территориальных органов
 *
 * @returns {React.FC} Компонент ЖС "Нет подходящей ЖС"
 */
export const NoSuitable = ({ rosimOffices = [] }) => {
  const setAppealField = useActions(actions.setAppealField);
  const { id: appealId, rosimOffice, appealTitle, appealBody } = useSelector(
    selectors.appeal,
  );
  const isSomethingLoading = useSelector(selectors.isSomethingLoading);

  const onChangeAppealField = useCallback((e) => {
    const { name, value } = e.component;
    setAppealField(name, value);
  }, []);

  const onSubmit = useLifeSituationSubmit({
    appealIds: [appealId],
    appealType: SITUATION_APPEAL_TYPES.NO_SUITABLE,
    appealSelector: selectors.appeal,
    appealMapper,
  });

  return (
    <LifeSituation
      lifeSituationType={SITUATION_TYPES.NO_SUITABLE}
      afterCreateLifeSituationAction={actions.afterCreateLifeSituationFlow}
      beforeExitLifeSituationAction={actions.beforeExitLifeSituationFlow}
    >
      <LifeSituationWrapper>
        <LifeSituationMain>
          <L.H6 className="margin-bottom-12">
            1. Выберите территориальный орган Росимущества для подачи обращения
          </L.H6>
          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-32">
            <LabeledField
              label="Территориальный орган"
              description="Росимущества"
              classNameDescription="txt-gray"
            >
              <L.DropDownSelect
                placeholder="Выберите"
                isRequired
                form="no-suitable-form"
                name={APPEAL_FIELDS.rosimOffice}
                data={rosimOffices}
                textField="name"
                value={rosimOffice}
                onChange={onChangeAppealField}
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>
          </L.Dl>
          <L.H6 className="margin-bottom-12">2. Содержание обращения</L.H6>

          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-32">
            <LabeledField label="Тема обращения">
              <L.Input
                placeholder="Введите тему обращения"
                form="no-suitable-form"
                name={APPEAL_FIELDS.appealTitle}
                value={appealTitle}
                onChange={onChangeAppealField}
                isRequired
                maxLength={255}
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>

            <LabeledField label="Обращение">
              <L.Textarea
                placeholder="Текст обращения"
                form="no-suitable-form"
                name={APPEAL_FIELDS.appealBody}
                value={appealBody}
                onChange={onChangeAppealField}
                isRequired
                maxLength={255}
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>

            <LabeledField
              label="Документ"
              description="Загрузите файлы по обращению"
            >
              <AttachmentDrop
                appealId={appealId}
                isMultiple
                form="no-suitable-form"
                name={APPEAL_FIELDS.files}
              />

              <AttachmentsList appealId={appealId} />
            </LabeledField>
          </L.Dl>
        </LifeSituationMain>
        <LifeSituationFooter>
          <SubmitButton
            _success
            isDisabled={isSomethingLoading}
            form="no-suitable-form"
            onClick={onSubmit}
          >
            {getUiMessages('btnSubmit')}
          </SubmitButton>
        </LifeSituationFooter>
      </LifeSituationWrapper>
    </LifeSituation>
  );
};
