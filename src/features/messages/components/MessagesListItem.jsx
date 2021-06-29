import React from 'react';
import * as L from 'korus-ui';

import {
  getFileExtension,
  getFileName,
  getDateTime,
  pluralize,
} from '@common/utils';

import { getDirectionIcon, getStatusStyle } from '../utils';
import { APPEAL_TYPES } from '../constants';

/**
 * ## Элемент списока обращений
 * @example
 * <MessagesListItem appeal={appeal} isSelected={true} />
 *
 * @param {object} appeal - объект с информацией по обращению
 * @param {boolean} isSelected - выбрано ли обращене
 *
 *  @returns {React$Node} элемент списка обращеий
 */
export const MessagesListItem = ({ appeal, isSelected }) => {
  const {
    updated,
    direction,
    read,
    title,
    state,
    type,
    lastAttachments = [],
  } = appeal;
  const shouldRenderSignatureSign =
    type === APPEAL_TYPES.INCOMING_DOCUMENT_SIGNATURE_REQUIRED ||
    type === APPEAL_TYPES.INCOMING_DOCUMENT_SIGNATURE_NOT_REQUIRED ||
    type ===
      APPEAL_TYPES.INCOMING_DOCUMENT_SIGNATURE_AND_CONFIRMATION_NOT_REQUIRED;

  return (
    <L.Div
      className={`message-item width-100 pointer ${isSelected ? 'active' : ''}`}
    >
      <L.Div className="message-preview inner-12 margin-x-auto">
        <L.Div className="margin-bottom-8 txt-gray-2">
          <L.I
            className={`message-preview-arrow
                      ${getDirectionIcon(direction)}
                      margin-right-8
                      txt-light-gray`}
          />
          <L.Span className={read ? '' : 'txt-bold'}>
            {getDateTime(updated)}
          </L.Span>
        </L.Div>
        <L.Div className="margin-bottom-8">
          <L.Span className={read ? '' : 'txt-bold'}>{title}</L.Span>
        </L.Div>
        <L.Div
          className={`tag
                    ${getStatusStyle(type, state.name, false)}
                    margin-bottom-12
                    txt-gray-2`}
        >
          {state.name}
        </L.Div>

        <L.Div
          shouldRender={lastAttachments.length > 0}
          className="flex-inline
                    align-items-center
                    width-100
                    txt-gray"
        >
          {lastAttachments.length !== 0 && (
            <>
              <L.I
                className="novicon-doc-list
                          margin-right-8
                          txt-gray"
              />
              <L.Span className="txt-nowrap">
                {getFileName(lastAttachments[0].file.name)}
              </L.Span>
              {getFileExtension(lastAttachments[0].file.name)}
              &nbsp;
            </>
          )}
          {lastAttachments.length > 1 && (
            <L.Span className="shrink-0">
              {` и еще ${lastAttachments.length - 1} ${pluralize(
                'файл',
                'файла',
                'файлов',
              )(lastAttachments.length - 1)}`}
            </L.Span>
          )}
          <L.I
            shouldRender={shouldRenderSignatureSign}
            className="novicon-signed
                      padding-left-24
                      margin-left-auto
                      margin-right-4"
          />
        </L.Div>
      </L.Div>
    </L.Div>
  );
};
