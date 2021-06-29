const esModules = ['korus-ui', 'crypto-api', 'crypto-types'].join('|');

module.exports = {
  moduleNameMapper: {
    '^@root(.*)$': '<rootDir>/src$1',
    '^@common(.*)$': '<rootDir>/src/common$1',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules}).+\\.js$`],
  setupFiles: ['<rootDir>/jest.init.js'],
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
};
