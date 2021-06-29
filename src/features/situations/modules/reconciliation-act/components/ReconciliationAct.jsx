import React from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';
import { SubmitButton } from '@common/components';
import { useActions } from '@common/hooks';

import { SITUATION_TYPES } from '../../../constants';
import {
  LifeSituation,
  LifeSituationWrapper,
  LifeSituationMain,
  LifeSituationFooter,
} from '../../../components';
import { useItems, useLifeSituationSubmit } from '../../../hooks';

import { genFormName } from '../utils';
import {
  APPEAL_TYPES,
  APPEAL_TYPE_MAP,
  APPEAL_DROPDOWN_ITEMS,
  APPEALS_MAX_COUNT,
} from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';
import { appealMapper } from '../mapper';

import { ReconciliationAppealsList } from './ReconciliationAppealsList';

/**
 * ## Компонент ЖС акт сверки
 *
 * @example
 * <ReconciliationAct/>
 *
 * @param {Object} props - Параметры компонента
 * @property {Array} contracts - список договоров
 *
 * @returns {React$Node} Компонент ЖС акт сверки
 */
export const ReconciliationAct = ({ contracts = [] }) => {
  const { chooseAppealTypeFlow, createAppealFlow } = useActions(actions);
  const appealType = useSelector(selectors.appealType);
  const isSelectedAppealType = useSelector(selectors.isSelectedAppealType);
  const isCreateAppealLoading = useSelector(selectors.isCreateAppealLoading);
  const isSomethingLoading = useSelector(selectors.isSomethingLoading);
  const appeals = useSelector(selectors.appealsCurrent);

  const form = appeals.map(({ id: appealId }) => genFormName(appealId));

  const appealTypeItems = useItems({
    items: APPEAL_DROPDOWN_ITEMS,
    onChange: ({ value }) => chooseAppealTypeFlow(value),
  });

  const onSubmit = useLifeSituationSubmit({
    appealIds: appeals.map(({ id: appealId }) => appealId),
    appealType: APPEAL_TYPE_MAP[appealType]?.situationAppealType,
    appealSelector: selectors.appealsCurrent,
    appealMapper,
  });

  const buttonText =
    isSelectedAppealType && appealType === APPEAL_TYPES.signed
      ? getUiMessages('btnSignAndSubmit')
      : getUiMessages('btnSubmit');

  return (
    <LifeSituation
      lifeSituationType={SITUATION_TYPES.RECONCILIATION_ACT}
      afterCreateLifeSituationAction={actions.afterCreateLifeSituationFlow}
      beforeExitLifeSituationAction={actions.beforeExitLifeSituationFlow}
    >
      <LifeSituationWrapper>
        <LifeSituationMain>
          <L.H6 className="margin-bottom-12">
            1. Направить или запросить акт сверки?
          </L.H6>
          <L.DropDownSelect
            className="width-55 padding-right-8 margin-bottom-16"
            placeholder="Выберите"
            textField="text"
            isDisabled={isSomethingLoading}
            name="appealType"
            form="reconciliation-act"
            isRequired
            requiredMessage={getUiMessages('requiredMessage')}
            {...appealTypeItems}
          />
          <ReconciliationAppealsList
            appeals={appeals}
            contracts={contracts}
            isLoading={isCreateAppealLoading}
          />
          <L.Button
            className="blank padding-none margin-bottom-16"
            shouldRender={isSelectedAppealType}
            onClick={() => createAppealFlow()}
            isDisabled={
              isCreateAppealLoading || appeals.length === APPEALS_MAX_COUNT
            }
          >
            {getUiMessages('btnAppendContract')}
          </L.Button>
        </LifeSituationMain>
        <LifeSituationFooter>
          <SubmitButton
            _success
            isDisabled={isSomethingLoading}
            onClick={onSubmit}
            form={['reconciliation-act', ...form]}
          >
            {buttonText}
          </SubmitButton>
        </LifeSituationFooter>
      </LifeSituationWrapper>
    </LifeSituation>
  );
};
