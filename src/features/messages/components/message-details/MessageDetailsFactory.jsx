import React from 'react';
import * as L from 'korus-ui';
import { pathOr } from 'ramda';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@src/constants';
import {
  setDateFormat,
  getFromToDate,
  getUserFullName,
  getDictionaryText,
} from '@common/utils';

import { DICTIONARY } from '../../constants';
import { APPEAL_DETAILS_TYPES } from '../../fields';
import { getAttachmentDataById } from '../../utils';

import {
  MessagesAttachmentsItem,
  MessagesAttachmentsList,
} from '../attachments';

import { MessageDetailsPayeeContainer } from './MessageDetailsPayeeContainer';

/**
 * ## Компонент отображающий дополнительную информацию по обращению
 * @example
 * <MessageDetailsFactory data={data}/>
 *
 * @param {object} props - Параметры компонента
 * @param {object} props.data - информация по обращению
 * @param {object} props.facilityRentalTypes - словарь типов объектов аренды
 *
 * @returns {React.FC} дополнительную информацию по обращению
 */
export const MessageDetailsFactory = ({ data, facilityRentalTypes }) => {
  const { additionalData } = data;
  const { id: appealId, type } = data.commonData;
  const fields = pathOr(null, [type], APPEAL_DETAILS_TYPES);
  const globalDictionary = { facilityRentalTypes };
  return (
    <L.Dl
      className="
        list w-30 padding-bottom-24 margin-bottom-none border-bottom"
    >
      {fields &&
        fields.map((el) => {
          const shouldRenderField = pathOr(false, el.field, additionalData);
          const shouldRenderList =
            pathOr([], el.field, additionalData).length !== 0;
          switch (el.type) {
            case 'text':
              return (
                shouldRenderField && (
                  <React.Fragment key={el.id}>
                    <L.Dt>{el.fieldText}</L.Dt>
                    <L.Dd>
                      {pathOr('Нет данных', el.field, additionalData)}
                    </L.Dd>
                  </React.Fragment>
                )
              );
            case 'name':
              return (
                shouldRenderField && (
                  <React.Fragment key={el.id}>
                    <L.Dt>{el.fieldText}</L.Dt>
                    <L.Dd>
                      {getUserFullName(
                        pathOr('Нет данных', el.field, additionalData),
                        true,
                      )}
                    </L.Dd>
                  </React.Fragment>
                )
              );
            case 'contract':
              return (
                shouldRenderField && (
                  <React.Fragment key={el.id}>
                    <L.Dt>{el.fieldText}</L.Dt>
                    <L.Dd>
                      {pathOr(false, [...el.field, 'id'], additionalData) ? (
                        <Link
                          to={APP_ROUTES.CONTRACT_DETAILS(
                            pathOr(false, [...el.field, 'id'], additionalData),
                          )}
                        >
                          {`№${pathOr(
                            'Нет данных',
                            [...el.field, 'number'],
                            additionalData,
                          )}`}
                        </Link>
                      ) : (
                        `№${pathOr(
                          'б/н',
                          [...el.field, 'number'],
                          additionalData,
                        )}`
                      )}
                    </L.Dd>
                  </React.Fragment>
                )
              );
            case 'contractNoId':
              return (
                shouldRenderField && (
                  <React.Fragment key={el.id}>
                    <L.Dt>{el.fieldText}</L.Dt>
                    <L.Dd>
                      {`№${pathOr('Нет данных', el.field, additionalData)}`}
                    </L.Dd>
                  </React.Fragment>
                )
              );
            case 'date':
              return (
                shouldRenderField && (
                  <React.Fragment key={el.id}>
                    <L.Dt>{el.fieldText}</L.Dt>
                    <L.Dd>
                      <L.I
                        className="novicon-datepicker
                                  margin-right-12
                                  txt-gray"
                      />
                      {setDateFormat(
                        pathOr('Нет данных', el.field, additionalData),
                      )}
                    </L.Dd>
                  </React.Fragment>
                )
              );
            case 'dateRange':
              return (
                pathOr('false', el.fieldFrom, additionalData) &&
                pathOr('false', el.fieldTo, additionalData) && (
                  <React.Fragment key={el.id}>
                    <L.Dt>{el.fieldText}</L.Dt>
                    <L.Dd>
                      <L.I
                        className="novicon-datepicker
                                  margin-right-12
                                  txt-gray"
                      />
                      {getFromToDate(
                        pathOr('Нет данных', el.fieldFrom, additionalData),
                        pathOr('Нет данных', el.fieldTo, additionalData),
                      )}
                    </L.Dd>
                  </React.Fragment>
                )
              );
            case 'file':
              return (
                shouldRenderField && (
                  <React.Fragment key={el.id}>
                    <L.Dt>{el.fieldText}</L.Dt>
                    <L.Dd>
                      <MessagesAttachmentsItem
                        appealId={appealId}
                        attachment={pathOr(null, el.field, additionalData)}
                      />
                    </L.Dd>
                  </React.Fragment>
                )
              );
            case 'files':
              return (
                shouldRenderList && (
                  <React.Fragment key={el.id}>
                    <L.Dt>{el.fieldText}</L.Dt>
                    <L.Dd>
                      <MessagesAttachmentsList
                        appealId={appealId}
                        attachments={pathOr(null, el.field, additionalData)}
                      />
                    </L.Dd>
                  </React.Fragment>
                )
              );
            case 'getDictionaryValue':
              return (
                shouldRenderField && (
                  <React.Fragment key={el.id}>
                    <L.Dt>{el.fieldText}</L.Dt>
                    <L.Dd>
                      {getDictionaryText(
                        DICTIONARY[el.dictionary],
                        pathOr('Нет данных', el.field, additionalData),
                        'Нет данных',
                      )}
                    </L.Dd>
                  </React.Fragment>
                )
              );
            case 'getGlobalDictionaryValue':
              return (
                shouldRenderField && (
                  <React.Fragment key={el.id}>
                    <L.Dt>{el.fieldText}</L.Dt>
                    <L.Dd>
                      {getDictionaryText(
                        globalDictionary[el.dictionary],
                        pathOr('Нет данных', el.field, additionalData),
                        'Нет данных',
                      )}
                    </L.Dd>
                  </React.Fragment>
                )
              );
            case 'paymetOrderList':
              return (
                shouldRenderField &&
                additionalData.paymentOrders?.length > 0 &&
                additionalData.paymentOrders.map((order) => (
                  <React.Fragment key={order.paymentOrder.number}>
                    <L.Dt>Номер платежного поручения</L.Dt>
                    <L.Dd>{order.paymentOrder.number}</L.Dd>
                    <L.Dt>Дата платежного поручения</L.Dt>
                    <L.Dd>
                      <L.I
                        className="novicon-datepicker
                                  margin-right-12
                                  txt-gray"
                      />
                      {setDateFormat(order.paymentOrder.date)}
                    </L.Dd>
                    {order.fileId && additionalData.attachments?.length > 0 && (
                      <>
                        <L.Dt>Подтверждающий документ</L.Dt>
                        <L.Dd>
                          <MessagesAttachmentsItem
                            appealId={appealId}
                            attachment={getAttachmentDataById(
                              additionalData.attachments,
                              order.fileId,
                            )}
                          />
                        </L.Dd>
                      </>
                    )}
                  </React.Fragment>
                ))
              );
            case 'fileById':
              return (
                shouldRenderField && (
                  <React.Fragment key={el.id}>
                    <L.Dt>{el.fieldText}</L.Dt>
                    <L.Dd>
                      <MessagesAttachmentsItem
                        appealId={appealId}
                        attachment={getAttachmentDataById(
                          additionalData.attachments,
                          pathOr(null, el.field, additionalData),
                        )}
                      />
                    </L.Dd>
                  </React.Fragment>
                )
              );
            case 'payee':
              return (
                <React.Fragment key={el.id}>
                  <MessageDetailsPayeeContainer
                    additionalData={additionalData}
                  />
                </React.Fragment>
              );
            default:
              return null;
          }
        })}
    </L.Dl>
  );
};
