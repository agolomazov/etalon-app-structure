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

import { CONTRACTS_SORT_OPTIONS } from '../constants';

/**
 * @typedef {object} SelectContractsHook
 * @property {object} sortByField - сортировка
 * @property {object} addressFilter - фильтр по адресу
 * @property {object} contractNumberFilter - фильтр по номеру договора
 * @property {object} contractDateRangeFilter - фильтр по диапазону дат
 * @property {object} cadastralNumberFilter - фильтр по кадастровому номеру
 * @property {object} rentalTypeFilter - фильтр по типу объекта аренды
 * @property {React.FC} BasicContractsFilters - Компонент с базовой фильтрацией и сортировкой
 * @property {React.FC} ExtendedContactsFilters - Компонент с расширенной фильтрацией
 */
/**
 * Хук создает компоненты и функции для фильтрации и сортировки объектов аренды
 *
 * @param {object} params - Параметры хука
 * @param {Array} params.contractTypes - справочник типов договоров
 * @param {Array} params.contractStatuses - справочник статусов договоров
 *
 * @returns {SelectContractsHook} результат
 */
export const useSelectContracts = ({ contractTypes, contractStatuses }) => {
  const sortByField = useSelectSort({
    name: 'sort',
    data: CONTRACTS_SORT_OPTIONS,
    initialValue: [CONTRACTS_SORT_OPTIONS[0].code, 'DESC'],
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

  const activeContractDateRangeFilter = useDateRangeFilter({
    name: 'activeContractDateRange',
    submitMode: 'manual',
  });

  const contractTypeFilter = useSelectFilter({
    name: 'contractType',
    data: contractTypes,
    submitMode: 'manual',
  });

  const contractStatusFilter = useSelectFilter({
    name: 'contractStatus',
    data: contractStatuses,
    submitMode: 'manual',
  });

  const resetExtendedFilters = useCallback(() => {
    contractDateRangeFilter.reset();
    contractStatusFilter.reset();
    contractTypeFilter.reset();
    activeContractDateRangeFilter.reset();
  }, [
    contractDateRangeFilter.reset,
    contractStatusFilter.reset,
    contractTypeFilter.reset,
    activeContractDateRangeFilter.reset,
  ]);

  const submitExtendedFilters = useCallback(() => {
    contractDateRangeFilter.submit();
    contractStatusFilter.submit();
    contractTypeFilter.submit();
    activeContractDateRangeFilter.submit();
  }, [
    contractDateRangeFilter.submit,
    contractStatusFilter.submit,
    contractTypeFilter.submit,
    activeContractDateRangeFilter.submit,
  ]);

  const BasicContractsFilters = useMemo(
    () => () => (
      <>
        <sortByField.Component className="input-sm margin-right-16" />
        <contractNumberFilter.Component
          inputRender={NumberPrefixInputRender}
          className="input-xs margin-right-16"
          placeholder="Договора"
          maxLength={20}
        />
        <addressFilter.Component
          className="width-30 margin-right-16"
          placeholder="Адрес"
          maxLength={1000}
        />
      </>
    ),
    [
      sortByField.Component,
      contractNumberFilter.Component,
      addressFilter.Component,
    ],
  );

  const ExtendedContractsFilters = useMemo(
    () => ({ onSubmit, onReset }) => (
      <L.Div className="padding-y-16 padding-x-32">
        <L.Dl className="list form w-35 width-55 left">
          <L.Dt>
            <L.Label>Дата договора</L.Label>
          </L.Dt>
          <L.Dd>
            <contractDateRangeFilter.Component
              placeholder={['дд.мм.гггг', 'дд.мм.гггг']}
              form="contracts"
            />
          </L.Dd>
          <L.Dt>
            <L.Label>Срок действия договора</L.Label>
          </L.Dt>
          <L.Dd>
            <activeContractDateRangeFilter.Component
              placeholder={['дд.мм.гггг', 'дд.мм.гггг']}
              form="contracts"
            />
          </L.Dd>
        </L.Dl>
        <L.Dl className="list form w-40 width-40 right">
          <L.Dt>
            <L.Label>Тип договора аренды</L.Label>
          </L.Dt>
          <L.Dd>
            <contractTypeFilter.Component form="contracts" />
          </L.Dd>
          <L.Dt>
            <L.Label>Статус договора</L.Label>
          </L.Dt>
          <L.Dd>
            <contractStatusFilter.Component form="contracts" />
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
            form="contracts"
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
      activeContractDateRangeFilter.Component,
      contractTypeFilter.Component,
      contractStatusFilter.Component,
      resetExtendedFilters,
      submitExtendedFilters,
    ],
  );

  return {
    sortByField,
    addressFilter,
    contractNumberFilter,
    contractDateRangeFilter,
    activeContractDateRangeFilter,
    contractTypeFilter,
    contractStatusFilter,
    BasicContractsFilters,
    ExtendedContractsFilters,
  };
};
