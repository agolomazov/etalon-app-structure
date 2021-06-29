import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@src/constants';
import { setDateFormat } from '@common/utils';

import { MessageSignature, MessageSignatureAttachment } from '../attachments';

/**
 * ## Компонент входящего документа
 * @example
 * <MessageDetailsDocument appealData={appealData}/>
 *
 * @param {object} props - Параметры компонента
 * @param {object} props.appealData - информация по обращению
 *
 * @returns {React.FC} Компонент - детали сообщения
 */
export const MessageDetailsDocument = ({ appealData }) => {
  if (appealData === null) {
    return null;
  }
  const {
    additionalData,
    commonData: { id: appealId },
  } = appealData;
  const { attachments = [], contract = {} } = additionalData;
  return (
    <L.Dl className="list w-30 padding-bottom-24 margin-bottom-none">
      <L.Dt>Договор</L.Dt>
      <L.Dd>
        <Link to={APP_ROUTES.CONTRACT_DETAILS(contract.id)}>
          {`№${contract.number}`}
        </Link>
      </L.Dd>
      <L.Dt>Дата договора</L.Dt>
      <L.Dd>
        <L.I className="novicon-datepicker margin-right-12 txt-gray" />
        {setDateFormat(contract.date)}
      </L.Dd>

      {attachments.length > 0 &&
        attachments.map(
          ({ file, tenantSignature, landlordSignature, visualization }) => (
            <React.Fragment key={file.id}>
              <L.Dt>Документ</L.Dt>
              <L.Dd>
                <MessageSignatureAttachment
                  appealId={appealId}
                  attachment={file}
                  visualization={visualization}
                />
              </L.Dd>
              <L.Dt shouldRender={tenantSignature || landlordSignature}>
                Подписи
              </L.Dt>
              <L.Dd>
                {tenantSignature && (
                  <MessageSignature
                    appealId={appealId}
                    signature={tenantSignature}
                  />
                )}
                {landlordSignature && (
                  <MessageSignature
                    appealId={appealId}
                    signature={landlordSignature}
                  />
                )}
              </L.Dd>
            </React.Fragment>
          ),
        )}
    </L.Dl>
  );
};
