import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import {
  NumberPrefixInputRender,
  LabeledField,
  SubmitButton,
} from '@common/components';
import { getUiMessages } from '@common/messages';
import { useActions } from '@common/hooks';

import { SITUATION_TYPES } from '../../../constants';

import {
  LifeSituation,
  LifeSituationWrapper,
  LifeSituationMain,
  LifeSituationFooter,
} from '../../../components';
import { useItems, useLifeSituationSubmit } from '../../../hooks';

import { AttachmentDrop, AttachmentsList } from '../../attachments';

import {
  APPEAL_TYPES,
  APPEAL_TYPE_MAP,
  APPEAL_DROPDOWN_ITEMS,
  APPEAL_FIELDS,
} from '../constants';

import { actions } from '../ducks';
import { selectors } from '../selectors';
import { appealMapper } from '../mapper';

/**
 * ## Компонент ЖС "Жалоба"
 *
 * @example
 * <Complaint/>
 *
 * @param {Object} props - Параметры компонента
 * @param {Array} props.rosimOffice - список территориальных органов
 *
 * @returns {React.FC} Компонент ЖС "Жалоба"
 */
export const Complaint = ({ rosimOffices = [] }) => {
  const { chooseAppealTypeFlow, setAppealField } = useActions(actions);

  const appealType = useSelector(selectors.appealType);
  const {
    id: appealId,
    rosimOffice,
    documentNumber,
    documentDate,
    complaintReason,
    userDemand,
  } = useSelector(selectors.appeal);
  const isSomethingLoading = useSelector(selectors.isSomethingLoading);

  const appealTypeItems = useItems({
    items: APPEAL_DROPDOWN_ITEMS,
    onChange: ({ value }) => chooseAppealTypeFlow(value),
  });

  const onChangeAppealField = useCallback((e) => {
    const { name, value } = e.component;
    setAppealField(name, value);
  }, []);

  const onSubmit = useLifeSituationSubmit({
    appealIds: [appealId],
    appealType: APPEAL_TYPE_MAP[appealType]?.situationAppealType,
    appealSelector: selectors.appeal,
    appealMapper,
  });

  return (
    <LifeSituation
      lifeSituationType={SITUATION_TYPES.COMPLAINT}
      afterCreateLifeSituationAction={actions.afterCreateLifeSituationFlow}
      beforeExitLifeSituationAction={actions.beforeExitLifeSituationFlow}
    >
      <LifeSituationWrapper>
        <LifeSituationMain>
          <L.H6 className="margin-bottom-12">
            1. Выберите из списка территориальный орган Росимущества, действия
            которого обжалуются
          </L.H6>
          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-32">
            <LabeledField
              label="Территориальный орган"
              description="Росимущества"
              classNameDescription="txt-gray"
            >
              <L.DropDownSelect
                isRequired
                form="complaint-form"
                name={APPEAL_FIELDS.rosimOffice}
                data={rosimOffices}
                textField="name"
                value={rosimOffice}
                onChange={onChangeAppealField}
                placeholder="Выберите"
                requiredMessage={getUiMessages('requiredMessage')}
              />
            </LabeledField>
          </L.Dl>
          <L.H6 className="margin-bottom-12">2. Предмет обжалования</L.H6>

          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-32">
            <LabeledField label="Оформить жалобу">
              <L.DropDownSelect
                placeholder="Выберите"
                isDisabled={isSomethingLoading}
                isRequired
                form="complaint-form"
                name={APPEAL_FIELDS.appealType}
                requiredMessage={getUiMessages('requiredMessage')}
                {...appealTypeItems}
              />
            </LabeledField>
            {appealType === APPEAL_TYPES.DOCUMENT && (
              <>
                <LabeledField label="Номер документа">
                  <L.Input
                    className="width-55 padding-right-8"
                    inputRender={NumberPrefixInputRender}
                    isRequired
                    form="complaint-form"
                    name={APPEAL_FIELDS.documentNumber}
                    value={documentNumber}
                    onChange={onChangeAppealField}
                    maxLength={20}
                    requiredMessage={getUiMessages('requiredMessage')}
                  />
                </LabeledField>
                <LabeledField label="Дата документа">
                  <L.DatePicker
                    className="input-xs"
                    placeholder="дд.мм.гггг"
                    isRequired
                    form="complaint-form"
                    name={APPEAL_FIELDS.documentDate}
                    value={documentDate}
                    onChange={onChangeAppealField}
                    requiredMessage={getUiMessages('requiredMessage')}
                  />
                </LabeledField>
              </>
            )}
          </L.Dl>
          <L.Div shouldRender={!!appealType}>
            <L.H6 className="margin-bottom-12">3. Содержание обращения</L.H6>
            <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-32">
              <LabeledField label="Основание для подачи жалобы">
                <L.Textarea
                  placeholder="Текст обращения"
                  form="complaint-form"
                  name={APPEAL_FIELDS.complaintReason}
                  value={complaintReason}
                  onChange={onChangeAppealField}
                  isRequired
                  maxLength={4000}
                  requiredMessage={getUiMessages('requiredMessage')}
                />
              </LabeledField>
              <LabeledField label="Требования лица, подающего жалобу">
                <L.Textarea
                  placeholder="Текст обращения"
                  form="complaint-form"
                  name={APPEAL_FIELDS.userDemand}
                  value={userDemand}
                  onChange={onChangeAppealField}
                  isRequired
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
                  form="complaint-form"
                  name={APPEAL_FIELDS.files}
                />

                <AttachmentsList appealId={appealId} />
              </LabeledField>
            </L.Dl>
          </L.Div>
        </LifeSituationMain>
        <LifeSituationFooter>
          <SubmitButton
            _success
            isDisabled={isSomethingLoading}
            form="complaint-form"
            onClick={onSubmit}
          >
            {getUiMessages('btnSubmit')}
          </SubmitButton>
        </LifeSituationFooter>
      </LifeSituationWrapper>
    </LifeSituation>
  );
};
