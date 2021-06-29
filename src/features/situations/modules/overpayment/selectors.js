import { pathOr } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { getConfig } from '@common/config';

import { selectors as attachmentsSelectors } from '../attachments';

import { APPEAL_TYPES, APPEAL_TYPE_MAP } from './constants';

const situationOverpayment = (state) =>
  state[getConfig('modules.situations')].overpayment;

/**
 * ## [Селектор] Тип обращения по ЖС
 */
const appealType = (state) => situationOverpayment(state).appealType;

/**
 * ## [Селектор] Объект с обращениями
 */
const appeals = (state) => situationOverpayment(state).appeals;

/**
 * ## [Селектор] Договор, по которому есть переплата
 */
const appealContract = (state) => situationOverpayment(state).contract;

/**
 * ## [Селектор] Сумма требующая перезачета / к возврату
 */
const appealAmount = (state) => situationOverpayment(state).amount;

/**
 * ## [Селектор] Причина переплаты
 */
const appealReason = (state) => situationOverpayment(state).reason;

/**
 * ## [Селектор] Объект c платежными поручениями
 */
const paymentOrders = (state) => situationOverpayment(state).paymentOrders;

/**
 * ## [Селектор] Объект с полями обращения "Зачет денежных средств на другой договор"
 */
const appealTransfer = (state) => appeals(state)[APPEAL_TYPES.TRANSFER];

/**
 * ## [Селектор] Объект с полями обращения "Возврат денежных средств"
 */
const appealRefund = (state) => appeals(state)[APPEAL_TYPES.REFUND];

/**
 * ## [Селектор] Тип поручателя при возврате ДС
 */
const appealRefundRecipientType = (state) => appealRefund(state).recipientType;

/**
 * ## [Селектор] Id обращения
 */
const appealId = createSelector(appealType, appeals, (appType, apps) =>
  pathOr(null, [appType, 'id'], apps),
);

/**
 * ## [Селектор] Массив индентификаторов платежных поручений
 */
const appealPaymentOrdersIds = createSelector(
  appealType,
  appeals,
  (appType, apps) => pathOr([], [appType, 'paymentOrdersIds'], apps),
);

/**
 * ## [Селектор] Платежные поручения для текущего обращения
 */
const appealPaymentOrders = createSelector(
  attachmentsSelectors.linksToFiles,
  appealPaymentOrdersIds,
  paymentOrders,
  (linksToFiles, payOrdersIds, payOrders) =>
    payOrdersIds.map((id) => ({
      ...payOrders[id],
      paymentOrderFileId: linksToFiles[id]?.fileId || null,
    })),
);

/**
 * ## [Селектор] Обращение
 */
const appeal = createSelector(
  attachmentsSelectors.linksToFiles,
  appealType,
  appealContract,
  appealAmount,
  appealReason,
  appealPaymentOrders,
  appeals,
  (linksToFiles, appType, contract, amount, reason, payOrders, apps) => ({
    contract,
    amount,
    reason,
    ...pathOr({}, [appType], apps),
    scannedAppealFileId:
      linksToFiles[APPEAL_TYPE_MAP[appType]?.scannedAppealFileLinkId]?.fileId ||
      null,
    paymentOrders: payOrders,
  }),
);

/**
 * ## [Селектор] Сумма к возврату/требующая перезачета превышает сумма переплаты по договору
 */
const isAmountAttention = createSelector(
  appealContract,
  appealAmount,
  (contract, amount) => {
    const { overpaymentAmount } = contract || {};
    return !!(overpaymentAmount && Number(amount) > Number(overpaymentAmount));
  },
);

/**
 * ## [Селектор] Что-то где-то загружается
 */
const { isSomethingLoading } = attachmentsSelectors;

export const selectors = {
  appealType,
  appealContract,
  appealAmount,
  appealReason,
  appealTransfer,
  appealRefund,
  appealRefundRecipientType,
  appealPaymentOrders,
  appealId,
  appeal,
  isAmountAttention,
  isSomethingLoading,
};
