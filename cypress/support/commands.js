// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-file-upload';

import { LOGIN_TYPES, PERMISSIONS } from '@support/common/constants';

const toCapitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

Cypress.Commands.add(
  'login',
  ({
    type,
    withPermissions = [PERMISSIONS.GENERIC.READ, PERMISSIONS.GENERIC.WRITE],
    withoutPermissions = [],
  } = {}) => {
    cy.clearCookies();

    const users = Cypress.env('users') || [];

    const user = users.find(
      ({ type: organizationType, permissions }) =>
        organizationType === type &&
        (withPermissions.length > 0
          ? withPermissions.every((permission) =>
              permissions.includes(permission),
            )
          : permissions.length === 0) &&
        !withoutPermissions.some((permission) =>
          permissions.includes(permission),
        ),
    );

    if (!user)
      throw new Error(
        `Пользователь с типом ${type}, имеющий привилегии ${withPermissions} и неимеющий привилегии ${withoutPermissions} не найден`,
      );

    const { snils, password, organizationName } = user;

    const displayError = (field) => `У пользователя не найдено поле "${field}"`;

    if (!snils) throw new Error(displayError('snils'));
    if (!password) throw new Error(displayError('password'));
    if (!organizationName) throw new Error(displayError('organizationName'));

    cy.task('esiaLogin', {
      loginUrl: Cypress.config().baseUrl,
      snils,
      password,
      organizationName,
    }).then(({ cookies }) => {
      Cypress.env('cookies', cookies);
      cookies.forEach(({ name, value, domain, path, httpOnly }) =>
        cy.setCookie(name, value, { domain, path, httpOnly }),
      );
    });
  },
);

Object.values(LOGIN_TYPES).forEach((type) => {
  const commandName = `loginBy${toCapitalize(type.toLowerCase())}`;

  Cypress.Commands.add(
    commandName,
    ({ withPermissions, withoutPermissions } = {}) => {
      cy.login({ type, withPermissions, withoutPermissions });
    },
  );
});

Cypress.Commands.add('getAliases', (aliases = []) => {
  const values = [];

  aliases.forEach((alias) =>
    cy.get(alias).then((value) => {
      values.push(value);
    }),
  );

  return cy.wrap(values);
});

Cypress.Commands.add('getByName', (name) => cy.get(`[name="${name}"]`));

Cypress.Commands.add(
  'shouldExistLabeledField',
  { prevSubject: 'element' },
  (subject, { label, description, tooltip } = {}) => {
    cy.get(subject).should('exist');
    if (!label) return;

    cy.get(subject).parents('dd').prev('dt').as('container');
    cy.get('@container').find('label').contains(label).should('exist');

    if (description) {
      cy.get('@container').find('div').contains(description).should('exist');
    }

    //TODO tooltip
  },
);

Cypress.Commands.add(
  'getInfoField',
  { prevSubject: 'optional' },
  (subject, label) => {
    return subject
      ? cy.wrap(subject).contains(label).next()
      : cy.contains(label).next();
  },
);

Cypress.Commands.add(
  'shouldInvalidValidation',
  { prevSubject: 'element' },
  (subject, message) => {
    return cy.get(subject).then(($element) => {
      let $invalidMesageContainer;
      if ($element.attr('type') === 'file') {
        $invalidMesageContainer = $element.parent().parent().next();
        cy.get(subject)
          .parents('.filedrop-wrapper')
          .should('have.class', 'danger');
      } else if ($element.attr('class') === 'textarea-input danger required') {
        $invalidMesageContainer = $element.next();
        expect($element.attr('aria-invalid')).to.be.eq('true');
      } else {
        expect($element.attr('aria-invalid')).to.be.eq('true');
        $invalidMesageContainer = $element.parent().next();
      }
      if (message) {
        expect($invalidMesageContainer.text()).to.be.eq(message);
      }
    });
  },
);

Cypress.Commands.add(
  'shouldCorrectValidation',
  { prevSubject: 'element' },
  (subject) => {
    return cy.get(subject).then(($element) => {
      if ($element.attr('type') === 'file') {
        cy.get(subject)
          .parents('.filedrop-wrapper')
          .should('not.have.class', 'danger');
      } else {
        expect($element.attr('aria-invalid')).to.be.eq('false');
      }
    });
  },
);

Cypress.Commands.add('deleteDownloadedFile', (name) =>
  cy.task('deleteFile', name),
);

Cypress.Commands.add('findDownloadedFile', (name) => cy.task('findFile', name));

beforeEach(() => {
  const cookies = Cypress.env('cookies') || [];

  cookies.forEach(({ name, value, domain, path, httpOnly }) =>
    cy.setCookie(name, value, { path, httpOnly, domain }),
  );
});
