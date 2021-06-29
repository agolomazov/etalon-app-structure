/* eslint-disable max-lines */
import { createNumericGenerator } from '@common/utils';

import { APPEAL_TYPES } from './constants';

const genId = createNumericGenerator();

/**
 * Поля используемые фабрикой для отображения на UI в дополнительной информации по обращению,
 * в зависимости от типа обращения
 */
export const APPEAL_DETAILS_TYPES = {
  /** Нет подходящей ЖС */
  [APPEAL_TYPES.NO_SUITABLE_LIFE_SITUATION]: [
    {
      id: genId(),
      type: 'text',
      field: ['landlord', 'name'],
      fieldText: 'Территориальный орган',
    },
    {
      id: genId(),
      type: 'text',
      field: ['appealSubject'],
      fieldText: 'Тема обращения',
    },
    {
      id: genId(),
      type: 'text',
      field: ['appealText'],
      fieldText: 'Текст обращения',
    },
    {
      id: genId(),
      type: 'files',
      field: ['attachments'],
      fieldText: 'Документы',
    },
  ],
  /** Направить скан-копию подписанного акта сверки */
  [APPEAL_TYPES.SCANNED_ACT]: [
    {
      id: genId(),
      type: 'contract',
      field: ['contract'],
      fieldText: 'Договор',
    },
    {
      id: genId(),
      type: 'date',
      field: ['contract', 'date'],
      fieldText: 'Дата договора',
    },
    {
      id: genId(),
      type: 'dateRange',
      field: '',
      fieldFrom: ['reconciliationActBeginDate'],
      fieldTo: ['reconciliationActEndDate'],
      fieldText: 'Период формирования акта сверки',
    },
    {
      id: genId(),
      type: 'file',
      field: ['attachment'],
      fieldText: 'Документ',
    },
  ],
  /** Направить скан-копию подписанного акта сверки */
  [APPEAL_TYPES.REQUEST_ACT]: [
    {
      id: genId(),
      type: 'contract',
      field: ['contract'],
      fieldText: 'Договор',
    },
    {
      id: genId(),
      type: 'date',
      field: ['contract', 'date'],
      fieldText: 'Дата договора',
    },
    {
      id: genId(),
      type: 'dateRange',
      field: '',
      fieldFrom: ['reconciliationActBeginDate'],
      fieldTo: ['reconciliationActEndDate'],
      fieldText: 'Период формирования акта сверки',
    },
  ],
  /** Жалоба на акт */
  [APPEAL_TYPES.COMPLAINT_ON_DOCUMENT]: [
    {
      id: genId(),
      type: 'text',
      field: ['landlord', 'name'],
      fieldText: 'Территориальный орган',
    },
    {
      id: genId(),
      type: 'contractNoId',
      field: ['documentNumber'],
      fieldText: 'Документ',
    },
    {
      id: genId(),
      type: 'date',
      field: ['documentDate'],
      fieldText: 'Дата документа',
    },
    {
      id: genId(),
      type: 'text',
      field: ['complaintCause'],
      fieldText: 'Основание для подачи жалобы',
    },
    {
      id: genId(),
      type: 'text',
      field: ['demands'],
      fieldText: 'Требования лица, подающего жалобу',
    },
    {
      id: genId(),
      type: 'files',
      field: ['attachments'],
      fieldText: 'Документы',
    },
  ],
  /** Жалоба на действие/бездействие должностных лиц */
  [APPEAL_TYPES.COMPLAINT_ON_ACTION]: [
    {
      id: genId(),
      type: 'text',
      field: ['landlord', 'name'],
      fieldText: 'Территориальный орган',
    },
    {
      id: genId(),
      type: 'text',
      field: ['complaintCause'],
      fieldText: 'Основание для подачи жалобы',
    },
    {
      id: genId(),
      type: 'text',
      field: ['demands'],
      fieldText: 'Требования лица, подающего жалобу',
    },
    {
      id: genId(),
      type: 'files',
      field: ['attachments'],
      fieldText: 'Документы',
    },
  ],
  /** Отсутствует платеж */
  [APPEAL_TYPES.MISSING_PAYMENT]: [
    {
      id: genId(),
      type: 'contract',
      field: ['contract'],
      fieldText: 'Договор',
    },
    {
      id: genId(),
      type: 'date',
      field: ['contract', 'date'],
      fieldText: 'Дата договора',
    },
    {
      id: genId(),
      type: 'text',
      field: ['payerName'],
      fieldText: 'Плательщик',
    },
    {
      id: genId(),
      type: 'text',
      field: ['paymentOrder', 'number'],
      fieldText: 'Номер платёжного поручения',
    },
    {
      id: genId(),
      type: 'date',
      field: ['paymentOrder', 'date'],
      fieldText: 'Дата платёжного поручения',
    },
    {
      id: genId(),
      type: 'text',
      field: ['paymentAmount'],
      fieldText: 'Сумма платежа',
    },
    {
      id: genId(),
      type: 'text',
      field: ['paymentPeriod'],
      fieldText: 'Период платежа',
    },
    {
      id: genId(),
      type: 'file',
      field: ['attachment'],
      fieldText: 'Подтверждающий документ',
    },
    {
      id: genId(),
      type: 'text',
      field: ['comment'],
      fieldText: 'Комментарий',
    },
  ],
  /** Отсутствует договор в ЛК */
  [APPEAL_TYPES.MISSING_CONTRACT_IN_LK]: [
    {
      id: genId(),
      type: 'text',
      field: ['landlord', 'name'],
      fieldText: 'Арендодатель по договору',
    },
    {
      id: genId(),
      type: 'contractNoId',
      field: ['contractNumber'],
      fieldText: 'Договор',
    },
    {
      id: genId(),
      type: 'date',
      field: ['contractDate'],
      fieldText: 'Дата договора',
    },
    {
      id: genId(),
      type: 'text',
      field: ['facilityRentalAddress'],
      fieldText: 'Адрес объекта',
    },
    {
      id: genId(),
      type: 'text',
      field: ['cadastralNumber'],
      fieldText: 'Кадастровый номер объекта',
    },
    {
      id: genId(),
      type: 'file',
      field: ['attachment'],
      fieldText: 'Скан-копия договора',
    },
    {
      id: genId(),
      type: 'text',
      field: ['comment'],
      fieldText: 'Комментарий',
    },
  ],
  /** Смена юридического адреса */
  [APPEAL_TYPES.CHANGE_JURIDICAL_ADDRESS]: [
    {
      id: genId(),
      type: 'files',
      field: ['attachments'],
      fieldText: 'Подтверждающий документ',
    },
    {
      id: genId(),
      type: 'text',
      field: ['comment'],
      fieldText: 'Комментарий',
    },
  ],
  /** Смена организационно-правовой формы */
  [APPEAL_TYPES.CHANGE_ORGANIZATIONAL_LEGAL_FORM]: [
    {
      id: genId(),
      type: 'files',
      field: ['attachments'],
      fieldText: 'Подтверждающий документ',
    },
    {
      id: genId(),
      type: 'text',
      field: ['comment'],
      fieldText: 'Комментарий',
    },
  ],
  /** Смена наименования ЮЛ */
  [APPEAL_TYPES.CHANGE_COMPANY_NAME]: [
    {
      id: genId(),
      type: 'files',
      field: ['attachments'],
      fieldText: 'Подтверждающий документ',
    },
    {
      id: genId(),
      type: 'text',
      field: ['comment'],
      fieldText: 'Комментарий',
    },
  ],
  /** Изменение контактных данных ЮЛ */
  [APPEAL_TYPES.CHANGE_CONTACT_DETAILS]: [
    {
      id: genId(),
      type: 'text',
      field: ['phone'],
      fieldText: 'Телефон',
    },
    {
      id: genId(),
      type: 'text',
      field: ['email'],
      fieldText: 'Почта',
    },
    {
      id: genId(),
      type: 'text',
      field: ['comment'],
      fieldText: 'Комментарий',
    },
  ],
  /** Смена руководителя ЮЛ */
  [APPEAL_TYPES.CHANGE_DIRECTOR]: [
    {
      id: genId(),
      type: 'name',
      field: ['name'],
      fieldText: 'ФИО нового руководителя',
    },
    {
      id: genId(),
      type: 'files',
      field: ['attachments'],
      fieldText: 'Подтверждающий документ',
    },
    {
      id: genId(),
      type: 'text',
      field: ['comment'],
      fieldText: 'Комментарий',
    },
  ],
  /** Уведомление о субаренде */
  [APPEAL_TYPES.SUBLEASE_NOTICE]: [
    {
      id: genId(),
      type: 'contract',
      field: ['contract'],
      fieldText: 'Договор',
    },
    {
      id: genId(),
      type: 'date',
      field: ['contract', 'date'],
      fieldText: 'Дата договора',
    },
    {
      id: genId(),
      type: 'text',
      field: ['subtenant'],
      fieldText: 'Субарендатор',
    },
    {
      id: genId(),
      type: 'text',
      field: ['subtenantInn'],
      fieldText: 'ИНН субарендатора',
    },
    {
      id: genId(),
      type: 'contractNoId',
      field: ['subleaseContract', 'number'],
      fieldText: 'Номер договора субаренды',
    },
    {
      id: genId(),
      type: 'date',
      field: ['subleaseContract', 'date'],
      fieldText: 'Дата договора субаренды',
    },
    {
      id: genId(),
      type: 'dateRange',
      field: '',
      fieldFrom: ['subleaseContractDateFrom'],
      fieldTo: ['subleaseContractDateTo'],
      fieldText: 'Период действия договора субаренды',
    },
    {
      id: genId(),
      type: 'file',
      field: ['attachment'],
      fieldText: 'Скан-копия договор субаренды',
    },
    {
      id: genId(),
      type: 'text',
      field: ['comment'],
      fieldText: 'Комментарий',
    },
  ],
  /**  Зачет денежных средств на другой договор */
  [APPEAL_TYPES.OFFSET_TO_DIFFERENT_CONTRACT]: [
    {
      id: genId(),
      type: 'contract',
      field: ['contract'],
      fieldText: 'Договор',
    },
    {
      id: genId(),
      type: 'date',
      field: ['contract', 'date'],
      fieldText: 'Дата договора',
    },
    {
      id: genId(),
      type: 'text',
      field: ['overpaymentRecalculation', 'recalculationAmount'],
      fieldText: 'Сумма, требующая перезачета',
    },
    {
      id: genId(),
      type: 'getDictionaryValue',
      dictionary: 'overpaymentCauseTypes',
      field: ['overpaymentCause'],
      fieldText: 'Причина переплаты',
    },
    {
      id: genId(),
      type: 'getDictionaryValue',
      dictionary: 'obligationTypes',
      field: ['obligationType'],
      fieldText: 'Тип обязательства',
    },
    {
      id: genId(),
      type: 'paymetOrderList',
      field: ['paymentOrders'],
    },
    {
      id: genId(),
      type: 'contract',
      field: ['overpaymentRecalculation', 'contract'],
      fieldText: 'Договор, в счет которого будет произведен перезачет',
    },
    {
      id: genId(),
      type: 'date',
      field: ['overpaymentRecalculation', 'contract', 'date'],
      fieldText: 'Дата договора',
    },
    {
      id: genId(),
      type: 'getDictionaryValue',
      dictionary: 'obligationTypes',
      field: ['overpaymentRecalculation', 'obligationType'],
      fieldText: 'Тип обязательства для перезачета',
    },
    {
      id: genId(),
      type: 'text',
      field: ['overpaymentRecalculation', 'obligationPaymentPeriod'],
      fieldText: 'Период погашения обязательства',
    },
    {
      id: genId(),
      type: 'fileById',
      field: ['scannedAppealFileId'],
      fieldText: 'Cкан-образ подписанного заявления',
    },
  ],
  /** Возврат денежных средств */
  [APPEAL_TYPES.OVERPAYMENT_REFUND]: [
    {
      id: genId(),
      type: 'contract',
      field: ['contract'],
      fieldText: 'Договор',
    },
    {
      id: genId(),
      type: 'date',
      field: ['contract', 'date'],
      fieldText: 'Дата договора',
    },
    {
      id: genId(),
      type: 'text',
      field: ['refundAmount'],
      fieldText: 'Сумма к возврату',
    },
    {
      id: genId(),
      type: 'getDictionaryValue',
      dictionary: 'overpaymentCauseTypes',
      field: ['overpaymentCause'],
      fieldText: 'Причина переплаты',
    },
    {
      id: genId(),
      type: 'paymetOrderList',
      field: ['paymentOrders'],
    },
    {
      id: genId(),
      type: 'payee',
      field: '',
    },
    {
      id: genId(),
      type: 'fileById',
      field: ['scannedAppealFileId'],
      fieldText: 'Cкан-образ подписанного заявления',
    },
  ],
  [APPEAL_TYPES.CHANGE_FACILITY_RENTAL]: [
    {
      id: genId(),
      type: 'contract',
      field: ['contract'],
      fieldText: 'Договор',
    },
    {
      id: genId(),
      type: 'date',
      field: ['contract', 'date'],
      fieldText: 'Дата договора',
    },
    {
      id: genId(),
      type: 'text',
      field: ['facilityAddress'],
      fieldText: 'Текущий адрес объекта',
    },
    {
      id: genId(),
      type: 'text',
      field: ['cadastralNumber'],
      fieldText: 'Кадастровый номер',
    },
    {
      id: genId(),
      type: 'getGlobalDictionaryValue',
      dictionary: 'facilityRentalTypes',
      field: ['facilityType'],
      fieldText: 'Тип объекта',
    },
    {
      id: genId(),
      type: 'text',
      field: ['newFacilityAddress'],
      fieldText: 'Новое значение адреса',
    },
    {
      id: genId(),
      type: 'text',
      field: ['facilityArea'],
      fieldText: 'Новое значение площади',
    },
    {
      id: genId(),
      type: 'text',
      field: ['newCadastralNumber'],
      fieldText: 'Новое значение кадастрового номера',
    },
    {
      id: genId(),
      type: 'text',
      field: ['permittedUse'],
      fieldText: 'Вид разрешенного использования',
    },
    {
      id: genId(),
      type: 'getDictionaryValue',
      dictionary: 'landCategory',
      field: ['facilityCategory'],
      fieldText: 'Категория',
    },
    {
      id: genId(),
      type: 'text',
      field: ['facilityPurpose'],
      fieldText: 'Назначение объекта',
    },
    {
      id: genId(),
      type: 'file',
      field: ['attachment'],
      fieldText: 'Подтверждающий документ',
    },
    {
      id: genId(),
      type: 'text',
      field: ['comment'],
      fieldText: 'Комментарий',
    },
  ],
  [APPEAL_TYPES.MISSING_DATA_IN_FACILITY]: [
    {
      id: genId(),
      type: 'contract',
      field: ['contract'],
      fieldText: 'Договор',
    },
    {
      id: genId(),
      type: 'date',
      field: ['contract', 'date'],
      fieldText: 'Дата договора',
    },
    {
      id: genId(),
      type: 'text',
      field: ['missingFacilityData', 'address'],
      fieldText: 'Количество объектов с неуказанным адресом',
    },
    {
      id: genId(),
      type: 'text',
      field: ['missingFacilityData', 'area'],
      fieldText: 'Количество объектов с неуказанной площадью',
    },
    {
      id: genId(),
      type: 'text',
      field: ['missingFacilityData', 'cadastralNumber'],
      fieldText: 'Количество объектов с неуказанным кадастровым номером',
    },
    {
      id: genId(),
      type: 'text',
      field: ['comment'],
      fieldText: 'Комментарий',
    },
  ],
  /** Получения документов на бумажном носителе */
  [APPEAL_TYPES.CONSENT_TO_PAPER_WORKFLOW]: [
    {
      id: genId(),
      type: 'fileById',
      field: ['applicationFileId'],
      fieldText: 'Cкан-образ подписанного заявления',
    },
    {
      id: genId(),
      type: 'fileById',
      field: ['powerOfAttorneyFileId'],
      fieldText: 'Cкан-образ доверенности',
    },
  ],
  /** Отказ от получения документов на бумажном носителе */
  [APPEAL_TYPES.REFUSAL_FROM_PAPER_WORKFLOW]: [
    {
      id: genId(),
      type: 'fileById',
      field: ['applicationFileId'],
      fieldText: 'Cкан-образ подписанного заявления',
    },
    {
      id: genId(),
      type: 'fileById',
      field: ['powerOfAttorneyFileId'],
      fieldText: 'Cкан-образ доверенности',
    },
  ],
};
