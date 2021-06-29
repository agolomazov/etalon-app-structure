import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { useActions } from '@common/hooks';
import { getUiMessages } from '@common/messages';
import { LabeledField, SubmitButton } from '@common/components';

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
 * ## Компонент ЖС "Изменить реквизиты ЮЛ"
 *
 * @example
 * <ChangeDetailsJuridical/>
 *
 * @returns {React.FC} Компонент ЖС "Изменить реквизиты ЮЛ"
 */
export const ChangeDetailsJuridical = () => {
  const { chooseAppealTypeFlow, setAppealField } = useActions(actions);

  const appealType = useSelector(selectors.appealType);
  const isSomethingLoading = useSelector(selectors.isSomethingLoading);
  const {
    id: appealId,
    surname,
    name,
    patronymic,
    tel,
    email,
    comment,
  } = useSelector(selectors.appeal);

  const shouldRenderFileDrop =
    appealType && appealType !== APPEAL_TYPES.contacts;
  const shouldRenderContacts =
    appealType && appealType === APPEAL_TYPES.contacts;
  const shouldRenderFio = appealType && appealType === APPEAL_TYPES.leader;

  const appealTypeItems = useItems({
    items: APPEAL_DROPDOWN_ITEMS,
    onChange: ({ value }) => chooseAppealTypeFlow(value),
  });

  const onChangeAppealField = useCallback((e) => {
    const { name: fieldName, value } = e.component;
    setAppealField(fieldName, value);
  }, []);

  const onSubmit = useLifeSituationSubmit({
    appealIds: [appealId],
    appealType: APPEAL_TYPE_MAP[appealType]?.situationAppealType,
    appealSelector: selectors.appeal,
    appealMapper,
  });

  const requiredMessage = getUiMessages('requiredMessage');
  const wrongEmailMessage = getUiMessages('wrongEmailMessage');

  return (
    <LifeSituation
      lifeSituationType={SITUATION_TYPES.CHANGE_DETAILS_JURIDICAL}
      beforeExitLifeSituationAction={actions.beforeExitLifeSituationFlow}
    >
      <LifeSituationWrapper>
        <LifeSituationMain>
          <L.H6 className="margin-bottom-12">
            1. Выберите причину внесения изменений
          </L.H6>

          <L.DropDownSelect
            className="width-55 padding-right-8 margin-bottom-16"
            placeholder="Выберите"
            isDisabled={isSomethingLoading}
            form="change-details"
            name="appealType"
            isRequired
            requiredMessage={requiredMessage}
            {...appealTypeItems}
          />

          {appealId && (
            <>
              <L.H6 className="margin-bottom-12">
                {shouldRenderContacts
                  ? '2. Заполните необходимые поля'
                  : '2. Загрузите дополнительно'}
              </L.H6>

              <L.Dl className="list form w-30 margin-bottom-32">
                <LabeledField
                  label="Телефон"
                  shouldRender={shouldRenderContacts}
                >
                  <L.MaskedInput
                    className="width-35"
                    mask="+7 ### ### ## ##"
                    placeholder="+7"
                    isRequired={!email}
                    requiredMessage={requiredMessage}
                    form="change-details"
                    name={APPEAL_FIELDS.tel}
                    value={tel}
                    onChange={onChangeAppealField}
                  />
                </LabeledField>

                <LabeledField label="Почта" shouldRender={shouldRenderContacts}>
                  <L.Input
                    className="width-35"
                    placeholder="Введите почту для связи"
                    isRequired={!tel}
                    requiredMessage={requiredMessage}
                    invalidMessage={wrongEmailMessage}
                    validator="email"
                    form="change-details"
                    name={APPEAL_FIELDS.email}
                    value={email}
                    onChange={onChangeAppealField}
                    maxLength={255}
                  />
                </LabeledField>

                <LabeledField
                  label="Фамилия Имя Отчество"
                  description="Нового руководителя"
                  classNameDescription="txt-gray"
                  shouldRender={shouldRenderFio}
                >
                  <L.Div className="table-layout">
                    <L.Div>
                      <L.Div className="width-35">
                        <L.Input
                          className="width-100"
                          placeholder="Фамилия"
                          isRequired
                          requiredMessage={requiredMessage}
                          form="change-details"
                          name={APPEAL_FIELDS.surname}
                          value={surname}
                          onChange={onChangeAppealField}
                        />
                      </L.Div>
                      <L.Div className="padding-x-8">
                        <L.Input
                          placeholder="Имя"
                          isRequired
                          requiredMessage={requiredMessage}
                          form="change-details"
                          name={APPEAL_FIELDS.name}
                          value={name}
                          onChange={onChangeAppealField}
                        />
                      </L.Div>
                      <L.Div>
                        <L.Input
                          placeholder="Отчество"
                          form="change-details"
                          name={APPEAL_FIELDS.patronymic}
                          value={patronymic}
                          onChange={onChangeAppealField}
                        />
                      </L.Div>
                    </L.Div>
                  </L.Div>
                </LabeledField>

                <LabeledField
                  label="Подтверждающий документ"
                  description="Загрузите скан-копии документов,
                  подтверждающих изменение данных"
                  shouldRender={shouldRenderFileDrop}
                >
                  <AttachmentDrop
                    appealId={appealId}
                    isRequired
                    isMultiple
                    form="change-details"
                    name={APPEAL_FIELDS.file}
                  />

                  <AttachmentsList appealId={appealId} />
                </LabeledField>

                <LabeledField label="Комментарий">
                  <L.Textarea
                    placeholder="Текст сообщения"
                    form="change-details"
                    name={APPEAL_FIELDS.comment}
                    value={comment}
                    onChange={onChangeAppealField}
                    maxLength={1000}
                  />
                </LabeledField>
              </L.Dl>
            </>
          )}
        </LifeSituationMain>
        <LifeSituationFooter>
          <SubmitButton
            _success
            form="change-details"
            isDisabled={isSomethingLoading}
            onClick={onSubmit}
          >
            {getUiMessages('btnSubmit')}
          </SubmitButton>
        </LifeSituationFooter>
      </LifeSituationWrapper>
    </LifeSituation>
  );
};
