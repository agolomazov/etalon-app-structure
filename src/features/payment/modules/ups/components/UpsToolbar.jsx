import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Тулбар для навигации по шагам
 *
 * @example
 * <UpsToolbar />
 *
 * @param {Object} props - параметры компонента
 * @param {string} props.form - Имя формы
 * @param {number} props.stepsCount - количество шагов
 * @param {number} props.currentStepNumber - номер текущего шага, начинается с 0
 * @param {Function} props.onGoToPrevStep - обработчик перехода на предыдущий шаг
 * @param {Function} props.onGoToNextStep - обработчик перехода на следующий шаг
 * @param {Function} props.onGoToAcquire - обработчик перехода к Эквайрингу
 *
 * @returns {React.FC} Тулбар для навигации по шагам
 */
export const UpsToolbar = ({
  form,
  stepsCount,
  currentStepNumber,
  onGoToPrevStep,
  onGoToNextStep,
  onGoToAcquire,
}) => {
  const isFirstStep = currentStepNumber === 0;
  const isLastStep = currentStepNumber === stepsCount - 1;

  return (
    <L.Div className="toolbar fixed flex-row align-items-center padding-x-32">
      <L.Div className="margin-left-auto">
        <L.Button
          className="margin-left-32"
          isDisabled={isFirstStep}
          onClick={() => onGoToPrevStep()}
        >
          Назад
        </L.Button>
        <L.Button
          form={form}
          className="margin-left-24 success"
          onClick={() => (isLastStep ? onGoToAcquire() : onGoToNextStep())}
        >
          {isLastStep ? 'Оплатить ' : 'Далее'}
        </L.Button>
      </L.Div>
    </L.Div>
  );
};
