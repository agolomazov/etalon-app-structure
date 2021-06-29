import React, { useState, useEffect } from 'react';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';

import { getUiMessages } from '@common/messages';
import { LabeledField } from '@common/components';

import { SITUATION_FORM_TYPES } from '../../../constants';

import { useDownloadForm } from '../../../hooks';

import { AttachmentDrop } from '../../attachments';

import {
  FORM_NAME,
  UPLOAD_FORM_NAME,
  APPEAL_FIELDS,
  APPEAL_TYPE_MAP,
} from '../constants';

import { selectors } from '../selectors';
import { formMapper } from '../mapper';

/**
 * ## Компонент для загрузки заявления
 *
 * @example
 * <OverpaymentUpload />
 *
 * @returns {React.FC} Компонент для загрузки заявления
 */
export const OverpaymentUpload = ({ shouldRender }) => {
  const appealType = useSelector(selectors.appealType);
  const appealId = useSelector(selectors.appealId);
  const appeal = useSelector(selectors.appeal);
  const [canDownloadAppealDoc, setCanDownloadAppealDoc] = useState(false);
  const { isLoading, download } = useDownloadForm({
    appealType: APPEAL_TYPE_MAP[appealType]?.situationAppealType,
    appealId,
    formType: SITUATION_FORM_TYPES.OVERPAYMENT_APPEAL_DOCUMENT,
    formSelector: selectors.appeal,
    formMapper,
  });

  useEffect(() => {
    const isValidForm = L.form(FORM_NAME)
      .get()
      .every(({ isValid }) => isValid);
    setCanDownloadAppealDoc(isValidForm);
  }, [appeal]);

  const stepNumber =
    (appealType && APPEAL_TYPE_MAP[appealType].downloadAppealStepNumber) || '';

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <L.H6 className="margin-bottom-12">
        {`${stepNumber}. Скачайте, подпишите и загрузите заявление`}
      </L.H6>

      <L.Dl className="list form w-30 margin-bottom-32">
        <L.Dt>
          <L.Label>Заявление</L.Label>
        </L.Dt>
        <L.Dd>
          <L.Button
            className="warning margin-bottom-12"
            isDisabled={!canDownloadAppealDoc}
            isLoading={isLoading}
            onClick={download}
            name="download"
          >
            {getUiMessages('btnDownload')}
          </L.Button>
          <L.Div className="txt-gray">
            Распечатайте заявление на бланке организации (при его наличии),
            поставьте подпись и печать.
          </L.Div>
        </L.Dd>

        <LabeledField label="Загрузите скан-образ подписанного заявления">
          <AttachmentDrop
            appealId={appealId}
            linkId={APPEAL_TYPE_MAP[appealType]?.scannedAppealFileLinkId}
            isRequired
            name={APPEAL_FIELDS.scannedAppealFile}
            form={UPLOAD_FORM_NAME}
          />
        </LabeledField>
      </L.Dl>
    </>
  );
};
