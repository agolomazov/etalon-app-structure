import React from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';
import { LabeledField, SubmitButton } from '@common/components';
import { useActions } from '@common/hooks';

import { SITUATION_TYPES, SITUATION_FORM_TYPES } from '../../../constants';

import {
  LifeSituation,
  LifeSituationWrapper,
  LifeSituationMain,
  LifeSituationFooter,
} from '../../../components';

import {
  useItems,
  useLifeSituationSubmit,
  useDownloadForm,
} from '../../../hooks';

import { AttachmentDrop } from '../../attachments';

import {
  APPEAL_TYPE_MAP,
  APPEAL_FIELDS,
  APPEAL_DROPDOWN_ITEMS,
} from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';
import { appealMapper } from '../mapper';

/**
 * ## Компонент ЖС Заявление на получение / на отказ от получения документов на бумажном носителе
 *
 * @example
 * <PaperCarrier/>
 *
 * @returns {React.FC} Компонент ЖС Заявление на получение / на отказ от получения документов на бумажном носителе
 */
export const PaperCarrier = () => {
  const { chooseAppealTypeFlow } = useActions(actions);
  const appealType = useSelector(selectors.appealType);
  const { id: appealId } = useSelector(selectors.appeal);
  const isSomethingLoading = useSelector(selectors.isSomethingLoading);
  const scannedAppealFileLinkId =
    APPEAL_TYPE_MAP[appealType]?.scannedAppealFileLinkId;
  const scannedPowerOfAttorneyFileLinkId =
    APPEAL_TYPE_MAP[appealType]?.scannedPowerOfAttorneyFileLinkId;

  const appealTypeItems = useItems({
    items: APPEAL_DROPDOWN_ITEMS,
    onChange: ({ value }) => chooseAppealTypeFlow(value),
  });

  const { isLoading: isDownloadFormLoading, download } = useDownloadForm({
    appealType: APPEAL_TYPE_MAP[appealType]?.situationAppealType,
    appealId,
    formType: SITUATION_FORM_TYPES.PAPER_WORKFLOW_APPLICATION_APPEAL_DOCUMENT,
    formSelector: () => undefined,
  });

  const onSubmit = useLifeSituationSubmit({
    appealIds: [appealId],
    appealType: APPEAL_TYPE_MAP[appealType]?.situationAppealType,
    appealSelector: selectors.appeal,
    appealMapper,
  });

  return (
    <LifeSituation
      lifeSituationType={SITUATION_TYPES.PAPER_WORKFLOW_APPLICATION}
      beforeExitLifeSituationAction={actions.beforeExitLifeSituationFlow}
    >
      <LifeSituationWrapper>
        <LifeSituationMain>
          <>
            <L.H6 className="margin-bottom-12">1. Выберите тип заявления</L.H6>

            <L.Dl className="list form w-30 margin-bottom-32">
              <LabeledField label="Тип">
                <L.Div className="flex-row">
                  <L.DropDownSelect
                    className="width-100"
                    placeholder="Выберите"
                    isDisabled={isSomethingLoading}
                    name={APPEAL_FIELDS.appealType}
                    form="paper-carrier"
                    isRequired
                    requiredMessage={getUiMessages('requiredMessage')}
                    {...appealTypeItems}
                  />
                </L.Div>
              </LabeledField>
            </L.Dl>

            <L.Div shouldRender={!!appealId}>
              <L.H6 className="margin-bottom-12">
                2. Скачайте, подпишите и загрузите заявление
              </L.H6>

              <L.Dl
                className="list form w-30 padding-bottom-4
                         margin-bottom-32 border-bottom"
              >
                <LabeledField label="Заявление">
                  <L.Button
                    className="warning margin-bottom-12"
                    isLoading={isDownloadFormLoading}
                    onClick={download}
                    name="download"
                  >
                    {getUiMessages('btnDownload')}
                  </L.Button>
                  <L.Div className="txt-gray">
                    Распечатайте заявление на&nbsp;бланке организации (при его
                    наличии), поставьте подпись и&nbsp;печать (при наличии
                    печати). В&nbsp;случае необходимости приложите скан-образ
                    доверенности для подтверждения полномочий
                    на&nbsp;подписание.
                  </L.Div>
                </LabeledField>

                <LabeledField
                  label="Загрузите скан-образ
                         подписанного заявления"
                >
                  <AttachmentDrop
                    isRequired
                    appealId={appealId}
                    linkId={scannedAppealFileLinkId}
                    form="paper-carrier"
                    name={APPEAL_FIELDS.appealFile}
                  />
                </LabeledField>

                <LabeledField label="Загрузите скан-образ доверенности">
                  <AttachmentDrop
                    appealId={appealId}
                    linkId={scannedPowerOfAttorneyFileLinkId}
                    form="paper-carrier"
                    name={APPEAL_FIELDS.powerOfAttorneyFile}
                  />
                </LabeledField>
              </L.Dl>
            </L.Div>
          </>
        </LifeSituationMain>
        <LifeSituationFooter>
          <SubmitButton
            _success
            form="paper-carrier"
            isDisabled={isSomethingLoading || isDownloadFormLoading}
            onClick={onSubmit}
          >
            {getUiMessages('btnSubmit')}
          </SubmitButton>
        </LifeSituationFooter>
      </LifeSituationWrapper>
    </LifeSituation>
  );
};
