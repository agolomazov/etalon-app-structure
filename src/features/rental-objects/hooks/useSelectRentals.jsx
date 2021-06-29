import React, { useCallback, useMemo } from 'react';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';
import { NumberPrefixInputRender } from '@common/components';
import {
  useSelectFilter,
  useSearchFilter,
  useDateRangeFilter,
  useSelectSort,
} from '@common/hooks';

import { RENTAL_OBJECTS_SORT_OPTIONS } from '../constants';

/**
 * @typedef {object} SelectRentalsHook
 * @property {object} sortByField - сортировка
 * @property {object} addressFilter - фильтр по адресу
 * @property {object} contractNumberFilter - фильтр по номеру договора
 * @property {object} contractDateRangeFilter - фильтр по диапазону дат
 * @property {object} cadastralNumberFilter - фильтр по кадастровому номеру
 * @property {object} rentalTypeFilter - фильтр по типу объекта аренды
 * @property {React.FC} BasicRentalsFilters - Компонент с базовой фильтрацией и сортировкой
 * @property {React.FC} ExtendedRentalsFilters - Компонент с расширенной фильтрацией
 */
/**
 * Хук создает компоненты и функции для фильтрации и сортировки объектов аренды
 *
 * @param {object} params - Параметры хука
 * @param {Array} params.facilityRentalTypes - справочник типов объектов аренды
 *
 * @returns {SelectRentalsHook} результат
 */
export const useSelectRentals = ({ facilityRentalTypes }) => {
  const sortByField = useSelectSort({
    name: 'sort',
    data: RENTAL_OBJECTS_SORT_OPTIONS,
    initialValue: [RENTAL_OBJECTS_SORT_OPTIONS[0].code, 'ASC'],
  });

  const addressFilter = useSearchFilter({
    name: 'address',
    debounceMs: 400,
  });

  const contractNumberFilter = useSearchFilter({
    name: 'contractNumber',
    debounceMs: 400,
  });

  const contractDateRangeFilter = useDateRangeFilter({
    name: 'contractDateRange',
    submitMode: 'manual',
  });

  const cadastralNumberFilter = useSearchFilter({
    name: 'cadastralNumber',
    submitMode: 'manual',
  });

  const rentalTypeFilter = useSelectFilter({
    name: 'rentalType',
    data: facilityRentalTypes,
    submitMode: 'manual',
  });

  const resetExtendedFilters = useCallback(() => {
    contractDateRangeFilter.reset();
    cadastralNumberFilter.reset();
    rentalTypeFilter.reset();
  }, [
    contractDateRangeFilter.reset,
    cadastralNumberFilter.reset,
    rentalTypeFilter.reset,
  ]);

  const submitExtendedFilters = useCallback(() => {
    contractDateRangeFilter.submit();
    cadastralNumberFilter.submit();
    rentalTypeFilter.submit();
  }, [
    contractDateRangeFilter.submit,
    cadastralNumberFilter.submit,
    rentalTypeFilter.submit,
  ]);

  const BasicRentalsFilters = useMemo(
    () => () => (
      <>
        <sortByField.Component className="input-sm margin-right-16" />
        <addressFilter.Component
          className="width-30 margin-right-16"
          placeholder="Адрес"
          maxLength={1000}
        />
        <contractNumberFilter.Component
          inputRender={NumberPrefixInputRender}
          className="input-xs margin-right-16"
          placeholder="Договора"
          maxLength={20}
        />
      </>
    ),
    [
      sortByField.Component,
      addressFilter.Component,
      contractNumberFilter.Component,
    ],
  );

  const ExtendedRentalsFilters = useMemo(
    () => ({ onSubmit, onReset }) => (
      <L.Div className="padding-y-16 padding-x-32">
        <L.Dl className="list form w-35 width-55 left">
          <L.Dt>
            <L.Label>Дата договора</L.Label>
          </L.Dt>
          <L.Dd>
            <contractDateRangeFilter.Component
              placeholder={['дд.мм.гггг', 'дд.мм.гггг']}
              form="rentals-form"
            />
          </L.Dd>
          <L.Dt>
            <L.Label>Кадастровый номер</L.Label>
          </L.Dt>
          <L.Dd>
            <cadastralNumberFilter.Component
              placeholder="Кадастровый номер"
              form="rentals-form"
              validator="cadastralNumber"
            />
          </L.Dd>
        </L.Dl>
        <L.Dl className="list form w-40 width-40 right">
          <L.Dt>
            <L.Label>Тип объекта аренды</L.Label>
          </L.Dt>
          <L.Dd>
            <rentalTypeFilter.Component form="rentals-form" />
          </L.Dd>
        </L.Dl>
        <L.Div _clear />
        <L.Div className="txt-right">
          <L.Button
            className="blank margin-right-16"
            onClick={() => {
              resetExtendedFilters();
              if (onSubmit) {
                onSubmit();
              }
            }}
          >
            {getUiMessages('btnClearFilter')}
          </L.Button>
          <L.Button
            className="success"
            form="rentals-form"
            onClick={() => {
              submitExtendedFilters();
              if (onReset) {
                onReset();
              }
            }}
          >
            {getUiMessages('btnSubmitFilter')}
          </L.Button>
        </L.Div>
      </L.Div>
    ),
    [
      contractDateRangeFilter.Component,
      cadastralNumberFilter.Component,
      rentalTypeFilter.Component,
      resetExtendedFilters,
      submitExtendedFilters,
    ],
  );

  return {
    sortByField,
    addressFilter,
    contractNumberFilter,
    contractDateRangeFilter,
    cadastralNumberFilter,
    rentalTypeFilter,
    BasicRentalsFilters,
    ExtendedRentalsFilters,
  };
};
