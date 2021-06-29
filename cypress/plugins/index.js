/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const globby = require('globby');
const fs = require('fs');

const { esiaLogin } = require('./auth');
const { loadConfig } = require('./extends-config');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const options = {
    webpackOptions: require('../webpack.config'),
    watchOptions: {},
  };

  on('file:preprocessor', webpackPreprocessor(options));

  on('task', {
    esiaLogin,

    // удаление файла
    deleteFile(fileName) {
      if (!fileName) {
        throw new Error('Missing a file mask to seach');
      }
      return globby(`cypress/downloads/${fileName}`).then((list) => {
        if (!list.length) {
          return null;
        }
        if (fs.existsSync(list[0])) {
          fs.unlinkSync(list[0]);
        }
        return null;
      });
    },

    // поиск файла
    findFile(fileName) {
      if (!fileName) {
        throw new Error('Missing a file mask to seach');
      }
      const mask = `cypress/downloads/${fileName}`;
      return globby(mask).then((list) => {
        if (!list.length) {
          throw new Error(`Could not find files matching mask "${fileName}"`);
        }
        return list[0];
      });
    },
  });

  return loadConfig(config.configFile);
};
