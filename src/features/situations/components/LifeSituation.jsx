import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { actions } from '../ducks';

/**
 * ## Компонент для любой ЖС
 *
 * @example
 * <LifeSituation lifeSituationType={SITUATION_TYPES.RECONCILIATION_ACT}>
 *   <LifeSituationWrapper>
 *      <LifeSituationMain/>
 *      <LifeSituationFooter/>
 *   </LifeSituationWrapper>
 * </LifeSituation>
 *
 * @param {Object} props - Параметры компонента
 * @property {string} lifeSituationType - тип ЖС
 * @property {function} afterCreateLifeSituationAction - action,
 * который будет вызван после создания ЖС
 * @property {function} beforeExitLifeSituationAction - action,
 * который будет вызван перед выходом из ЖС
 *
 * @returns {React$Node} Компонент для любой ЖС
 */
export const LifeSituation = ({
  lifeSituationType,
  afterCreateLifeSituationAction,
  beforeExitLifeSituationAction,
  children,
}) => {
  const dispatch = useDispatch();

  const afterCreateLifeSituationActionRef = useRef(
    afterCreateLifeSituationAction,
  );

  const beforeExitLifeSituationActionRef = useRef(
    beforeExitLifeSituationAction,
  );

  useEffect(() => {
    afterCreateLifeSituationActionRef.current = afterCreateLifeSituationAction;
  }, [afterCreateLifeSituationAction]);

  useEffect(() => {
    beforeExitLifeSituationActionRef.current = beforeExitLifeSituationAction;
  }, [beforeExitLifeSituationAction]);

  useEffect(() => {
    dispatch(
      actions.createLifeSituationFlow({
        lifeSituationType,
        afterCreateLifeSituationAction:
          afterCreateLifeSituationActionRef.current,
      }),
    );
    return () => {
      dispatch(
        actions.exitLifeSituationFlow({
          beforeExitLifeSituationAction:
            beforeExitLifeSituationActionRef.current,
        }),
      );
    };
  }, [lifeSituationType]);

  return <>{children}</>;
};
