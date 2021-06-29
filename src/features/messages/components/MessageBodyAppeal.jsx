import React from 'react';
import * as L from 'korus-ui';

import { useSelector } from 'react-redux';

import { getDateTime } from '@common/utils';
import { useActions } from '@common/hooks';

import { APPEAL_STATUS } from '../constants';
import { selectors } from '../selectors';
import { actions } from '../ducks';
import { getAppealStatusStyle } from '../utils';

import { MessageDetails } from './message-details';
import { MessageComment } from './MessageComment';
import { MessageRating } from './MessageRating';
import { SetMessageRating } from './SetMessageRating';
import { MessageReply } from './MessageReply';
import { MessagesSendButtonBar } from './MessagesSendButtonBar';

/**
 * ## Компонент с перепиской и информацией по обращению
 * @example
 * <MessageBodyAppeal
 *   facilityRentalTypes={facilityRentalTypes}
 * />
 *
 * @param {object} props - параметры компанента
 * @param {object} props.facilityRentalTypes - словарь типов объектов аренды
 *
 * @returns {React.FC} перепиской и информацией по обращению
 */
export const MessageBodyAppeal = ({ facilityRentalTypes }) => {
  const { sendMessageFlow } = useActions(actions);

  const isButtonActive = useSelector(selectors.isButtonActive);
  const comments = useSelector(selectors.currentAppealComments) || [];
  const currentAppeal = useSelector(selectors.currentAppeal) || null;
  if (currentAppeal === null) {
    return null;
  }
  const {
    id,
    state,
    title,
    created,
    feedback = null,
  } = currentAppeal.commonData;
  const shouldRenderSendBar =
    (APPEAL_STATUS.FINAL_ANSWER === state.name && feedback === null) ||
    APPEAL_STATUS.ADDITIONAL_INFO_REQUESTED === state.name;
  return (
    <>
      <L.Div className="padding-y-16 padding-x-32">
        <L.Div className="flex-row margin-bottom-8 txt-gray-2">
          {getDateTime(created)}
          <L.Div className="margin-left-auto">
            <L.Span
              className={`tag ${getAppealStatusStyle(state.name, false)}`}
            >
              {state.name}
            </L.Span>
          </L.Div>
        </L.Div>
        <L.H5 className="line-height-1">{title}</L.H5>
        <hr className="margin-y-24" />
        <MessageDetails
          appealData={currentAppeal}
          facilityRentalTypes={facilityRentalTypes}
        />
        {comments.length !== 0 &&
          comments.map((comment) => (
            <MessageComment
              appealId={id}
              commentData={comment}
              key={comment.id}
            />
          ))}
        {APPEAL_STATUS.FINAL_ANSWER === state.name && feedback === null && (
          <SetMessageRating shouldRender />
        )}
        {APPEAL_STATUS.FINAL_ANSWER === state.name && feedback !== null && (
          <MessageRating feedback={feedback.rate} />
        )}
        <MessageReply
          shouldRender={APPEAL_STATUS.ADDITIONAL_INFO_REQUESTED === state.name}
        />
      </L.Div>
      {shouldRenderSendBar && (
        <MessagesSendButtonBar
          onClickAction={() => sendMessageFlow()}
          isButtonActive={isButtonActive}
        />
      )}
    </>
  );
};
