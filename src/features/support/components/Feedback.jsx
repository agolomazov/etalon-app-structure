import React, { useState, useEffect } from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { APP_ROUTES, FILES_UPLOAD_CONFIG } from '@src/constants';
import { getUiMessages } from '@common/messages';
import { LabeledField, SubmitButton } from '@common/components';

import {
  TECH_SUPPORT_MESSAGE_TYPES,
  FEEDBACK_SUBJECT_DROPDOWN_ITEMS,
} from '../constants';
import { useTechSupportMessage } from '../hooks';

/**
 * ## Раздел "Оставить отзыв"
 * @example
 * <Feedback />
 *
 * @returns {React.FC} Раздел "Оставить отзыв"
 */
export const Feedback = () => {
  const {
    InfoRender,
    SuccessViewRender,
    ErrorViewRender,
    setSubject,
    text,
    setText,
    email,
    setEmail,
    file,
    fileError,
    onChangeFile,
    isLoading,
    submit,
  } = useTechSupportMessage(TECH_SUPPORT_MESSAGE_TYPES.FEEDBACK);
  const [subjectType, setSubjectType] = useState(null);

  useEffect(() => {
    if (subjectType !== null) {
      setSubject(subjectType.value);
    }
  }, [subjectType]);

  const requiredMessage = getUiMessages('requiredMessage');
  const wrongEmailMessage = getUiMessages('wrongEmailMessage');

  return (
    <L.Loader
      isLoading={isLoading}
      className="page-content padding-x-32 padding-y-16 border-top
                 no-background"
    >
      <L.Div className="page-wrapper margin-bottom-32 padding-bottom-8">
        <L.P className="padding-bottom-24">
          В данном разделе Вы можете оставить свои предложения и замечания,
          связанные с работой Личного кабинета.
        </L.P>
        <L.Dl className="list form w-30 margin-bottom-32">
          <LabeledField label="Тема">
            <L.DropDownSelect
              isRequired
              requiredMessage={requiredMessage}
              form="feedback"
              name="subject"
              textField="text"
              data={FEEDBACK_SUBJECT_DROPDOWN_ITEMS}
              placeholder="Выберите тему"
              value={subjectType}
              onChange={(el) => setSubjectType(el.component.value)}
            />
          </LabeledField>

          <LabeledField label="Сообщение">
            <L.Textarea
              placeholder="Введите текст"
              isRequired
              requiredMessage={requiredMessage}
              form="feedback"
              name="text"
              value={text}
              onChange={(e) => setText(e.component.value)}
              maxLength={4000}
            />
          </LabeledField>

          <LabeledField
            label="Электронная почта"
            tooltip="Укажите адрес электронной почты,
                     на которую Вам будет отправлен ответ"
          >
            <L.Input
              isRequired
              requiredMessage={requiredMessage}
              invalidMessage={wrongEmailMessage}
              form="feedback"
              name="email"
              validator="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.component.value)}
            />
          </LabeledField>

          <LabeledField label="Документ">
            <L.FileDrop
              form="feedback"
              name="file"
              infoRender={InfoRender}
              successViewRender={SuccessViewRender}
              errorViewRender={ErrorViewRender}
              error={fileError}
              allowedFiles={FILES_UPLOAD_CONFIG.ALLOWED_FILES}
              maxFileSize={FILES_UPLOAD_CONFIG.MAX_FILE_SIZE}
              value={file}
              onChange={onChangeFile}
            />
          </LabeledField>
        </L.Dl>
        <L.Div
          className="inner-24 secondary margin-bottom-32"
          data-cy="feedbackInfoBlock"
        >
          <>
            Форма предназначена исключительно для направления мнения о работе
            Личного кабинета. Если Вам необходимо задать вопрос или направить
            обращение по аренде федерального имущества, пожаловаться на
            действие/бездействие сотрудников Росимущества, воспользуйтесь
            разделом
          </>
          <> </>
          <Link to={APP_ROUTES.SITUATIONS}>Жизненные ситуации</Link>
          <>.</>
        </L.Div>
      </L.Div>

      <L.Div className="toolbar fixed flex-row align-items-center padding-x-32">
        <SubmitButton
          className="margin-left-auto success"
          form="feedback"
          onClick={() => submit()}
        >
          {getUiMessages('btnSubmit')}
        </SubmitButton>
      </L.Div>
    </L.Loader>
  );
};
