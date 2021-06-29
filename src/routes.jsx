import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import { PrivateRoute } from '@common/modules/user';
import { APP_ROUTES } from '@src/constants';
import {
  ProfilePage,
  ContractsListPage,
  ContractDetailsPage,
  ContractPaymentPage,
  ContractPaymentUpsPage,
  RentalObjectsPage,
  MainPage,
  SituationsPage,
  MessagesPage,
  SituationReconciliationActPage,
  SituationContractMissedPage,
  SituationPaymentMissedPage,
  SituationChangeDetailsJuridicalPage,
  SituationSubleaseNoticePage,
  SituationNoSuitablePage,
  SituationComplaintPage,
  SituationOverpaymentPage,
  SituationChangeObjectInfoPage,
  SituationPaperCarrierPage,
  UnconfirmedUserPage,
  HelpPage,
  SupportPage,
  FeedbackPage,
  ConsentToEdmPage,
  AccessDeniedPage,
  NotATenantPage,
} from '@pages';

export const AppRoutes = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <PrivateRoute
        exact
        path={APP_ROUTES.SITUATIONS}
        component={SituationsPage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.SITUATION_ACT}
        component={SituationReconciliationActPage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.SITUATION_CONTRACT_MISSED}
        component={SituationContractMissedPage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.SITUATION_PAYMENT_MISSED}
        component={SituationPaymentMissedPage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.SITUATION_CHANGE_DETAILS}
        component={SituationChangeDetailsJuridicalPage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.SITUATION_SUBLEASE_NOTICE}
        component={SituationSubleaseNoticePage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.SITUATION_NO_SUITABLE}
        component={SituationNoSuitablePage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.SITUATION_COMPLAINT}
        component={SituationComplaintPage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.SITUATION_OVERPAYMENT}
        component={SituationOverpaymentPage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.SITUATION_CHANGE_OBJECT_INFO}
        component={SituationChangeObjectInfoPage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.SITUATION_PAPER_CARRIER}
        component={SituationPaperCarrierPage}
      />
      <PrivateRoute exact path={APP_ROUTES.MAIN_PAGE} component={MainPage} />
      <PrivateRoute
        exact
        path={APP_ROUTES.UNCONFIRMED_USER}
        component={UnconfirmedUserPage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.ACCESS_DENIED}
        component={AccessDeniedPage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.NOT_A_TENANT}
        component={NotATenantPage}
      />
      <PrivateRoute exact path={APP_ROUTES.PROFILE} component={ProfilePage} />
      <PrivateRoute path={APP_ROUTES.MESSAGES} component={MessagesPage} />

      <PrivateRoute
        exact
        path={APP_ROUTES.CONTRACTS}
        component={ContractsListPage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.CONTRACT_DETAILS(':id')}
        component={ContractDetailsPage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.CONTRACT_PAYMENT(':id')}
        component={ContractPaymentPage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.CONTRACT_PAYMENT_UPS(':id')}
        component={ContractPaymentUpsPage}
      />
      <PrivateRoute
        exact
        path={APP_ROUTES.RENTAL_OBJECTS}
        component={RentalObjectsPage}
      />
      <PrivateRoute exact path={APP_ROUTES.HELP} component={HelpPage} />
      <PrivateRoute exact path={APP_ROUTES.SUPPORT} component={SupportPage} />
      <PrivateRoute exact path={APP_ROUTES.FEEDBACK} component={FeedbackPage} />
      <PrivateRoute
        exact
        path={APP_ROUTES.CONSENT_TO_EDM}
        component={ConsentToEdmPage}
      />
    </Switch>
  </ConnectedRouter>
);
