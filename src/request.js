import { createHttpClient } from '@common/utils';
import { API_VERSION, API_SERVICES } from './constants';

/**
 * ## Axios клиент для работы с внешним API
 */
export const request = createHttpClient();

/**
 * ## Axios клиент для работы с сервисом Договоры Арендатора
 */
export const tenantContractClient = createHttpClient(
  API_SERVICES.TENANT_CONTRACT,
  API_VERSION,
);
