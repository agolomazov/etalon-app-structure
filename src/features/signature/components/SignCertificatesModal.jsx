import React from 'react';
import * as L from 'korus-ui';

import { setDateWideFormat } from '@common/utils';

import { getUiMessages } from '@common/messages';

/**
 * ## Модальное окно с выбором сертификата
 *
 * @example
 * <SignCertificatesModal />
 *
 * @param {object} props - Параметры компонента
 * @param {Array} props.certificates - список сертификатов
 * @param {object} props.selectedCertificate - выбранный сертификат
 * @param {function} props.onChangeCertificate - обработчкик выбора сертификата
 * @param {boolean} props.isOpen - отображать модальное оконо или нет
 * @param {function} props.onCancel - обработчкик закрытия модального окна
 * @param {function} props.onSign - обработчкик кнопки подписать
 *
 * @returns {React.FC} Модальное окно с выбором сертификата
 */
export const SignCertificatesModal = ({
  certificates,
  selectedCertificate,
  onChangeCertificate,
  isOpen,
  onSign,
  onCancel,
}) => {
  const onChange = (e) =>
    onChangeCertificate(
      certificates.find(({ thumbprint }) => thumbprint === e.component.value),
    );

  return (
    <L.Modal
      className="modal-480"
      size="sm"
      isOpen={isOpen}
      onCloseButtonClick={() => onCancel()}
    >
      <L.ModalHeader>Выберите сертификат</L.ModalHeader>
      <L.ModalBody className="window-content">
        {certificates?.length > 0 && (
          <L.RadioGroup
            className="token-radio"
            value={selectedCertificate?.thumbprint || null}
            onChange={onChange}
          >
            {certificates.map(({ fio, thumbprint, organization, notAfter }) => (
              <L.RadioButton
                className="margin-bottom-8"
                value={thumbprint}
                key={thumbprint}
              >
                {fio}
                <L.Div className="txt-gray">
                  {organization && (
                    <>
                      {organization}
                      <br />
                    </>
                  )}
                  <>{`Действителен до ${setDateWideFormat(notAfter)}`}</>
                </L.Div>
              </L.RadioButton>
            ))}
          </L.RadioGroup>
        )}
      </L.ModalBody>
      <L.ModalFooter>
        <L.Button className="margin-right-16" onClick={() => onCancel()}>
          {getUiMessages('btnCancel')}
        </L.Button>
        <L.Button
          className="success"
          isDisabled={!selectedCertificate}
          onClick={() => onSign()}
        >
          {getUiMessages('btnSign')}
        </L.Button>
      </L.ModalFooter>
    </L.Modal>
  );
};
