import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Отрисовывает элемент списка вопросов
 * @example
 * <QuestionListItem
 *   panelKey={question.id}
 *   question={question.question}
 *   answer={question.answer}
 * />
 * @param {object} props - параметры компонента
 * @param {object} props.panelKey - ключ элемента списка
 * @param {object} props.question - текст вопроса
 * @param {object} props.answer - текст ответа
 *
 * @returns {React.FC} элемент списка вопросов
 */
export const QuestionListItem = ({ panelKey, question, answer, isOpen }) => (
  <L.Collapse.Panel
    panelKey={panelKey}
    wrapperRender={({ elementProps }) => (
      <L.Div
        {...elementProps}
        className={`question-panel margin-bottom-4 ${isOpen && 'border'}`}
      />
    )}
  >
    <L.Collapse.Heading
      wrapperRender={({ elementProps }) => (
        <L.Div
          {...elementProps}
          className={`collapse-heading-wrapper quick-view ${
            isOpen && 'quick-view-selected'
          }`}
        />
      )}
      iconRender={() => null}
    >
      <L.H6 className="txt-normal">
        <L.Span className="question-num block-inline">{`${panelKey}.`}</L.Span>
        {question}
      </L.H6>
    </L.Collapse.Heading>
    <L.Collapse.Body>
      <L.Div className="question-panel-content inner-16 txt-large">
        {answer}
      </L.Div>
    </L.Collapse.Body>
  </L.Collapse.Panel>
);
