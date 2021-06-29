import { testSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';

import { APP_ROUTES } from '@src/constants';
import { callApi, createNumericGenerator } from '@common/utils';

import { PAYMENT_METHOD_TYPES, BCC_TITLE_MAP } from './constants';
import { api } from './api';

import {
  actions as accrualsActions,
  selectors as accrualsSelectors,
} from './modules/accruals';

import {
  sagas,
  selectAllAccrualsForPaymentMethodLk,
  goToEsiaPaymentSaga,
  goToLkPaymentSaga,
} from './sagas';

describe('selectAllAccrualsForPaymentMethodLk - Сага выбирает все начисления для метода оплаты через ЛК', () => {
  test('сага выполняется успешно', () => {
    const bccList = ['16711105021016000120', '16711610121010001140'];

    testSaga(selectAllAccrualsForPaymentMethodLk)
      .next()
      .select(accrualsSelectors.bccList)
      .next(bccList)

      .put(accrualsActions.setBcc(bccList[0]))
      .next()
      .put(accrualsActions.selectBccAccruals(true))
      .next()

      .put(accrualsActions.setBcc(bccList[1]))
      .next()
      .put(accrualsActions.selectBccAccruals(true))
      .next()

      .next()
      .isDone();
  });
});

describe('loadPaymentAccrualsSaga - Сага загружает начисления для оплаты по договору', () => {
  test('сага отправляет запрос и кладет необходимые данные в стор', () => {
    const contractId = '1';

    const response = {
      bccPayments: [
        {
          bcc: '16711610121010001140',
          payments: [
            {
              accrualStartDate: '2020-01-05',
              accrualEndDate: '2020-02-05',
              uin: '16703162894200034352',
              paymentAmount: '10000.00',
            },
          ],
        },
        {
          bcc: '16711105021016000120',
          payments: [
            {
              accrualStartDate: '2020-01-05',
              accrualEndDate: '2020-02-05',
              uin: '16703162894200034352',
              paymentAmount: '10000.43',
            },
          ],
        },
      ],
    };

    let numericId = 1;
    const genId = () => {
      return numericId++;
    };

    const accrualsByBcc = {
      [response.bccPayments[1].bcc]: [
        { ...response.bccPayments[1].payments[0], accrualId: '1' },
      ],
      [response.bccPayments[0].bcc]: [
        { ...response.bccPayments[0].payments[0], accrualId: '2' },
      ],
    };

    testSaga(sagas.loadPaymentAccrualsSaga, contractId)
      .next()
      .put(accrualsActions.reset())
      .next()
      .call(callApi, api.getPaymentAccruals, [contractId])
      .next(response)
      .call(createNumericGenerator)
      .next(genId)
      .put(accrualsActions.setAccrualsByBcc(accrualsByBcc))
      .next()
      .call(selectAllAccrualsForPaymentMethodLk)
      .next()
      .put(accrualsActions.setBcc(response.bccPayments[1].bcc))
      .next()
      .isDone();
  });
});

describe('goToEsiaPaymentSaga - Сага для перехода к оплате выбранных начислений через ЕПГУ', () => {
  test('сага осуществляет редирект на страницу оплаты через ЕПГУ', () => {
    const accrualId = '1';

    const accruals = [
      {
        accrualId,
        accrualStartDate: '2020-01-05',
        accrualEndDate: '2020-02-05',
        uin: '16703162894200034352',
        paymentAmount: '10000.00',
        esiaHref: 'http://esia.esia',
      },
    ];

    testSaga(goToEsiaPaymentSaga)
      .next()
      .select(accrualsSelectors.selectedAccruals)
      .next(accruals)
      .call([window, window.open], accruals[0].esiaHref, '_blank')
      .next()
      .isDone();
  });
});

describe('goToPaymentSaga - Сага для перехода к оплате выбранных начислений', () => {
  const contractId = '1';
  const contractNumber = '248/22';
  const contractDate = '2016-09-01';

  test('сага осуществляет переход к оплате через ЕПГУ', () => {
    testSaga(sagas.goToPaymentSaga, {
      contractId,
      contractNumber,
      contractDate,
    })
      .next()
      .select(accrualsSelectors.paymentMethod)
      .next(PAYMENT_METHOD_TYPES.EPGU)
      .call(goToEsiaPaymentSaga)
      .next()
      .isDone();
  });

  test('сага осуществляет переход к оплате через ЛК', () => {
    testSaga(sagas.goToPaymentSaga, {
      contractId,
      contractNumber,
      contractDate,
    })
      .next()
      .select(accrualsSelectors.paymentMethod)
      .next(PAYMENT_METHOD_TYPES.LK)
      .call(goToLkPaymentSaga, { contractId, contractNumber, contractDate })
      .next()
      .isDone();
  });
});
