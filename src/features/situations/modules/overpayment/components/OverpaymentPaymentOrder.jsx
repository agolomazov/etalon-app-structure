import React, { useCallback } from 'react';
import * as L from 'korus-ui';

import { getUiMessages } from '@common/messages';
import { NumberPrefixInputRender, LabeledField } from '@common/components';

import { AttachmentDrop } from '../../attachments';

import { FORM_NAME, APPEAL_FIELDS } from '../constants';

/**
 * ## Компонент отображает платежное поручение
 *
 * @example
 * <OverpaymentPaymentOrder paymentOrder={paymentOrder} shouldRenderDeleteButton />
 *
 * @param {object} props - Параметры компонента
 * @param {number|string} props.appealId - Id обращения
 * @param {object} props.paymentOrder - платежное поручение
 * @param {Function} props.onChangePaymentOrderField - обработчик события изменения значения поля платежного поручения
 * @param {Function} props.onDeletePaymentOrder - обработчик удаления платежного поручения
 * @param {boolean} props.shouldRenderDeleteButton - должна ли рендериться кнопка удалить
 *
 * @returns {React.FC} Компонент отображает платежное поручение
 */
export const OverpaymentPaymentOrder = React.memo(
  function OverpaymentPaymentOrder({
    appealId,
    paymentOrder,
    onChangePaymentOrderField,
    onDeletePaymentOrder,
    shouldRenderDeleteButton = false,
  }) {
    const {
      paymentOrderId,
      paymentOrderNumber,
      paymentOrderDate,
    } = paymentOrder;

    const getFieldName = (name) => name.split('@@')[1];

    const onChange = useCallback((e) => {
      const { name, value } = e.component;
      const fieldName = getFieldName(name);
      onChangePaymentOrderField(paymentOrderId, fieldName, value);
    }, []);

    const onDelete = useCallback(() => {
      onDeletePaymentOrder(paymentOrderId);
    }, []);

    const requiredMessage = getUiMessages('requiredMessage');

    return (
      <L.Dl
        className="list form
                 w-30 padding-bottom-4 margin-bottom-32 border-bottom"
      >
        <LabeledField
          label="Номер платежного поручения"
          description="Приведшего к переплате"
          classNameDescription="txt-gray"
        >
          <L.Div className="flex-row">
            <L.Input
              className="width-35"
              inputRender={NumberPrefixInputRender}
              allowedSymbols="numbers"
              maxLength={6}
              isRequired
              requiredMessage={requiredMessage}
              form={FORM_NAME}
              name={`${paymentOrderId}@@${APPEAL_FIELDS.paymentOrderNumber}`}
              value={paymentOrderNumber}
              onChange={onChange}
            />
            {shouldRenderDeleteButton && (
              <L.Tooltip title="Удалить платежное поручение" position="right">
                <L.Button
                  className="blank more novicon-trash
                             margin-left-auto txt-gray"
                  onClick={onDelete}
                />
              </L.Tooltip>
            )}
          </L.Div>
        </LabeledField>

        <LabeledField
          label="Дата платежного поручения"
          description="Приведшего к переплате"
          classNameDescription="txt-gray"
        >
          <L.DatePicker
            className="input-xs"
            placeholder="дд.мм.гггг"
            isRequired
            requiredMessage={requiredMessage}
            form={FORM_NAME}
            name={`${paymentOrderId}@@${APPEAL_FIELDS.paymentOrderDate}`}
            value={paymentOrderDate}
            onChange={onChange}
          />
        </LabeledField>

        <LabeledField
          label="Подтверждающий документ"
          description="Загрузите скан-копию платежного документа"
        >
          <AttachmentDrop
            appealId={appealId}
            linkId={paymentOrderId}
            isRequired
            form={FORM_NAME}
            name={`${paymentOrderId}@@${APPEAL_FIELDS.paymentOrderFile}`}
          />
        </LabeledField>
      </L.Dl>
    );
  },
);
