import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Кнопка для сабмита формы
 *
 * @example
 * <SubmitButton />
 *
 * @param {L.ButtonTypes.ButtonProps} props - Параметры компонента
 *
 * @returns {React.FC} Кнопка для сабмита формы
 */
export const SubmitButton = (props) => {
  const { isDisabled, form, children, onClick, ...rest } = props;

  const onValidationFail = ({ invalidForms }) => {
    const { name: firstInvalidFieldName } =
      invalidForms[0].fields.find(({ isValid }) => !isValid) || {};

    if (!firstInvalidFieldName) {
      return;
    }

    let invalidElement = document.querySelector(
      `input[name="${firstInvalidFieldName}"]`,
    );

    invalidElement =
      invalidElement.style.display === 'none' ||
      invalidElement.style.visibility === 'hidden'
        ? invalidElement.parentElement
        : invalidElement;

    if (invalidElement) {
      invalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <L.Button
      {...rest}
      isDisabled={isDisabled}
      form={form}
      onClick={onClick}
      onValidationFail={onValidationFail}
    >
      {children}
    </L.Button>
  );
};
