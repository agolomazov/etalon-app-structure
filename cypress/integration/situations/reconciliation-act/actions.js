import { formatServerDateToDisplayDate } from '@support/common/utils';

import { makeDatePeriod } from './utils';
import {
  contractNumber as contractNumberField,
  contractDate as contractDateField,
  actPeriod,
} from './fields';

export const typeContractAndReconciliationActDatePeriodAction = () => {
  cy.wait('@fetchContracts').then(({ response }) => {
    const contracts = response.body.content || [];

    let contractId = undefined;
    let contractNumber = '000/00';
    let contractDate = '01.01.2021';
    let datePeriod = ['01.01.2021', '02.01.2021'];

    if (contracts.length > 0) {
      const { id, number, date, startDate, expirationDate } = contracts[0];

      contractId = id;
      contractNumber = number;
      contractDate = formatServerDateToDisplayDate(date);
      datePeriod = makeDatePeriod(startDate, expirationDate);

      expect(contractId).to.be.a('string').and.not.be.empty;
      expect(contractNumber).to.be.a('string').and.not.be.empty;
      expect(contractDate).to.be.a('string').and.not.be.empty;
      expect(startDate).to.be.a('string').and.not.be.empty;
      expect(expirationDate).to.be.a('string').and.not.be.empty;

      contractNumberField.field.setValue(contractNumber);
      contractDateField.field
        .shouldBeDisabled(true)
        .shouldHaveValue(contractDate);
      actPeriod.field.shouldHaveValue(datePeriod);
    } else {
    }

    cy.wrap(contractId).as('contractId');
    cy.wrap(contractNumber).as('contractNumber');
    cy.wrap(contractDate).as('contractDate');
    cy.wrap(datePeriod).as('reconciliationActDatePeriod');
  });
};

export const produceAppealTitleAction = (appealTitleFn) => () => {
  cy.getAliases(['@contractNumber', '@contractDate']).then(
    ([contractNumber, contractDate]) => {
      cy.wrap(appealTitleFn(contractNumber, contractDate)).as('appealTitle');
    },
  );
};
