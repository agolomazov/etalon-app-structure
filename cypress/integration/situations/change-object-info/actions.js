import {
  formatServerDateToDisplayDate,
  getDictionaryText,
} from '@support/common/utils';

import { FACILITY_TYPES } from '@support/common/constants';
import { APPEAL_DETAILS } from '@support/modules/appeals';

import {
  contractNumber as contractNumberField,
  contractDate as contractDateField,
  objectAdress as objectAdressField,
  objectType as objectTypeField,
  cadastralNumber as objectCadastralNumber,
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
      APPEAL_DETAILS.MISSING_DATA_IN_FACILITY.title(
        contractNumber,
        contractDate,
      ),
    ).as('appealTitleMissingData');
    cy.wrap(
      APPEAL_DETAILS.CHANGE_FACILITY_RENTAL.title(contractNumber, contractDate),
    ).as('appealTitleChangeFacilityRental');
  });
};

export const typeAddressAndTypeAction = () => {
  cy.wait('@facilityRentalData').then(({ response }) => {
    const rentals = response.body.content || [];

    let facilityAddress = '';
    let facilityCadastralNumber = undefined;
    let facilityType = undefined;

    if (rentals.length > 0) {
      const { address, typeId, cadastralNumber } = rentals[0];

      facilityAddress = address;
      facilityCadastralNumber = cadastralNumber;
      facilityType = getDictionaryText(FACILITY_TYPES, typeId);

      expect(facilityAddress).to.be.a('string');
      expect(facilityAddress).to.not.be.empty;
      expect(facilityType).to.be.a('string');
      expect(facilityType).to.not.be.empty;

      objectAdressField.field.setValue(facilityAddress);
      objectTypeField.field
        .shouldHaveValue(facilityType)
        .shouldBeDisabled(true);
      if (facilityCadastralNumber) {
        objectCadastralNumber.field
          .shouldHaveValue(facilityCadastralNumber)
          .shouldBeDisabled(true);
      } else {
        objectCadastralNumber.field.shouldExist(false);
      }
    } else {
      objectAdressField.field.setValue(facilityAddress);
      objectTypeField.field.setValueByIndex(0).shouldBeDisabled(false);
    }
    cy.wrap(facilityAddress).as('facilityAddress');
    cy.wrap(facilityType).as('facilityType');
    cy.wrap(facilityCadastralNumber).as('facilityCadastralNumber');
  });
};

export const getMissingData = () => {
  cy.wait('@missingData').then(({ response }) => {
    console.log(response);
    const missingData = response.body.missingData || {};
    const { address = null, area = null, cadastralNumber = null } = missingData;
    cy.wrap(address).as('missingAddress');
    cy.wrap(area).as('missingArea');
    cy.wrap(cadastralNumber).as('missingCadastralNumber');
  });
};
