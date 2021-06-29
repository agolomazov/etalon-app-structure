import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { useActions } from '@common/hooks';
import { NumberPrefixInputRender, LabeledField } from '@common/components';
import { setDateFormat } from '@common/utils';
import { getUiMessages } from '@common/messages';

import { AttachmentDrop } from '../../attachments';

import { makeDatePeriod, makeMinMaxDates, genFormName } from '../utils';
import { APPEAL_FIELDS, APPEAL_TYPES } from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';

/**
 * ## Компонент отображает форму для обращения
 *
 * @example
 * <ReconciliationAppeal contracts={contracts} appeal={appeal} shouldRenderDeleteButton />
 *
 * @param {Object} props - Параметры компонента
 * @param {Array} props.contracts - список договоров
 * @param {Object} props.appeal - обращение
 * @param {boolean} props.shouldRenderDeleteButton - должна ли рендериться кнопка удалить
 *
 * @returns {React.FC} Компонент отображает форму для обращения
 */
export const ReconciliationAppeal = React.memo(function ReconciliationAppeal({
  contracts = [],
  appeal,
  shouldRenderDeleteButton = false,
}) {
  const {
    id: appealId,
    contractId,
    contractNumber,
    contractDate,
    datePeriod,
    isLoading,
  } = appeal;

  const { setAppealField, deleteAppealFlow } = useActions(actions);
  const appealType = useSelector(selectors.appealType);

  const [startContractDate, setStartContractDate] = useState(null);
  const [expirationContractDate, setExpirationContractDate] = useState(null);

  const fileDropDescription =
    appealType === APPEAL_TYPES.signed
      ? 'Документ будет подписан Квалифицированной Электронной подписью'
      : 'Загрузите скан-копию бумажного акта-сверки ' +
        'с печатью и подписью уполномоченного лица';

  const shouldRenderDocumentFileDrop = appealType !== APPEAL_TYPES.requested;
  const formName = genFormName(appealId);

  const onChangeAppealField = useCallback((e) => {
    const { name, value } = e.component;
    setAppealField(appealId, name, value);
  }, []);

  const onChangeContractNumber = useCallback((e) => {
    const { name, value, suggestion } = e.component;
    setAppealField(appealId, name, value);
    if (suggestion) {
      const { id, date = '', startDate, expirationDate } = suggestion;
      const actDatePeriod = makeDatePeriod(startDate, expirationDate);
      const [min, max] = makeMinMaxDates(startDate, expirationDate);
      setStartContractDate(min);
      setExpirationContractDate(max);

      setAppealField(appealId, APPEAL_FIELDS.contractId, id);
      setAppealField(appealId, APPEAL_FIELDS.contractDate, setDateFormat(date));
      setAppealField(appealId, APPEAL_FIELDS.datePeriod, actDatePeriod);
    } else {
      setAppealField(appealId, APPEAL_FIELDS.contractId, null);
      setStartContractDate(null);
      setExpirationContractDate(null);
    }
  }, []);

  const onDeleteAppeal = useCallback(() => deleteAppealFlow(appealId), []);

  const requiredMessage = getUiMessages('requiredMessage');

  return (
    <L.Dl
      className="list form w-30
                 padding-bottom-4 margin-bottom-32 border-bottom"
    >
      <L.Loader isLoading={isLoading}>
        <LabeledField label="Номер договора">
          <L.Div className="flex-row">
            <L.AutoComplete
              className="width-35"
              inputRender={NumberPrefixInputRender}
              data={contracts}
              textField="number"
              isRequired
              requiredMessage={requiredMessage}
              form={formName}
              name={APPEAL_FIELDS.contractNumber}
              value={contractNumber}
              onChange={onChangeContractNumber}
              maxLength={20}
            />
            {shouldRenderDeleteButton && (
              <L.Tooltip
                title={getUiMessages('btnDeleteContract')}
                position="right"
              >
                <L.Button
                  className="blank more novicon-trash margin-left-auto txt-gray"
                  onClick={onDeleteAppeal}
                />
              </L.Tooltip>
            )}
          </L.Div>
        </LabeledField>

        <LabeledField label="Дата договора">
          <L.DatePicker
            className="input-xs"
            placeholder="дд.мм.гггг"
            isDisabled={!!contractId}
            isRequired
            requiredMessage={requiredMessage}
            form={formName}
            name={APPEAL_FIELDS.contractDate}
            value={contractDate}
            onChange={onChangeAppealField}
          />
        </LabeledField>

        <LabeledField label="Период формирования акта сверки">
          <L.DateRange
            placeholder={['дд.мм.гггг', 'дд.мм.гггг']}
            min={startContractDate}
            max={expirationContractDate}
            isRequired
            requiredMessage={requiredMessage}
            form={formName}
            name={APPEAL_FIELDS.datePeriod}
            value={datePeriod}
            onChange={onChangeAppealField}
          />
        </LabeledField>

        <LabeledField
          label="Документ"
          description={fileDropDescription}
          shouldRender={shouldRenderDocumentFileDrop}
        >
          <AttachmentDrop
            appealId={appealId}
            isRequired
            requiredMessage={requiredMessage}
            form={formName}
            name={APPEAL_FIELDS.file}
          />
        </LabeledField>
      </L.Loader>
    </L.Dl>
  );
});
