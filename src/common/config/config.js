import { pathOr, split } from 'ramda';

export const config = {
  maxFileSize: 11000,
  modules: {
    appSettings: 'appSettings',
    signature: 'signature',
    contractDetails: 'contractDetails',
    payment: 'payment',
    paymentHistory: 'paymentHistory',
    accruals: 'accruals',
    widgets: 'widgets',
    calendar: 'calendar',
    errors: 'errors',
    loading: 'loading',
    notices: 'notices',
    router: 'router',
    rentals: 'rentals',
    contracts: 'contracts',
    user: 'user',
    tenant: 'tenant',
    situations: 'situations',
    incomingDocuments: 'incomingDocuments',
    support: 'support',
    appeals: 'appeals',
    landlords: 'landlords',
    dictionaries: 'dictionaries',
  },
  environment: process.env.NODE_ENV,
};

/**
 * Метод возвращает значение конфига или значение по умолчанию
 *
 * @param {string} settingPath - Путь к настроке в стиле path/to/need/config
 * @param {any} defaultValue - Значение по умолчанию
 * @param {string} separator - Разделитель для пути
 *
 * @returns {any} - значение конфига или значение по умолчанию
 */
export const getConfig = (settingPath, defaultValue, separator = '.') =>
  pathOr(defaultValue, split(separator, settingPath), config);
