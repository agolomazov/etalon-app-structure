import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';

import {
  Rosim,
  Auth,
  AuthFail,
  Sign,
  Agreement,
  MainPage,
  Profile,
  ContractsList,
  ContractsListEmpty,
  ContractItem,
  ContractPayment,
  PaymentStep1,
  PaymentStep2,
  PaymentStep3,
  PaymentStep4,
  PaymentStep5,
  ObjectsList,
  SituationsList,
  SituationAct,
  SituationContract,
  SituationPayment,
  SituationChangeDetails,
  SituationChangeRentInfo,
  SituationSublease,
  SituationNoSuitable,
  SituationComplaint,
  SituationOverpayment,
  SituationPaperCarrier,
  Messages,
  ErrorApp,
  ErrorFatal,
  Help,
  Support,
  Feedback,
} from '@mockups-pages';

export const AppRoutes = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Rosim} />
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/auth-fail" component={AuthFail} />
      <Route exact path="/sign" component={Sign} />
      <Route exact path="/agreement" component={Agreement} />
      <Route exact path="/main-page" component={MainPage} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/contracts-list" component={ContractsList} />
      <Route exact path="/contracts-list-empty" component={ContractsListEmpty} />
      <Route exact path="/contracts-list/contract-item" component={ContractItem} />
      <Route exact path="/contracts-list/contract-item/contract-payment" component={ContractPayment} />
      <Route exact path="/contracts-list/contract-item/contract-payment/payment-step-1" component={PaymentStep1} />
      <Route exact path="/contracts-list/contract-item/contract-payment/payment-step-2" component={PaymentStep2} />
      <Route exact path="/contracts-list/contract-item/contract-payment/payment-step-3" component={PaymentStep3} />
      <Route exact path="/contracts-list/contract-item/contract-payment/payment-step-4" component={PaymentStep4} />
      <Route exact path="/contracts-list/contract-item/contract-payment/payment-step-5" component={PaymentStep5} />
      <Route exact path="/objects-list" component={ObjectsList} />
      <Route exact path="/situations-list" component={SituationsList} />
      <Route exact path="/situations-list/situation-act" component={SituationAct} />
      <Route exact path="/situations-list/situation-contract" component={SituationContract} />
      <Route exact path="/situations-list/situation-payment" component={SituationPayment} />
      <Route exact path="/situations-list/situation-change-details" component={SituationChangeDetails} />
      <Route exact path="/situations-list/situation-change-rent-info" component={SituationChangeRentInfo} />
      <Route exact path="/situations-list/situation-sublease" component={SituationSublease} />
      <Route exact path="/situations-list/situation-no-suitable" component={SituationNoSuitable} />
      <Route exact path="/situations-list/situation-complaint" component={SituationComplaint} />
      <Route exact path="/situations-list/situation-overpayment" component={SituationOverpayment} />
      <Route exact path="/situations-list/situation-paper-carrier" component={SituationPaperCarrier} />
      <Route exact path="/messages" component={Messages} />
      <Route exact path="/error-app" component={ErrorApp} />
      <Route exact path="/error-fatal" component={ErrorFatal} />
      <Route exact path="/help" component={Help} />
      <Route exact path="/help/support" component={Support} />
      <Route exact path="/feedback" component={Feedback} />
    </Switch>
  </HashRouter>
);
