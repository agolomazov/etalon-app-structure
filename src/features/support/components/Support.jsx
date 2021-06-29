import React from 'react';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';
import { FILES_UPLOAD_CONFIG } from '@src/constants';

import { LabeledField, SubmitButton } from '@common/components';

import { useTechSupportMessage } from '../hooks';
import { TECH_SUPPORT_MESSAGE_TYPES } from '../constants';

/**
 * ## Отрисовывает раздел Поддержка
 * @example
 * <Support />
 *
 * @returns {React.FC} Раздел Поддержка
 */
export const Support = () => {
  const {
    InfoRender,
    SuccessViewRender,
    ErrorViewRender,
    subject,
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
  } = useTechSupportMessage(TECH_SUPPORT_MESSAGE_TYPES.SUPPORT);

  const requiredMessage = getUiMessages('requiredMessage');
  const wrongEmailMessage = getUiMessages('wrongEmailMessage');

  return (
    <L.Loader
      isLoading={isLoading}
      className="page-content padding-x-32 padding-y-16
                border-top no-background"
    >
      <L.Div className="page-wrapper margin-bottom-32 padding-bottom-8">
        <L.P className="padding-bottom-24">
          Форма предназначена исключительно для сообщений о неработоспособности
          сервиса.
        </L.P>

        <L.Dl className="list form w-30 margin-bottom-32">
          <LabeledField label="Тема">
            <L.Input
              isRequired
              requiredMessage={requiredMessage}
              form="support"
              name="supportTitle"
              placeholder="Введите тему"
              value={subject}
              onChange={(el) => setSubject(el.component.value)}
              maxLength={255}
            />
          </LabeledField>
          <LabeledField
            label="Сообщение"
            description="Опишите проблему или задайте вопрос"
            classNameDescription="txt-gray"
          >
            <L.Textarea
              isRequired
              requiredMessage={requiredMessage}
              form="support"
              name="supportText"
              placeholder="Введите текст"
              value={text}
              onChange={(el) => setText(el.component.value)}
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
              form="support"
              name="supportEmail"
              validator="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.component.value)}
            />
          </LabeledField>
          <LabeledField
            label="Документ"
            description="Предоставление скриншота
                        может ускорить решение Вашей проблемы"
          >
            <L.FileDrop
              form="support"
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
      </L.Div>

      <L.Div className="toolbar fixed flex-row align-items-center padding-x-32">
        <SubmitButton
          form="support"
          className="margin-left-auto success"
          onClick={() => submit()}
        >
          {getUiMessages('btnSubmit')}
        </SubmitButton>
      </L.Div>
    </L.Loader>
  );
};
