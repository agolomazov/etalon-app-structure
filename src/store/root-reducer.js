import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createHashHistory } from 'history';

import { getConfig } from '@common/config';

import { appSettingsReducer } from '@features/app-settings';
import { signatureReducer } from '@features/signature';
import { errorsReducer } from '@features/errors';
import { loadingReducer } from '@features/loading';
import { noticeReducer } from '@features/notices';
import { rentalsReducer } from '@features/rental-objects';
import { contractsReducer } from '@features/contracts';
import { userReducer } from '@common/modules/user';
import { tenantReducer } from '@features/tenant';
import { widgetsReducer } from '@features/widgets';
import { calendarReducer } from '@features/calendar';
import { contractDetailsReducer } from '@features/contract-details';
import { paymentReducer } from '@features/payment';
import { paymentHistoryReducer } from '@features/payment-history';
import { accrualsReducer } from '@features/accruals';
import { situationsReducer } from '@features/situations';
import { appealsReducer } from '@features/messages';
import { landlordsReducer } from '@features/landlords';
import { dictionariesReducer } from '@features/dictionaries';
import { supportReducer } from '@features/support';
import { incomingDocumentsReducer } from '@features/incoming-documents';

export const history = createHashHistory();

const rootReducer = combineReducers({
  [getConfig('modules.appSettings')]: appSettingsReducer,
  [getConfig('modules.signature')]: signatureReducer,
  [getConfig('modules.user')]: userReducer,
  [getConfig('modules.tenant')]: tenantReducer,
  [getConfig('modules.widgets')]: widgetsReducer,
  [getConfig('modules.calendar')]: calendarReducer,
  [getConfig('modules.landlords')]: landlordsReducer,
  [getConfig('modules.dictionaries')]: dictionariesReducer,
  [getConfig('modules.contracts')]: contractsReducer,
  [getConfig('modules.contractDetails')]: contractDetailsReducer,
  [getConfig('modules.payment')]: paymentReducer,
  [getConfig('modules.paymentHistory')]: paymentHistoryReducer,
  [getConfig('modules.accruals')]: accrualsReducer,
  [getConfig('modules.rentals')]: rentalsReducer,
  [getConfig('modules.situations')]: situationsReducer,
  [getConfig('modules.incomingDocuments')]: incomingDocumentsReducer,
  [getConfig('modules.appeals')]: appealsReducer,
  [getConfig('modules.support')]: supportReducer,
  [getConfig('modules.errors')]: errorsReducer,
  [getConfig('modules.loading')]: loadingReducer,
  [getConfig('modules.notices')]: noticeReducer,
  router: connectRouter(history),
});

export default rootReducer;
