import React from 'react';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';

import { convertFeedback } from '../utils';

/**
 * ## Компонент отображения поставленой оценки
 * @example
 * <MessageRating feedback={feedback}/>
 *
 * @param {string} feedback - оценка полученная с сервера
 *
 * @returns {React.FC} заглушка если не выбрано обращение
 */
export const MessageRating = ({ feedback }) => (
  <L.Div className="padding-top-32 padding-bottom-16 txt-center">
    <L.H6 className="margin-bottom-16 txt-normal">
      {getUiMessages('ratingSentMessage')}
    </L.H6>
    <L.Rating max={5} value={convertFeedback(feedback)} />
  </L.Div>
);
