import { getConfig } from '@common/config';

const tenantSelector = (state) => state[getConfig('modules.tenant')];

/**
 * [Селектор] Текст согласия на ЭДО
 */
const consentToEdmText = (state) => tenantSelector(state).consentToEdmText;

export const selectors = {
  consentToEdmText,
};
