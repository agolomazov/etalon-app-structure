import React from 'react';
import { useSelector } from 'react-redux';

import { SubmitButton } from '@common/components';
import { getUiMessages } from '@common/messages';

import { SITUATION_TYPES } from '../../../constants';
import {
  LifeSituation,
  LifeSituationWrapper,
  LifeSituationMain,
  LifeSituationFooter,
} from '../../../components';
import {
  useLifeSituationSubmit,
  useDownloadFormIsLoading,
} from '../../../hooks';

import { OverpaymentContract } from './OverpaymentContract';
import { OverpaymentMethod } from './OverpaymentMethod';
import { OverpaymentPaymentOrdersList } from './OverpaymentPaymentOrdersList';
import { OverpaymentTransfer } from './OverpaymentTransfer';
import { OverpaymentRefund } from './OverpaymentRefund';
import { OverpaymentUpload } from './OverpaymentUpload';

import {
  FORM_NAME,
  UPLOAD_FORM_NAME,
  APPEAL_TYPES,
  APPEAL_TYPE_MAP,
} from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';
import { appealMapper } from '../mapper';

/**
 * ## Компонент ЖС "Распорядиться переплатой"
 *
 * @example
 * <Overpayment/>
 *
 * @param {object} props - Параметры компонента
 * @param {object} props.contracts - список договоров
 *
 * @returns {React.FC} Компонент ЖС "Распорядиться переплатой"
 */
export const Overpayment = ({ contracts = [] }) => {
  const appealType = useSelector(selectors.appealType);
  const appealRefundRecipientType = useSelector(
    selectors.appealRefundRecipientType,
  );
  const appealId = useSelector(selectors.appealId);
  const isSomethingLoading = useSelector(selectors.isSomethingLoading);
  const isDownloadFormLoading = useDownloadFormIsLoading();

  const onSubmit = useLifeSituationSubmit({
    appealIds: [appealId],
    appealType: APPEAL_TYPE_MAP[appealType]?.situationAppealType,
    appealSelector: selectors.appeal,
    appealMapper,
  });

  return (
    <LifeSituation
      lifeSituationType={SITUATION_TYPES.OVERPAYMENT}
      afterCreateLifeSituationAction={actions.afterCreateLifeSituationFlow}
      beforeExitLifeSituationAction={actions.beforeExitLifeSituationFlow}
    >
      <LifeSituationWrapper>
        <LifeSituationMain>
          <OverpaymentContract contracts={contracts} />

          <OverpaymentMethod />

          {appealType && appealId && (
            <>
              <OverpaymentPaymentOrdersList />

              <OverpaymentTransfer
                contracts={contracts}
                shouldRender={appealType === APPEAL_TYPES.TRANSFER}
              />

              <OverpaymentRefund
                shouldRender={appealType === APPEAL_TYPES.REFUND}
              />

              <OverpaymentUpload
                shouldRender={
                  appealType === APPEAL_TYPES.TRANSFER ||
                  (appealType === APPEAL_TYPES.REFUND &&
                    appealRefundRecipientType)
                }
              />
            </>
          )}
        </LifeSituationMain>
        <LifeSituationFooter>
          <SubmitButton
            _success
            isDisabled={isSomethingLoading || isDownloadFormLoading}
            form={[FORM_NAME, UPLOAD_FORM_NAME]}
            onClick={onSubmit}
          >
            {getUiMessages('btnSubmit')}
          </SubmitButton>
        </LifeSituationFooter>
      </LifeSituationWrapper>
    </LifeSituation>
  );
};
