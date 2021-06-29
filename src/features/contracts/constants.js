/**
 * ## Список полей, по которым есть возможность проводить сортировку
 * @const
 */
export const CONTRACTS_SORT_FIELDS = {
  totalSum: 'totalSum',
  contractDate: 'contractDate',
  address: 'address',
};

/**
 * ## Список вариантов сортировки договоров.
 * @const
 */
export const CONTRACTS_SORT_OPTIONS = [
  { name: 'По сумме к оплате', code: CONTRACTS_SORT_FIELDS.totalSum },
  { name: 'По дате договора', code: CONTRACTS_SORT_FIELDS.contractDate },
  { name: 'По адресу', code: CONTRACTS_SORT_FIELDS.address },
];

/**
 * ## Размер чанка при загрузге договоров по их идентификаторам
 * @const
 * @type {number}
 */
export const CONTRACT_IDS_CHUNK_SIZE = 20;
