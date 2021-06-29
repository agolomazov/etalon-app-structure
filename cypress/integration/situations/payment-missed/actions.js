import { formatServerDateToDisplayDate } from '@support/common/utils';

import { APPEAL_DETAILS } from '@support/modules/appeals';

import {
  contractNumber as contractNumberField,
  contractDate as contractDateField,
} from './fields';

export const typeContractNumberAndDateAction = () => {
  cy.wait('@fetchContracts').then(({ response }) => {
    const contracts = response.body.content || [];

    let contractNumber = '000/00';
    let contractDate = '01.01.2021';
    let contractId = undefined;

    if (contracts.length > 0) {
      const { id, number, date } = contracts[0];

      contractId = id;
      contractNumber = number;
      contractDate = formatServerDateToDisplayDate(date);

      expect(contractNumber).to.be.a('string');
      expect(contractNumber).to.not.be.empty;
      expect(contractDate).to.be.a('string');
      expect(contractDate).to.not.be.empty;

      contractNumberField.field.setValue(contractNumber);
      contractDateField.field
        .shouldHaveValue(contractDate)
        .shouldBeDisabled(true);
    } else {
      contractNumberField.field.setValue(contractNumber);
      contractDateField.field.setValue(contractDate).shouldBeDisabled(false);
    }

    cy.wrap(contractId).as('contractId');
    cy.wrap(contractNumber).as('contractNumber');
    cy.wrap(contractDate).as('contractDate');
    cy.wrap(
      APPEAL_DETAILS.MISSING_PAYMENT.title(contractNumber, contractDate),
    ).as('appealTitle');
  });
};
