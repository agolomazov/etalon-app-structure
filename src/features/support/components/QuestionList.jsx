import React, { useCallback } from 'react';
import * as L from 'korus-ui';

import { QuestionListItem } from './QuestionListItem';

import { QUESTIONS_LIST, QUESTIONS_SHOWN_FIRST } from '../constants';

/**
 * ## Отрисовывает список вопросов в разделе помощь
 * @example
 * <QuestionList />
 *
 * @returns {React.FC} Список вопросов
 */
export const QuestionList = () => {
  const [activeKey, setActiveKey] = React.useState();
  const [isMoreQuestion, setIsMoreQuestion] = React.useState(false);
  const onChange = useCallback((ev) => {
    setActiveKey(ev.component.value);
  }, []);
  return (
    <L.Div className="page-wrapper-md">
      <L.Collapse isAccordion activePanelKey={activeKey} onSelect={onChange}>
        {QUESTIONS_LIST &&
          QUESTIONS_LIST.slice(0, QUESTIONS_SHOWN_FIRST).map((question) => (
            <QuestionListItem
              isOpen={question.id === activeKey}
              key={question.id}
              panelKey={question.id}
              question={question.question}
              answer={question.answer}
            />
          ))}
      </L.Collapse>
      <L.Collapsible isOpen={isMoreQuestion}>
        <L.Collapse isAccordion activePanelKey={activeKey} onSelect={onChange}>
          {QUESTIONS_LIST &&
            QUESTIONS_LIST.slice(QUESTIONS_SHOWN_FIRST).map((question) => (
              <QuestionListItem
                isOpen={question.id === activeKey}
                key={question.id}
                panelKey={question.id}
                question={question.question}
                answer={question.answer}
              />
            ))}
        </L.Collapse>
      </L.Collapsible>
      <L.Div className="margin-y-16 txt-center">
        <L.Button
          className="blank"
          onClick={() => setIsMoreQuestion(!isMoreQuestion)}
        >
          {isMoreQuestion ? (
            <>
              <L.I className="novicon-collapse margin-right-8 txt-gray" />
              <L.Span className="txt-gray">Свернуть</L.Span>
            </>
          ) : (
            <>
              <L.I className="novicon-expand margin-right-8 txt-gray" />
              <L.Span className="txt-gray">Смотреть дальше</L.Span>
            </>
          )}
        </L.Button>
      </L.Div>
    </L.Div>
  );
};
