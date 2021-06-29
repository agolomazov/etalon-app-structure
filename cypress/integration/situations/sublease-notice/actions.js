import {
  formatServerDateToDisplayDate,
  addYearsAndFormatServerDate,
} from '@support/common/utils';

import { APPEAL_DETAILS } from '@support/modules/appeals';

import {
  contract as contractNumberField,
  contractDate as contractDateField,
  subtenantDatePeriod,
} from './fields';

export const typeContractNumberAndGetDatesAction = () => {
  cy.wait('@fetchContracts').then(({ response }) => {
    const contracts = response.body.content || [];

    let contractNumber = '000/00';
    let contractDate = '01.01.2021';
    let contractId = undefined;
    let contractStratDate = '';
    let contractExpirationDate = '';

    expect(contracts.length).to.be.at.least(1);

    const { id, number, date, startDate, expirationDate } = contracts[0];

    contractId = id;
    contractNumber = number;
    contractDate = formatServerDateToDisplayDate(date);
    contractStratDate = startDate;
    contractExpirationDate = expirationDate;

    expect(contractNumber).to.be.a('string');
    expect(contractNumber).to.not.be.empty;
    expect(contractDate).to.be.a('string');
    expect(contractDate).to.not.be.empty;
    expect(contractStratDate).to.be.a('string');
    expect(contractStratDate).to.not.be.empty;
    expect(contractExpirationDate).to.be.a('string');
    expect(contractExpirationDate).to.not.be.empty;

    contractNumberField.field.setValue(contractNumber);
    contractDateField.field
      .shouldHaveValue(contractDate)
      .shouldBeDisabled(true);
    subtenantDatePeriod.field.setValue([
      addYearsAndFormatServerDate(contractStratDate, -10),
      addYearsAndFormatServerDate(contractExpirationDate, 10),
    ]);

    const subleasePeriod = [
      formatServerDateToDisplayDate(contractStratDate),
      formatServerDateToDisplayDate(contractExpirationDate),
    ];
    subtenantDatePeriod.field.shouldHaveValue(subleasePeriod);

    cy.wrap(contractId).as('contractId');
    cy.wrap(contractNumber).as('contractNumber');
    cy.wrap(contractDate).as('contractDate');
    cy.wrap(subleasePeriod).as('subleasePeriod');

    cy.wrap(
      APPEAL_DETAILS.SUBLEASE_NOTICE.title(contractNumber, contractDate),
    ).as('appealTitle');
  });
};
