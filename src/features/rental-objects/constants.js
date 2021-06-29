/**
 * ## Список полей, по которым есть возможность проводить сортировку
 * @const
 */
export const RENTAL_OBJECTS_SORT_FIELDS = {
  address: 'address',
  contractNumber: 'contractNumber',
  contractDate: 'contractDate',
};

/**
 * ## Список вариантов сортировки объектов.
 * @const
 * @type {Array}
 */
export const RENTAL_OBJECTS_SORT_OPTIONS = [
  { name: 'По адресу', code: RENTAL_OBJECTS_SORT_FIELDS.address },
  { name: 'По № договора', code: RENTAL_OBJECTS_SORT_FIELDS.contractNumber },
  { name: 'По дате договора', code: RENTAL_OBJECTS_SORT_FIELDS.contractDate },
];
