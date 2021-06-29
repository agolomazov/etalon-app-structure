import React, { useMemo, useRef } from 'react';
import * as L from 'korus-ui';

import { useValue } from './useValue';

/**
 * @typedef {"ASC"|"DESC"} SelectDirection - Направление сортировки
 */
/**
 * @typedef {object} SelectSortHook
 * @property {string} name - имя
 * @property {Array<[string, SelectDirection]>} value - значение [поле, направление]
 * @property {string} text - текст для отображения
 * @property {function} submit - установить значение сортировки
 * @property {function} reset - сбросить на начальное значение
 * @property {React.FC} Component - Компонент
 */
/**
 * Хук для сортировки
 *
 * @param {object} params - Параметры хука
 * @param {string} params.name - имя
 * @param {Array<object>} params.data - Данные для отображения
 * @param {string} params.textField - имя поля в объектах data, которое содержит текст для отображения
 * @param {string} params.valueField - имя поля в объектах data, которое содержит значение сортировки
 * @param {Array<[string, SelectDirection]>} params.initialValue - начальное значение [поле, направление]
 * @param {"auto" | "manual"} params.submitMode - режим установки (автоматичиский или ручной)
 *
 * @returns {SelectSortHook} результат
 */
export const useSelectSort = ({
  name,
  data,
  textField = 'name',
  valueField = 'code',
  initialValue,
  submitMode = 'auto',
}) => {
  const nameRef = useRef(name);
  const initialValueRef = useRef(initialValue);

  const sortData = useMemo(
    () =>
      data.reduce(
        (acc, el) => [
          ...acc,
          { ...el, direction: 'ASC' },
          { ...el, direction: 'DESC' },
        ],
        [],
      ),
    [data],
  );

  const {
    localValueRef,
    resultValueRef,
    onChangeRef,
    submit,
    reset,
  } = useValue({
    initialValue: useMemo(
      () =>
        sortData.find(
          (el) =>
            el[valueField] === initialValueRef.current[0] &&
            el.direction === initialValueRef.current[1],
        ),
      [sortData, valueField],
    ),
    submitMode,
  });

  const getSortIconClassName = (direction) =>
    `novicon-sort-${direction.toLowerCase()}`;

  const Component = useMemo(
    () => (props) => (
      <L.DropDownSelect
        data={sortData}
        textField={textField}
        onChange={onChangeRef.current}
        value={localValueRef.current}
        itemRender={({ componentProps, Element, elementProps }) => (
          <Element {...elementProps}>
            {componentProps.item[textField]}
            {componentProps.item.direction && (
              <L.I
                className={`${getSortIconClassName(
                  componentProps.item.direction,
                )}
                margin-left-4 margin-right-12 txt-gray right`}
              />
            )}
          </Element>
        )}
        inputRender={({ componentProps, Element, elementProps }) => (
          <>
            <Element {...elementProps} value={elementProps.value} />
            {componentProps.suggestion.direction && (
              <L.I
                className={`${getSortIconClassName(
                  componentProps.suggestion.direction,
                )}
                align-middle margin-left-4 txt-gray right`}
              />
            )}
          </>
        )}
        name={nameRef.current}
        {...props}
      />
    ),
    [sortData, textField],
  );

  return {
    name,
    value: useMemo(
      () => [
        resultValueRef.current?.[valueField],
        resultValueRef.current?.direction,
      ],
      [resultValueRef.current],
    ),
    text: resultValueRef.current?.[textField],
    submit,
    reset,
    Component,
  };
};
