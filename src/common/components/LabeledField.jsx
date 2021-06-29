import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Компонент поле формы с меткой
 *
 * @example
 * <LabeledField label='Договор' description='Введите действующий договор'><L.Input/></LabeledField>
 *
 * @param {Object} props - Параметры компонента
 * @param {string} props.label - метка
 * @param {string} props.description - описание
 * @param {string} props.tooltip - текст всплывающей подсказки
 * @param {string} props.classNameDescription - класс для блока с описанием
 * @param {boolean} props.shouldRender - должен ли рендериться компонент
 *
 * @returns {React.FC} Компонент поле формы с меткой
 */
export const LabeledField = ({
  label,
  description,
  tooltip,
  classNameDescription = 'txt-gray margin-top-8',
  shouldRender = true,
  children,
}) => {
  if (!shouldRender) {
    return null;
  }
  return (
    <>
      <L.Dt>
        <L.Label>
          {label}
          {tooltip && (
            <L.Tooltip title={tooltip} position="top">
              <L.I className="novicon-question txt-gray margin-left-8" />
            </L.Tooltip>
          )}
        </L.Label>
        <L.Div className={classNameDescription} shouldRender={!!description}>
          {description}
        </L.Div>
      </L.Dt>
      <L.Dd>{children}</L.Dd>
    </>
  );
};
