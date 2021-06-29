import React from 'react';
import * as L from 'korus-ui';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../ducks';
import { selectors } from '../selectors';
import { convertFeedback } from '../utils';

/**
 * ## Компонент с оценкой помощи по обращению
 * @example
 * <SetMessageRating shouldRender={false}/>
 *
 * @param {boolean} shouldRender - нужно ли отрисовывать компонент
 *
 * @returns {React$Node} Компонент с оценкой помощи по обращению
 */
export const SetMessageRating = ({ shouldRender }) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [commentValue, setCommentValue] = React.useState('');
  const currentAppealId = useSelector(selectors.currentAppealId);

  React.useEffect(() => {
    if (!currentAppealId) {
      return;
    }
    const feedback = {
      rate: convertFeedback(value),
      comment: commentValue,
      appealId: currentAppealId,
    };
    dispatch(actions.setFeedback(feedback));
  }, [value, commentValue, currentAppealId]);

  if (!shouldRender) {
    return null;
  }
  return (
    <>
      <L.Div className="padding-top-32 padding-bottom-16 txt-center">
        <L.H6 className="margin-bottom-16 txt-normal">
          Специалист помог решить вашу задачу?
        </L.H6>
        <L.Rating
          max={5}
          value={value}
          onChange={(ev) => setValue(ev.component.value)}
        />
      </L.Div>
      <L.Input
        className="width-100 margin-bottom-12"
        form="messages"
        name="reply"
        placeholder="Комментарий"
        value={commentValue}
        onChange={(ev) => setCommentValue(ev.component.value)}
      />
    </>
  );
};
