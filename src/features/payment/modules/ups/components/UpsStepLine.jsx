import React, { useMemo } from 'react';
import * as L from 'korus-ui';

/**
 * ## Компонент таймлайн, фиксирующий переход между шагами оплаты
 *
 * @example
 * <UpsStepLine stepsCount={3} currentStepNumber={1} />
 *
 * @param {Object} props - Параметры компонента
 * @param {number} props.stepsCount - количество шагов
 * @param {number} props.currentStepNumber - номер текущего шага, начинается с 0
 *
 * @returns {React.FC} Компонент таймлайн, фиксирующий переход между шагами оплаты
 */
export const UpsStepLine = ({ stepsCount = 3, currentStepNumber = 0 }) => {
  const steps = useMemo(
    () =>
      Array(stepsCount)
        .fill(null)
        .map((_, index) => `Шаг ${index + 1}`),
    [stepsCount],
  );

  return (
    <L.StatusBar
      className="padding-x-none padding-bottom-32 margin-y-32"
      data={steps}
      textField="txt"
      typeField="type"
      value={`Шаг ${currentStepNumber + 1}`}
    />
  );
};
