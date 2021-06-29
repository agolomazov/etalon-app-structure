import {
  getTotalPayment,
  setSortContracts,
  filterByAddress,
  filterByContractDate,
  filterByContractActiveDate,
  filterByContractStatus,
  filterByContractType,
  setFilterContract,
  selectContracts,
} from './utils';

import { CONTRACTS_SORT_FIELDS } from './constants';

describe('getTotalPayment - Метод для получения значения поля "Общая сумма"', () => {
  test('Должен вернуть корректное значение', () => {
    expect(getTotalPayment(50, 200, 400)).toBe(650);
    expect(getTotalPayment('100', 300, '1000')).toBe(1400);
    expect(getTotalPayment('1000', '3900', '1000')).toBe(5900);
    expect(getTotalPayment('', '', '1000')).toBe(1000);
    expect(getTotalPayment('', '', 0)).toBe(0);
    expect(getTotalPayment('', '', '')).toBe(0);
    expect(getTotalPayment(null, null, null)).toBe(0);
    expect(getTotalPayment(null, 100, null)).toBe(100);
    expect(getTotalPayment(null, null, '30000')).toBe(30000);
    expect(getTotalPayment(-1000, -2000, 4000)).toBe(1000);
    expect(getTotalPayment(-1000, -2000, -7000)).toBe(-10000);
  });
});

const contracts = [
  {
    number: '248/22',
    date: '2016-09-01',
    startDate: '2016-09-01',
    expirationDate: '2016-11-01',
    typeId: 'LAND_RENTAL',
    statusId: 'ACTIVE',
    currentPeriodAmountForPayment: '4323.94',
    debtAmount: '8647.87',
    penaltyAmount: '0',
    overpaymentAmount: '0',
    facilityRentalAddress: [
      'обл. Архангельская, р-н. Приморский, МО Катунинское, дер. Лахта',
    ],
  },
  {
    number: '178/15',
    date: '2018-10-01',
    startDate: '2018-10-15',
    expirationDate: '2023-10-15',
    typeId: 'LAND_RENTAL',
    statusId: 'ACTIVE',
    currentPeriodAmountForPayment: '125000.00',
    debtAmount: '0',
    penaltyAmount: '0',
    overpaymentAmount: '0',
    facilityRentalAddress: [
      "Архангельская область, Приморский район, дер. Лахта, муниципальное образование 'Катунинское'",
    ],
  },
  {
    number: '345/25',
    date: '2020-02-16',
    startDate: '2020-03-01',
    expirationDate: '2020-08-31',
    typeId: 'PROPRIETARY_RENTAL',
    statusId: 'TERMINATED',
    currentPeriodAmountForPayment: '0',
    debtAmount: '8500.00',
    penaltyAmount: '1.25',
    overpaymentAmount: '0',
    facilityRentalAddress: [
      'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 1, обл Псковская, г Псков, ул Некрасова, дом 14',
    ],
  },
  {
    number: '250/10',
    date: '2019-01-15',
    startDate: '2019-02-01',
    expirationDate: '2065-01-31',
    typeId: 'PROPRIETARY_RENTAL',
    statusId: 'ACTIVE',
    currentPeriodAmountForPayment: '10000.00',
    debtAmount: '10000.00',
    penaltyAmount: '0',
    overpaymentAmount: '23860.01',
    facilityRentalAddress: [],
  },
];
const contractsSortAddressAsc = [
  {
    number: '250/10',
    date: '2019-01-15',
    startDate: '2019-02-01',
    expirationDate: '2065-01-31',
    typeId: 'PROPRIETARY_RENTAL',
    statusId: 'ACTIVE',
    currentPeriodAmountForPayment: '10000.00',
    debtAmount: '10000.00',
    penaltyAmount: '0',
    overpaymentAmount: '23860.01',
    facilityRentalAddress: [],
  },
  {
    number: '178/15',
    date: '2018-10-01',
    startDate: '2018-10-15',
    expirationDate: '2023-10-15',
    typeId: 'LAND_RENTAL',
    statusId: 'ACTIVE',
    currentPeriodAmountForPayment: '125000.00',
    debtAmount: '0',
    penaltyAmount: '0',
    overpaymentAmount: '0',
    facilityRentalAddress: [
      "Архангельская область, Приморский район, дер. Лахта, муниципальное образование 'Катунинское'",
    ],
  },
  {
    number: '248/22',
    date: '2016-09-01',
    startDate: '2016-09-01',
    expirationDate: '2016-11-01',
    typeId: 'LAND_RENTAL',
    statusId: 'ACTIVE',
    currentPeriodAmountForPayment: '4323.94',
    debtAmount: '8647.87',
    penaltyAmount: '0',
    overpaymentAmount: '0',
    facilityRentalAddress: [
      'обл. Архангельская, р-н. Приморский, МО Катунинское, дер. Лахта',
    ],
  },
  {
    number: '345/25',
    date: '2020-02-16',
    startDate: '2020-03-01',
    expirationDate: '2020-08-31',
    typeId: 'PROPRIETARY_RENTAL',
    statusId: 'TERMINATED',
    currentPeriodAmountForPayment: '0',
    debtAmount: '8500.00',
    penaltyAmount: '1.25',
    overpaymentAmount: '0',
    facilityRentalAddress: [
      'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 1, обл Псковская, г Псков, ул Некрасова, дом 14',
    ],
  },
];
const contractsSortDateAsc = [
  {
    number: '248/22',
    date: '2016-09-01',
    startDate: '2016-09-01',
    expirationDate: '2016-11-01',
    typeId: 'LAND_RENTAL',
    statusId: 'ACTIVE',
    currentPeriodAmountForPayment: '4323.94',
    debtAmount: '8647.87',
    penaltyAmount: '0',
    overpaymentAmount: '0',
    facilityRentalAddress: [
      'обл. Архангельская, р-н. Приморский, МО Катунинское, дер. Лахта',
    ],
  },
  {
    number: '178/15',
    date: '2018-10-01',
    startDate: '2018-10-15',
    expirationDate: '2023-10-15',
    typeId: 'LAND_RENTAL',
    statusId: 'ACTIVE',
    currentPeriodAmountForPayment: '125000.00',
    debtAmount: '0',
    penaltyAmount: '0',
    overpaymentAmount: '0',
    facilityRentalAddress: [
      "Архангельская область, Приморский район, дер. Лахта, муниципальное образование 'Катунинское'",
    ],
  },
  {
    number: '250/10',
    date: '2019-01-15',
    startDate: '2019-02-01',
    expirationDate: '2065-01-31',
    typeId: 'PROPRIETARY_RENTAL',
    statusId: 'ACTIVE',
    currentPeriodAmountForPayment: '10000.00',
    debtAmount: '10000.00',
    penaltyAmount: '0',
    overpaymentAmount: '23860.01',
    facilityRentalAddress: [],
  },
  {
    number: '345/25',
    date: '2020-02-16',
    startDate: '2020-03-01',
    expirationDate: '2020-08-31',
    typeId: 'PROPRIETARY_RENTAL',
    statusId: 'TERMINATED',
    currentPeriodAmountForPayment: '0',
    debtAmount: '8500.00',
    penaltyAmount: '1.25',
    overpaymentAmount: '0',
    facilityRentalAddress: [
      'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 1, обл Псковская, г Псков, ул Некрасова, дом 14',
    ],
  },
];
const contractsSortTotalSumAsc = [
  {
    number: '345/25',
    date: '2020-02-16',
    startDate: '2020-03-01',
    expirationDate: '2020-08-31',
    typeId: 'PROPRIETARY_RENTAL',
    statusId: 'TERMINATED',
    currentPeriodAmountForPayment: '0',
    debtAmount: '8500.00',
    penaltyAmount: '1.25',
    overpaymentAmount: '0',
    facilityRentalAddress: [
      'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 1, обл Псковская, г Псков, ул Некрасова, дом 14',
    ],
  },
  {
    number: '248/22',
    date: '2016-09-01',
    startDate: '2016-09-01',
    expirationDate: '2016-11-01',
    typeId: 'LAND_RENTAL',
    statusId: 'ACTIVE',
    currentPeriodAmountForPayment: '4323.94',
    debtAmount: '8647.87',
    penaltyAmount: '0',
    overpaymentAmount: '0',
    facilityRentalAddress: [
      'обл. Архангельская, р-н. Приморский, МО Катунинское, дер. Лахта',
    ],
  },
  {
    number: '250/10',
    date: '2019-01-15',
    startDate: '2019-02-01',
    expirationDate: '2065-01-31',
    typeId: 'PROPRIETARY_RENTAL',
    statusId: 'ACTIVE',
    currentPeriodAmountForPayment: '10000.00',
    debtAmount: '10000.00',
    penaltyAmount: '0',
    overpaymentAmount: '23860.01',
    facilityRentalAddress: [],
  },
  {
    number: '178/15',
    date: '2018-10-01',
    startDate: '2018-10-15',
    expirationDate: '2023-10-15',
    typeId: 'LAND_RENTAL',
    statusId: 'ACTIVE',
    currentPeriodAmountForPayment: '125000.00',
    debtAmount: '0',
    penaltyAmount: '0',
    overpaymentAmount: '0',
    facilityRentalAddress: [
      "Архангельская область, Приморский район, дер. Лахта, муниципальное образование 'Катунинское'",
    ],
  },
];

const addressAsc = { field: CONTRACTS_SORT_FIELDS.address, direction: 'ASC' };
const addressDesc = { field: CONTRACTS_SORT_FIELDS.address, direction: 'DESC' };
const dateAsc = { field: CONTRACTS_SORT_FIELDS.contractDate, direction: 'ASC' };
const dateDesc = {
  field: CONTRACTS_SORT_FIELDS.contractDate,
  direction: 'DESC',
};
const totalSumAsc = { field: CONTRACTS_SORT_FIELDS.totalSum, direction: 'ASC' };
const totalSumDesc = {
  field: CONTRACTS_SORT_FIELDS.totalSum,
  direction: 'DESC',
};

const blankFilter = {
  filterNumber: '',
  filterContractDate: ['', ''],
  filterAddress: '',
  filterActiveDate: ['', ''],
  filterStatus: '',
  filterType: '',
};
const filter = {
  filterNumber: '5',
  filterContractDate: ['', ''],
  filterAddress: '',
  filterActiveDate: ['', ''],
  filterStatus: '',
  filterType: '',
};
const filterAtive = {
  filterNumber: '5',
  filterContractDate: ['', ''],
  filterAddress: '',
  filterActiveDate: ['', ''],
  filterStatus: 'ACTIVE',
  filterType: '',
};

describe('setSortContracts - Метод сортировки договоров', () => {
  test('Должен вернуть отсортированный массив', () => {
    expect(setSortContracts([], addressAsc)).toStrictEqual([]);
    expect(setSortContracts(contracts, addressAsc)).toStrictEqual(
      contractsSortAddressAsc,
    );
    expect(setSortContracts(contracts, addressDesc)).toStrictEqual(
      contractsSortAddressAsc.reverse(),
    );
    expect(setSortContracts(contracts, dateAsc)).toStrictEqual(
      contractsSortDateAsc,
    );
    expect(setSortContracts(contracts, dateDesc)).toStrictEqual(
      contractsSortDateAsc.reverse(),
    );
    expect(setSortContracts(contracts, totalSumAsc)).toStrictEqual(
      contractsSortTotalSumAsc,
    );
    expect(setSortContracts(contracts, totalSumDesc)).toStrictEqual(
      contractsSortTotalSumAsc.reverse(),
    );
  });
});

describe('filterByAddress - Метод для фильтрации по адрессу', () => {
  const result = [
    {
      number: '345/25',
      date: '2020-02-16',
      startDate: '2020-03-01',
      expirationDate: '2020-08-31',
      typeId: 'PROPRIETARY_RENTAL',
      statusId: 'TERMINATED',
      currentPeriodAmountForPayment: '0',
      debtAmount: '8500.00',
      penaltyAmount: '1.25',
      overpaymentAmount: '0',
      facilityRentalAddress: [
        'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 1, обл Псковская, г Псков, ул Некрасова, дом 14',
      ],
    },
  ];
  test('Должен вернуть отфильтрованный массив', () => {
    expect(filterByAddress([], 'test')).toStrictEqual([]);
    expect(filterByAddress(contracts, '')).toStrictEqual(contracts);
    expect(filterByAddress(contracts, 'test')).toStrictEqual([]);
    expect(filterByAddress(contracts, 'некрасо')).toStrictEqual(result);
  });
});

describe('filterByContractDate - Метод для фильтрации по дате договора', () => {
  const result = [
    {
      number: '345/25',
      date: '2020-02-16',
      startDate: '2020-03-01',
      expirationDate: '2020-08-31',
      typeId: 'PROPRIETARY_RENTAL',
      statusId: 'TERMINATED',
      currentPeriodAmountForPayment: '0',
      debtAmount: '8500.00',
      penaltyAmount: '1.25',
      overpaymentAmount: '0',
      facilityRentalAddress: [
        'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 1, обл Псковская, г Псков, ул Некрасова, дом 14',
      ],
    },
  ];
  test('Должен вернуть отфильтрованный массив', () => {
    expect(filterByContractDate([], ['', ''])).toStrictEqual([]);
    expect(filterByContractDate([], 'test')).toStrictEqual([]);
    expect(filterByContractDate(contracts, ['', ''])).toStrictEqual(contracts);
    expect(filterByContractDate(contracts, 'test')).toStrictEqual([]);
    expect(filterByContractDate(contracts, ['', '15.02.2021'])).toStrictEqual(
      contracts,
    );
    expect(filterByContractDate(contracts, ['15.02.2020', ''])).toStrictEqual(
      result,
    );
    expect(
      filterByContractDate(contracts, ['15.02.2020', '17.02.2020']),
    ).toStrictEqual(result);
  });
});

describe('filterByContractActiveDate - Метод для фильтрации по дате договора', () => {
  const result = [
    {
      number: '248/22',
      date: '2016-09-01',
      startDate: '2016-09-01',
      expirationDate: '2016-11-01',
      typeId: 'LAND_RENTAL',
      statusId: 'ACTIVE',
      currentPeriodAmountForPayment: '4323.94',
      debtAmount: '8647.87',
      penaltyAmount: '0',
      overpaymentAmount: '0',
      facilityRentalAddress: [
        'обл. Архангельская, р-н. Приморский, МО Катунинское, дер. Лахта',
      ],
    },
  ];
  test('Должен вернуть отфильтрованный массив', () => {
    expect(filterByContractActiveDate([], ['', ''])).toStrictEqual([]);
    expect(filterByContractActiveDate([], 'test')).toStrictEqual([]);
    expect(filterByContractActiveDate(contracts, ['', ''])).toStrictEqual(
      contracts,
    );
    expect(filterByContractActiveDate(contracts, 'test')).toStrictEqual([]);
    expect(
      filterByContractActiveDate(contracts, ['01.09.2016', '01.11.2016']),
    ).toStrictEqual(result);
    expect(
      filterByContractActiveDate(contracts, ['', '01.12.2016']),
    ).toStrictEqual(result);
  });
});

describe('filterByContractStatus - Метод для фильтрации по статусу договора', () => {
  const result = [
    {
      number: '345/25',
      date: '2020-02-16',
      startDate: '2020-03-01',
      expirationDate: '2020-08-31',
      typeId: 'PROPRIETARY_RENTAL',
      statusId: 'TERMINATED',
      currentPeriodAmountForPayment: '0',
      debtAmount: '8500.00',
      penaltyAmount: '1.25',
      overpaymentAmount: '0',
      facilityRentalAddress: [
        'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 1, обл Псковская, г Псков, ул Некрасова, дом 14',
      ],
    },
  ];
  test('Должен вернуть отфильтрованный массив', () => {
    expect(filterByContractStatus([], 'ACTIVE')).toStrictEqual([]);
    expect(filterByContractStatus(contracts, '')).toStrictEqual(contracts);
    expect(filterByContractStatus(contracts, 'ACTIVE')).not.toContain(result);
    expect(filterByContractStatus(contracts, 'TERMINATED')).toStrictEqual(
      result,
    );
  });
});

describe('filterByContractType - Метод для фильтрации по типу договора', () => {
  const result = [
    {
      number: '250/10',
      date: '2019-01-15',
      startDate: '2019-02-01',
      expirationDate: '2065-01-31',
      typeId: 'PROPRIETARY_RENTAL',
      statusId: 'ACTIVE',
      currentPeriodAmountForPayment: '10000.00',
      debtAmount: '10000.00',
      penaltyAmount: '0',
      overpaymentAmount: '23860.01',
      facilityRentalAddress: [],
    },
    {
      number: '345/25',
      date: '2020-02-16',
      startDate: '2020-03-01',
      expirationDate: '2020-08-31',
      typeId: 'PROPRIETARY_RENTAL',
      statusId: 'TERMINATED',
      currentPeriodAmountForPayment: '0',
      debtAmount: '8500.00',
      penaltyAmount: '1.25',
      overpaymentAmount: '0',
      facilityRentalAddress: [
        'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 1, обл Псковская, г Псков, ул Некрасова, дом 14',
      ],
    },
  ];
  test('Должен вернуть отфильтрованный массив', () => {
    expect(filterByContractType([], 'PROPRIETARY_RENTAL')).toStrictEqual([]);
    expect(filterByContractType(contracts, '')).toStrictEqual(contracts);
    expect(filterByContractType(contracts, 'PROPRIETARY_RENTAL')).toStrictEqual(
      result,
    );
  });
});

describe('setFilterContract - Метод для фильтрации и сортировки списка договоров', () => {
  const contractsSortAddressAsc = [
    {
      number: '250/10',
      date: '2019-01-15',
      startDate: '2019-02-01',
      expirationDate: '2065-01-31',
      typeId: 'PROPRIETARY_RENTAL',
      statusId: 'ACTIVE',
      currentPeriodAmountForPayment: '10000.00',
      debtAmount: '10000.00',
      penaltyAmount: '0',
      overpaymentAmount: '23860.01',
      facilityRentalAddress: [],
    },
    {
      number: '178/15',
      date: '2018-10-01',
      startDate: '2018-10-15',
      expirationDate: '2023-10-15',
      typeId: 'LAND_RENTAL',
      statusId: 'ACTIVE',
      currentPeriodAmountForPayment: '125000.00',
      debtAmount: '0',
      penaltyAmount: '0',
      overpaymentAmount: '0',
      facilityRentalAddress: [
        "Архангельская область, Приморский район, дер. Лахта, муниципальное образование 'Катунинское'",
      ],
    },
    {
      number: '248/22',
      date: '2016-09-01',
      startDate: '2016-09-01',
      expirationDate: '2016-11-01',
      typeId: 'LAND_RENTAL',
      statusId: 'ACTIVE',
      currentPeriodAmountForPayment: '4323.94',
      debtAmount: '8647.87',
      penaltyAmount: '0',
      overpaymentAmount: '0',
      facilityRentalAddress: [
        'обл. Архангельская, р-н. Приморский, МО Катунинское, дер. Лахта',
      ],
    },
    {
      number: '345/25',
      date: '2020-02-16',
      startDate: '2020-03-01',
      expirationDate: '2020-08-31',
      typeId: 'PROPRIETARY_RENTAL',
      statusId: 'TERMINATED',
      currentPeriodAmountForPayment: '0',
      debtAmount: '8500.00',
      penaltyAmount: '1.25',
      overpaymentAmount: '0',
      facilityRentalAddress: [
        'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 1, обл Псковская, г Псков, ул Некрасова, дом 14',
      ],
    },
  ];
  const resultDateSort = [
    contractsSortDateAsc[1],
    contractsSortDateAsc[2],
    contractsSortDateAsc[3],
  ];
  const resultDateSortActive = [
    contractsSortDateAsc[1],
    contractsSortDateAsc[2],
  ];
  test('Должен вернуть отфильтрованный массив', () => {
    expect(setFilterContract(contracts, true, blankFilter, {})).toStrictEqual(
      contracts,
    );
    expect(
      setFilterContract(contracts, true, blankFilter, addressAsc),
    ).toStrictEqual(contractsSortAddressAsc);
    expect(setFilterContract(contracts, true, filter, dateAsc)).toStrictEqual(
      resultDateSort,
    );
    expect(
      setFilterContract(contracts, true, filterAtive, dateAsc),
    ).toStrictEqual(resultDateSortActive);
  });
});

describe('selectContracts - Метод для фильтрации и сортировки списка договоров', () => {
  const contractsSortAddressAsc = [
    {
      number: '250/10',
      date: '2019-01-15',
      startDate: '2019-02-01',
      expirationDate: '2065-01-31',
      typeId: 'PROPRIETARY_RENTAL',
      statusId: 'ACTIVE',
      currentPeriodAmountForPayment: '10000.00',
      debtAmount: '10000.00',
      penaltyAmount: '0',
      overpaymentAmount: '23860.01',
      facilityRentalAddress: [],
    },
    {
      number: '178/15',
      date: '2018-10-01',
      startDate: '2018-10-15',
      expirationDate: '2023-10-15',
      typeId: 'LAND_RENTAL',
      statusId: 'ACTIVE',
      currentPeriodAmountForPayment: '125000.00',
      debtAmount: '0',
      penaltyAmount: '0',
      overpaymentAmount: '0',
      facilityRentalAddress: [
        "Архангельская область, Приморский район, дер. Лахта, муниципальное образование 'Катунинское'",
      ],
    },
    {
      number: '248/22',
      date: '2016-09-01',
      startDate: '2016-09-01',
      expirationDate: '2016-11-01',
      typeId: 'LAND_RENTAL',
      statusId: 'ACTIVE',
      currentPeriodAmountForPayment: '4323.94',
      debtAmount: '8647.87',
      penaltyAmount: '0',
      overpaymentAmount: '0',
      facilityRentalAddress: [
        'обл. Архангельская, р-н. Приморский, МО Катунинское, дер. Лахта',
      ],
    },
    {
      number: '345/25',
      date: '2020-02-16',
      startDate: '2020-03-01',
      expirationDate: '2020-08-31',
      typeId: 'PROPRIETARY_RENTAL',
      statusId: 'TERMINATED',
      currentPeriodAmountForPayment: '0',
      debtAmount: '8500.00',
      penaltyAmount: '1.25',
      overpaymentAmount: '0',
      facilityRentalAddress: [
        'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 1, обл Псковская, г Псков, ул Некрасова, дом 14',
      ],
    },
  ];
  const contractsSortDateAsc = [
    {
      number: '248/22',
      date: '2016-09-01',
      startDate: '2016-09-01',
      expirationDate: '2016-11-01',
      typeId: 'LAND_RENTAL',
      statusId: 'ACTIVE',
      currentPeriodAmountForPayment: '4323.94',
      debtAmount: '8647.87',
      penaltyAmount: '0',
      overpaymentAmount: '0',
      facilityRentalAddress: [
        'обл. Архангельская, р-н. Приморский, МО Катунинское, дер. Лахта',
      ],
    },
    {
      number: '178/15',
      date: '2018-10-01',
      startDate: '2018-10-15',
      expirationDate: '2023-10-15',
      typeId: 'LAND_RENTAL',
      statusId: 'ACTIVE',
      currentPeriodAmountForPayment: '125000.00',
      debtAmount: '0',
      penaltyAmount: '0',
      overpaymentAmount: '0',
      facilityRentalAddress: [
        "Архангельская область, Приморский район, дер. Лахта, муниципальное образование 'Катунинское'",
      ],
    },
    {
      number: '250/10',
      date: '2019-01-15',
      startDate: '2019-02-01',
      expirationDate: '2065-01-31',
      typeId: 'PROPRIETARY_RENTAL',
      statusId: 'ACTIVE',
      currentPeriodAmountForPayment: '10000.00',
      debtAmount: '10000.00',
      penaltyAmount: '0',
      overpaymentAmount: '23860.01',
      facilityRentalAddress: [],
    },
    {
      number: '345/25',
      date: '2020-02-16',
      startDate: '2020-03-01',
      expirationDate: '2020-08-31',
      typeId: 'PROPRIETARY_RENTAL',
      statusId: 'TERMINATED',
      currentPeriodAmountForPayment: '0',
      debtAmount: '8500.00',
      penaltyAmount: '1.25',
      overpaymentAmount: '0',
      facilityRentalAddress: [
        'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 1, обл Псковская, г Псков, ул Некрасова, дом 14',
      ],
    },
  ];
  const resultDateSort = [
    contractsSortDateAsc[1],
    contractsSortDateAsc[2],
    contractsSortDateAsc[3],
  ];
  const resultDateSortActive = [
    contractsSortDateAsc[1],
    contractsSortDateAsc[2],
  ];
  const testFilter = {
    filters: {
      contractNumber: '5',
      statusId: 'ACTIVE',
    },
    sort: dateAsc,
  };
  const testFilterTwo = {
    filters: {
      contractNumber: '5',
    },
    sort: dateAsc,
  };
  test('Должен вернуть отфильтрованный массив', () => {
    expect(selectContracts(contracts, blankFilter, {})).toStrictEqual(
      contracts,
    );
    expect(selectContracts(contracts, testFilter)).toStrictEqual(
      resultDateSortActive,
    );
    expect(selectContracts(contracts, testFilterTwo)).toStrictEqual(
      resultDateSort,
    );
  });
});
