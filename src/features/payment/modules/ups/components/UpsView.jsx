import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';

import { APP_ROUTES } from '@src/constants';
import { LabeledField, CurrencyInput } from '@common/components';
import { useActions } from '@common/hooks';

import { actions } from '../ducks';
import { selectors } from '../selectors';

import { UpsStepLine } from './UpsStepLine';
import { UpsFieldList } from './UpsFieldList';
import { UpsToolbar } from './UpsToolbar';

/**
 * ## Компонент оплаты с динамическими шагами по протоколу ЕПС
 *
 * @example
 * <UpsView />
 *
 * @returns {React.FC} Компонент оплаты с динамическими шагами по протоколу ЕПС
 */
export const UpsView = () => {
  const isLoading = useSelector(selectors.isLoading);
  const isOrderEmpty = useSelector(selectors.isOrderEmpty);
  const currentStepNumber = useSelector(selectors.currentStepNumber);
  const stepsCount = useSelector(selectors.stepsCount);
  const stepFields = useSelector(selectors.stepFields);
  const amount = useSelector(selectors.amount);
  const commission = useSelector(selectors.commission);
  const total = useSelector(selectors.total);

  const isAmountStep = currentStepNumber === stepsCount - 2;
  const isLastStep = currentStepNumber === stepsCount - 1;

  const {
    upsViewUnmountFlow,
    setFieldValue,
    setAmount,
    goToUpsPrevStepFlow,
    goToUpsNextStepFlow,
    goToAcquireFlow,
  } = useActions(actions);

  useEffect(
    () => () => {
      upsViewUnmountFlow();
    },
    [],
  );

  if (isOrderEmpty) {
    return <Redirect to={APP_ROUTES.CONTRACTS} />;
  }

  return (
    <L.Loader
      className="page-content padding-x-32 padding-y-16 border-top"
      isLoading={isLoading}
    >
      <L.Div className="page-wrapper">
        <UpsStepLine
          stepsCount={stepsCount}
          currentStepNumber={currentStepNumber}
        />
        <L.Dl className="list form w-25 margin-bottom-32 padding-y-8">
          <UpsFieldList fields={stepFields} onChange={setFieldValue} />

          <LabeledField label="Сумма" shouldRender={isAmountStep || isLastStep}>
            <CurrencyInput
              className="width-50"
              value={amount}
              isDisabled={isLastStep}
              onChange={(e) => setAmount(e.component.value)}
            />
          </LabeledField>

          <LabeledField label="Комиссия" shouldRender={isLastStep}>
            <CurrencyInput className="width-50" value={commission} isDisabled />
          </LabeledField>

          <LabeledField label="Итого" shouldRender={isLastStep}>
            <CurrencyInput className="width-50" value={total} isDisabled />
          </LabeledField>
        </L.Dl>
      </L.Div>
      <UpsToolbar
        stepsCount={stepsCount}
        currentStepNumber={currentStepNumber}
        onGoToPrevStep={goToUpsPrevStepFlow}
        onGoToNextStep={goToUpsNextStepFlow}
        onGoToAcquire={goToAcquireFlow}
      />
    </L.Loader>
  );
};
