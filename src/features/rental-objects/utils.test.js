import { EMPTY_CONTENT } from '@src/constants';

import {
  displayAreaOrCount,
  setSortRentalObjects,
  filterByAddress,
  filterByСadastralNumber,
  filterByContractDate,
  filterByContractNumber,
  filterByContractType,
  setFilterRentalObjects,
  selectRentals,
} from './utils';

import { RENTAL_OBJECTS_SORT_FIELDS } from './constants';

describe('displayAreaOrCount - Метод выводит площадь или количество', () => {
  test('Должен вернуть площадь, если она задана', () => {
    expect(displayAreaOrCount({ value: 3, measurementUnit: 'кв. м' })).toBe(
      '3 кв. м',
    );
  });

  test('Должен вернуть количество, если оно задано', () => {
    expect(displayAreaOrCount(undefined, 3)).toBe('3 шт.');
  });

  test('Должен вернуть -, если ничего не задано', () => {
    expect(displayAreaOrCount()).toBe(EMPTY_CONTENT);
  });
});

const rentals = [
  {
    id: '0d02ff48-8fd7-479a-8a50-9a10a567810a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e808',
      number: '248/22',
      date: '2016-09-01',
    },
    typeId: 'ROOM',
    address:
      'обл. Архангельская, р-н. Приморский, МО Катунинское, дер.  Лахта, ул. Геологов, д. 12, к. 2',
    cadastralNumber: '29:16:240401:1072',
    area: {
      value: '1421',
      measurementUnit: 'кв. м',
    },
    count: 1,
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567811a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e815',
      number: '178/15',
      date: '2018-10-01',
    },
    typeId: 'LAND_PLOT',
    address:
      "Архангельская область, Приморский район, дер. Лахта, муниципальное образование 'Катунинское'",
    cadastralNumber: '29:16:240401:1126',
    area: {
      value: '900',
      measurementUnit: 'кв. м',
    },
    count: 2,
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567812a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e815',
      number: '178/15',
      date: '2018-10-01',
    },
    typeId: 'MOVABLE_PROPERTY',
    address:
      "Архангельская область, Приморский район, дер. Лахта, муниципальное образование 'Катунинское'",
    cadastralNumber: '29:16:240401:218',
    area: {
      value: '734',
      measurementUnit: 'кв. м',
    },
    count: 1,
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567813a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e815',
      number: '178/15',
      date: '2018-10-01',
    },
    typeId: 'AIRCRAFTS_AND_SHIPS',
    address:
      "Архангельская область, Приморский район, дер. Лахта, муниципальное образование 'Катунинское'",
    area: {
      value: '0',
      measurementUnit: 'кв. м',
    },
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567814a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e815',
      number: '178/15',
      date: '2018-10-01',
    },
    typeId: 'BUILDING',
    area: {
      value: '70',
      measurementUnit: 'кв. м',
    },
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567824a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e815',
      number: '178/15',
      date: '2018-10-01',
    },
    typeId: 'PROPERTY_COMPLEX',
    area: {
      value: '130.0',
      measurementUnit: 'кв. м',
    },
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567825a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e815',
      number: '178/15',
      date: '2018-10-01',
    },
    typeId: 'OTHER_MOVABLE_PROPERTY',
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567826a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e815',
      number: '178/15',
      date: '2018-10-01',
    },
    typeId: 'SHARES_IN_RIGHT',
    area: {
      value: '5',
      measurementUnit: 'кв. м',
    },
    count: 1,
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567827a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e815',
      number: '178/15',
      date: '2018-10-01',
    },
    typeId: 'LAND_PLOT_COMPLEX',
    count: 2,
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567828a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e815',
      number: '178/15',
      date: '2018-10-01',
    },
    typeId: 'ROOM',
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567815a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e810',
      number: '345/25',
      date: '2020-02-16',
    },
    typeId: 'ROOM',
    address:
      'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 1, обл Псковская, г Псков, ул Некрасова, дом 14',
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567816a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e809',
      number: '250/10',
      date: '2019-01-15',
    },
    typeId: 'SHARES_IN_RIGHT',
    area: {
      value: '21.55555',
      measurementUnit: 'кв. м',
    },
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567817a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e813',
      number: '125/11',
      date: '2019-02-20',
    },
    typeId: 'ROOM',
    address: 'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 5',
    area: {
      value: '35.1',
      measurementUnit: 'кв. м',
    },
    count: 0,
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567818a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e813',
      number: '125/11',
      date: '2019-02-20',
    },
    typeId: 'ROOM',
    address: 'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 6',
    area: {
      value: '20',
      measurementUnit: 'кв. м',
    },
    count: 1,
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567819a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e814',
      number: '130/12',
      date: '2019-01-01',
    },
    typeId: 'LAND_PLOT',
    area: {
      value: '500',
      measurementUnit: 'кв. м',
    },
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567820a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e816',
      number: '170/45',
      date: '2020-06-01',
    },
    typeId: 'MOVABLE_PROPERTY',
    count: 2,
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567821a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e820',
      number: '290/30',
      date: '2020-08-01',
    },
    typeId: 'PROPERTY_COMPLEX',
    count: 3,
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567822a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e821',
      number: '380/01',
      date: '2018-11-10',
    },
    typeId: 'OTHER_MOVABLE_PROPERTY',
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567823a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e822',
      number: '310/02',
      date: '2019-05-20',
    },
    typeId: 'AIRCRAFTS_AND_SHIPS',
  },
];

const rentalsNotSorted = [
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567817a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e813',
      number: '125/11',
      date: '2019-02-20',
    },
    typeId: 'ROOM',
    address: 'обл Псковская, г Псков, ул Некрасова, дом 15А, кв 5',
    area: {
      value: '35.1',
      measurementUnit: 'кв. м',
    },
    count: 0,
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567813a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e815',
      number: '178/15',
      date: '2018-10-01',
    },
    typeId: 'AIRCRAFTS_AND_SHIPS',
    address:
      "Архангельская область, Приморский район, дер. Лахта, муниципальное образование 'Катунинское'",
    area: {
      value: '0',
      measurementUnit: 'кв. м',
    },
  },
  {
    id: '0d02ff48-8fd7-479a-8a50-9a10a567810a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e808',
      number: '248/22',
      date: '2016-09-01',
    },
    typeId: 'ROOM',
    address:
      'обл. Архангельская, р-н. Приморский, МО Катунинское, дер.  Лахта, ул. Геологов, д. 12, к. 2',
    cadastralNumber: '29:16:240401:1072',
    area: {
      value: '1421',
      measurementUnit: 'кв. м',
    },
    count: 1,
  },
  {
    id: '0d02ff78-8fd7-479a-8a50-9a10a567814a',
    contract: {
      id: '96177ef0-6680-48c1-b02c-e156d3f0e815',
      number: '178/16',
      date: '2018-10-02',
    },
    typeId: 'BUILDING',
    area: {
      value: '70',
      measurementUnit: 'кв. м',
    },
  },
];

const rentalsSortedByAdress = [
  rentalsNotSorted[3],
  rentalsNotSorted[1],
  rentalsNotSorted[2],
  rentalsNotSorted[0],
];

const rentalsSortedByContractDate = [
  rentalsNotSorted[2],
  rentalsNotSorted[1],
  rentalsNotSorted[3],
  rentalsNotSorted[0],
];

const rentalsSortedByContractNumber = [
  rentalsNotSorted[0],
  rentalsNotSorted[1],
  rentalsNotSorted[3],
  rentalsNotSorted[2],
];

const addressAsc = {
  field: RENTAL_OBJECTS_SORT_FIELDS.address,
  direction: 'ASC',
};
const addressDesc = {
  field: RENTAL_OBJECTS_SORT_FIELDS.address,
  direction: 'DESC',
};
const contractDateAsc = {
  field: RENTAL_OBJECTS_SORT_FIELDS.contractDate,
  direction: 'ASC',
};
const contractDateDesc = {
  field: RENTAL_OBJECTS_SORT_FIELDS.contractDate,
  direction: 'DESC',
};
const contractNumberAsc = {
  field: RENTAL_OBJECTS_SORT_FIELDS.contractNumber,
  direction: 'ASC',
};
const contractNumberDesc = {
  field: RENTAL_OBJECTS_SORT_FIELDS.contractNumber,
  direction: 'DESC',
};

const blankFilter = {
  filterAddress: '',
  filterContractNumber: '',
  filterContractDate: ['', ''],
  filterCadastralNumber: '',
  filterContractType: '',
};
const filterFirst = {
  filterAddress: 'псков',
  filterContractNumber: '3',
  filterContractDate: ['01.01.2020', '01.01.2021'],
  filterCadastralNumber: '',
  filterContractType: '',
};
const filterSecond = {
  filterAddress: 'арха',
  filterContractNumber: '15',
  filterContractDate: ['', ''],
  filterCadastralNumber: '',
  filterContractType: '',
};

describe('setSortRentalObjects - метод сортировки объектов недвижимости', () => {
  test('Должен вернуть отсортированный массив', () => {
    expect(setSortRentalObjects([], addressAsc)).toStrictEqual([]);
    expect(setSortRentalObjects(rentalsNotSorted, addressAsc)).toStrictEqual(
      rentalsSortedByAdress,
    );
    expect(setSortRentalObjects(rentalsNotSorted, addressDesc)).toStrictEqual(
      rentalsSortedByAdress.reverse(),
    );
    expect(
      setSortRentalObjects(rentalsNotSorted, contractDateAsc),
    ).toStrictEqual(rentalsSortedByContractDate);
    expect(
      setSortRentalObjects(rentalsNotSorted, contractDateDesc),
    ).toStrictEqual(rentalsSortedByContractDate.reverse());
    expect(
      setSortRentalObjects(rentalsNotSorted, contractNumberAsc),
    ).toStrictEqual(rentalsSortedByContractNumber);
    expect(
      setSortRentalObjects(rentalsNotSorted, contractNumberDesc),
    ).toStrictEqual(rentalsSortedByContractNumber.reverse());
  });
});

describe('filterByAddress - метод для фильтрации по адрессу', () => {
  const filteredRentals = [rentals[10], rentals[12], rentals[13]];
  test('Должен вернуть отфильтрованный массив', () => {
    expect(filterByAddress([], 'test')).toStrictEqual([]);
    expect(filterByAddress(rentals, '')).toStrictEqual(rentals);
    expect(filterByAddress(rentals, 'nothing to find')).toStrictEqual([]);
    expect(filterByAddress(rentals, 'псковская')).toStrictEqual(
      filteredRentals,
    );
  });
});

describe('filterByСadastralNumber - метод для фильтрации по кадастровому номеру', () => {
  test('Должен вернуть отфильтрованный массив', () => {
    expect(filterByСadastralNumber([], 'test')).toStrictEqual([]);
    expect(filterByСadastralNumber(rentals, '')).toStrictEqual(rentals);
    expect(filterByСadastralNumber(rentals, 'nothing to find')).toStrictEqual(
      [],
    );
    expect(filterByСadastralNumber(rentals, '1126')).toStrictEqual([
      rentals[1],
    ]);
    expect(
      filterByСadastralNumber(rentals, '29:16:240401:1072'),
    ).toStrictEqual([rentals[0]]);
  });
});

describe('filterByContractDate - Метод для фильтрации по дате договора', () => {
  test('Должен вернуть отфильтрованный массив', () => {
    expect(filterByContractDate([], 'test')).toStrictEqual([]);
    expect(filterByContractDate(rentals, ['', ''])).toStrictEqual(rentals);
    expect(filterByContractDate(rentals, 'nothing to find')).toStrictEqual([]);
    expect(filterByContractDate(rentals, ['', '31.03.2021'])).toStrictEqual(
      rentals,
    );
    expect(filterByContractDate(rentals, ['31.07.2020', ''])).toStrictEqual([
      rentals[16],
    ]);
    expect(filterByContractDate(rentals, ['', '30.10.2016'])).toStrictEqual([
      rentals[0],
    ]);
    expect(
      filterByContractDate(rentals, ['01.11.2018', '30.11.2018']),
    ).toStrictEqual([rentals[17]]);
  });
});

describe('filterByContractNumber - Метод для фильтрации по номеру договора', () => {
  test('Должен вернуть отфильтрованный массив', () => {
    expect(filterByContractNumber([], 'test')).toStrictEqual([]);
    expect(filterByContractNumber(rentals, '')).toStrictEqual(rentals);
    expect(filterByContractNumber(rentals, 'nothing to find')).toStrictEqual(
      [],
    );
    expect(filterByContractNumber(rentals, '125')).toStrictEqual([
      rentals[12],
      rentals[13],
    ]);
  });
});

describe('filterByContractType - Метод для фильтрации по типу договора', () => {
  test('Должен вернуть отфильтрованный массив', () => {
    expect(filterByContractType([], 'test')).toStrictEqual([]);
    expect(filterByContractType(rentals, '')).toStrictEqual(rentals);
    expect(filterByContractType(rentals, 'nothing to find')).toStrictEqual([]);
    expect(filterByContractType(rentals, 'SHARES_IN_RIGHT')).toStrictEqual([
      rentals[7],
      rentals[11],
    ]);
  });
});

describe('setFilterRentalObjects - Метод для фильтрации списка объектов', () => {
  test('Должен вернуть отфильтрованный массив', () => {
    expect(
      setFilterRentalObjects(rentals, true, blankFilter, {}),
    ).toStrictEqual(rentals);
    expect(
      setFilterRentalObjects(
        rentalsNotSorted,
        true,
        blankFilter,
        contractDateDesc,
      ),
    ).toStrictEqual(rentalsSortedByContractDate);
    expect(
      setFilterRentalObjects(rentals, true, filterFirst, addressAsc),
    ).toStrictEqual([rentals[10]]);
    expect(
      setFilterRentalObjects(rentals, true, filterSecond, contractDateDesc),
    ).toStrictEqual([rentals[1], rentals[2], rentals[3]]);
  });
});

describe('selectRentals - Метод для фильтрации и сортировки объектов аренды на стороне клиента', () => {
  const testFilterOne = {
    filters: {
      address: 'псков',
      contractNumber: '3',
      contractDate: ['01.01.2020', '01.01.2021'],
    },
    sort: addressAsc,
  };
  const testFilterTwo = {
    filters: {
      address: 'арха',
      contractNumber: '15',
    },
    sort: contractDateDesc,
  };
  test('Должен вернуть отфильтрованный массив', () => {
    expect(selectRentals(rentals, blankFilter)).toStrictEqual(rentals);
    expect(selectRentals(rentals, testFilterOne)).toStrictEqual([rentals[10]]);
    expect(selectRentals(rentals, testFilterTwo)).toStrictEqual([
      rentals[1],
      rentals[2],
      rentals[3],
    ]);
  });
});
