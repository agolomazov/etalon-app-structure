export const ACCRUALS_MOCK = {
  bccPayments: [
    {
      bcc: '16711105021016000120',
      payments: [
        {
          accrualStartDate: '2020-01-05',
          accrualEndDate: '2020-02-05',
          uin: '16703162894200034352',
          paymentAmount: '10000.43',
        },
        {
          accrualStartDate: '2020-01-05',
          accrualEndDate: '2020-02-05',
          uin: '16703162894200034352',
          paymentAmount: '1065.11',
        },
        {
          uin: '16703162894200034352',
          paymentAmount: '3000.01',
        },
        {
          accrualStartDate: '2020-01-05',
          accrualEndDate: '2020-02-05',
          paymentAmount: '5000.02',
        },
        {
          paymentAmount: '10000.00',
        },
      ],
    },

    {
      bcc: '16711610121010001140',
      payments: [
        {
          accrualStartDate: '2020-01-05',
          accrualEndDate: '2020-02-05',
          uin: '16703162894200034352',
          paymentAmount: '10000.00',
        },
        {
          accrualStartDate: '2020-01-05',
          accrualEndDate: '2020-02-05',
          uin: '16703162894200034352',
          paymentAmount: '10000.00',
        },
        {
          uin: '16703162894200034352',
          paymentAmount: '10000.00',
        },
        {
          accrualStartDate: '2020-01-05',
          accrualEndDate: '2020-02-05',
          paymentAmount: '10000.00',
        },
      ],
    },

    {
      bcc: '16711105071016000120',
      payments: [
        {
          accrualStartDate: '2020-01-05',
          accrualEndDate: '2020-02-05',
          uin: '16703162894200034352',
          paymentAmount: '10000.00',
        },
        {
          accrualStartDate: '2020-01-05',
          accrualEndDate: '2020-02-05',
          uin: '16703162894200034352',
          paymentAmount: '10000.00',
        },
        {
          uin: '16703162894200034352',
          paymentAmount: '10000.00',
        },
      ],
    },

    {
      bcc: '16711607090019000140',
      payments: Array(100)
        .fill({})
        .map(() => ({
          accrualStartDate: '2020-01-05',
          accrualEndDate: '2020-02-05',
          uin: '16703162894200034352',
          paymentAmount: '10000.00',
        })),
    },
  ],
};
