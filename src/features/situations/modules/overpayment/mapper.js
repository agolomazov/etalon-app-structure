import { setServerDateFormat } from '@common/utils';

import { SITUATION_APPEAL_TYPES } from '../../constants';
import { RECIPIENT_TYPES } from './constants';

/**
 * Метод преобразует общие поля обращения
 *
 * @param {object} appeal - объект с полями обращения
 *
 * @returns {object} объект с общими полями в серверном формате
 */
const mapAppealGeneralFields = (appeal) => {
  const {
    id: appealId,
    contract: { id, number, date },
    reason: overpaymentCause,
    scannedAppealFileId,
    paymentOrders,
  } = appeal;

  return {
    id: appealId,
    contract: {
      id,
      number,
      date,
    },
    overpaymentCause,
    paymentOrders: paymentOrders.map(
      ({ paymentOrderNumber, paymentOrderDate, paymentOrderFileId }) => ({
        paymentOrder: {
          number: Number(paymentOrderNumber),
          date: setServerDateFormat(paymentOrderDate),
        },
        fileId: paymentOrderFileId,
      }),
    ),
    scannedAppealFileId,
  };
};

/**
 * Метод преобразует данные физического лица - получателя платежа при возврате переплаты
 *
 * @param {object} appeal - объект с полями обращения
 *
 * @returns {object} объект с данными физического лица
 */
const mapAppealOverpaymentRefundNaturalPerson = (appeal) => {
  const {
    personFio: fullName,
    personInn: inn,
    passportSeries: series,
    passportNumber: number,
    passportFmsUnit: passportIssuedBy,
    passportDate,
    bank: bankName,
    bik: bic,
    bankAccount,
    correspondentAccount: corrAccount,
  } = appeal;

  return {
    payeeNaturalPerson: {
      fullName,
      inn,
      passportSeriesAndNumber: {
        series,
        number,
      },
      passportIssuedBy,
      passportIssueDate: setServerDateFormat(passportDate),
      bankInfo: {
        bankName,
        bic,
        bankAccount,
      },
      corrAccount,
    },
  };
};

/**
 * Метод преобразует данные юридического лица - получателя платежа при возврате переплаты
 *
 * @param {object} appeal - объект с полями обращения
 *
 * @returns {object} объект с данными юридического лица
 */
const mapAppealOverpaymentRefundJuridicalPerson = (appeal) => {
  const {
    companyName,
    companyInn,
    companyKpp,
    bank: bankName,
    bik: bic,
    bankAccount,
    correspondentAccount: corrAccount,
  } = appeal;

  return {
    payeeJuridicalPerson: {
      companyName,
      inn: companyInn,
      kpp: companyKpp,
      bankInfo: {
        bankName,
        bic,
        bankAccount,
      },
      corrAccount,
    },
  };
};

/**
 * Метод преобразует данные бюджетной организации - получателя платежа при возврате переплаты
 *
 * @param {object} appeal - объект с полями обращения
 *
 * @returns {object} объект с данными бюджетной организации
 */
const mapAppealOverpaymentRefundPublicSectorCompany = (appeal) => {
  const {
    companyName,
    companyInn,
    companyKpp,
    bank: bankName,
    bik: bic,
    bankAccount,
    personalAccount,
    kbk: bcc,
  } = appeal;

  return {
    payeePublicSectorCompany: {
      companyName,
      inn: companyInn,
      kpp: companyKpp,
      bankInfo: {
        bankName,
        bic,
        bankAccount,
      },
      personalAccount,
      bcc,
    },
  };
};

/**
 * Метод преобразует обращение "Зачет денежных средств на другой договор" в серверный формат
 *
 * @param {object} appeal - объект с полями обращения
 *
 * @returns {object} Dto для отправки на BE
 */
const mapAppealOverpaymentTransfer = (appeal) => {
  const {
    amount: recalculationAmount,
    contractObligationType,
    transferContractId,
    transferContractNumber,
    transferContractDate,
    transferObligationType,
    transferPeriod,
  } = appeal;

  return {
    appeals: [
      {
        ...mapAppealGeneralFields(appeal),
        obligationType: contractObligationType,
        overpaymentRecalculation: {
          contract: {
            id: transferContractId || undefined,
            number: transferContractNumber,
            date: setServerDateFormat(transferContractDate),
          },
          obligationType: transferObligationType,
          obligationPaymentPeriod: transferPeriod,
          recalculationAmount,
        },
      },
    ],
  };
};

/**
 * Метод преобразует обращение "Зачет денежных средств на другой договор" в серверный формат
 *
 * @param {object} appeal - объект с полями обращения
 *
 * @returns {object} Dto для отправки на BE
 */
const mapAppealOverpaymentRefund = (appeal) => {
  const { amount: refundAmount, recipientType } = appeal;

  /* eslint-disable max-len  */
  const mapRecipientType = {
    [RECIPIENT_TYPES.NATURAL_PERSON]: mapAppealOverpaymentRefundNaturalPerson,
    [RECIPIENT_TYPES.JURIDICAL_PERSON]: mapAppealOverpaymentRefundJuridicalPerson,
    [RECIPIENT_TYPES.FISCAL_ORGANIZATION]: mapAppealOverpaymentRefundPublicSectorCompany,
  };
  /* eslint-enable max-len  */

  return {
    appeals: [
      {
        ...mapAppealGeneralFields(appeal),
        refundAmount,
        ...mapRecipientType[recipientType](appeal),
      },
    ],
  };
};

/**
 * ## Объект с маппингом. Маппит обращения в серверный формат
 * @const
 * @type {object}
 */
const APPEAL_DTO_MAPPER = {
  [SITUATION_APPEAL_TYPES.OVERPAYMENT_TRANSFER]: mapAppealOverpaymentTransfer,
  [SITUATION_APPEAL_TYPES.OVERPAYMENT_REFUND]: mapAppealOverpaymentRefund,
};

/**
 * Метод преобразует обращения в серверный формат
 *
 * @param {object} appealData данные по обращению
 * @param {string} appealType тип обращения, одно из SITUATION_APPEAL_TYPES.OVERPAYMENT_...
 *
 * @returns {object} объект, готовый к отправке на BE
 */
export const appealMapper = ({ appealData, appealType }) =>
  APPEAL_DTO_MAPPER[appealType]
    ? APPEAL_DTO_MAPPER[appealType](appealData)
    : appealData;

/**
 * Метод вытаскивает данные формы из обращения и преобразует их в серверный формат
 *
 * @param {object} formData данные по обращению
 * @param {string} appealType тип обращения, одно из SITUATION_APPEAL_TYPES.OVERPAYMENT_...
 *
 * @returns {object} объект, готовый к отправке на BE
 */
export const formMapper = ({ formData, appealType }) => {
  const {
    appeals: [appeal],
  } = appealMapper({ appealData: formData, appealType });

  const { id, paymentOrders, scannedAppealFileId, ...rest } = appeal;

  return {
    ...rest,
    paymentOrders: paymentOrders.map(({ paymentOrder }) => ({
      ...paymentOrder,
    })),
  };
};
