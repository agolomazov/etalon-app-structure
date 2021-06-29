import React, { useCallback } from 'react';
import * as L from 'korus-ui';

import { RubPostfixInputRender } from './renders';

/**
 * ## Инпут для ввода денежной суммы
 *
 * @example
 * <CurrencyInput />
 *
 * @param {object} props - Параметры компонента
 *
 * @returns {React.FC} Инпут для ввода денежной суммы
 */
export const CurrencyInput = (props) => {
  const { onChange, ...inputProps } = props;

  const onChangeCurrency = useCallback(
    (e) => {
      const event = {
        ...e,
        component: {
          ...e.component,
          value:
            (e.component.value && e.component.value.replace(',', '.')) ||
            e.component.value,
        },
      };

      const { value: currency } = event.component;

      if (/^(?:0|[1-9]\d*)(?:\.\d{0,2})?$/.test(currency) || currency === '') {
        if (onChange) {
          onChange(event);
        }
      }
    },
    [onChange],
  );

  return (
    <L.Input
      {...inputProps}
      onChange={onChangeCurrency}
      validator={/^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/}
      inputRender={RubPostfixInputRender}
    />
  );
};
