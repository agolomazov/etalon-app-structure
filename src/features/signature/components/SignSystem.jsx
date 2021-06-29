import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useActions } from '@common/hooks';

import { STATUSES, STATUS_MAP, CRYPTO_FRAME_ELEMENT_ID } from '../constants';
import { actions } from '../ducks';
import { selectors } from '../selectors';

import { SignCertificatesModal } from './SignCertificatesModal';
import { SignErrorModal } from './SignErrorModal';
import { SignSuccessModal } from './SignSuccessModal';
import { SignLoadingModal } from './SignLoadingModal';

/**
 * ## Компонент для работы с электронной подписью
 *
 * @example
 * <SignSystem />
 *
 * @returns {React.FC} Компонент для работы с электронной подписью
 */
export const SignSystem = () => {
  const status = useSelector(selectors.status);
  const isLoading = useSelector(selectors.isLoading);
  const certificates = useSelector(selectors.certificates);
  const selectedCertificate = useSelector(selectors.selectedCertificate);
  const errors = useSelector(selectors.errors);

  const { cancel, sign, selectCertificate } = useActions(actions);

  const SignFrame = useMemo(
    () => ({ children }) => (
      <>
        <div id={CRYPTO_FRAME_ELEMENT_ID} hidden="hidden" />
        {children}
      </>
    ),
    [],
  );

  if (isLoading) {
    return (
      <SignFrame>
        <SignLoadingModal
          isOpen
          title={STATUS_MAP[status]?.loaderTitle}
          description={STATUS_MAP[status]?.loaderDescription}
        />
      </SignFrame>
    );
  }

  if (errors.length > 0) {
    return (
      <SignFrame>
        <SignErrorModal isOpen errors={errors} onCancel={() => cancel()} />
      </SignFrame>
    );
  }

  return (
    <SignFrame>
      <SignCertificatesModal
        isOpen={status === STATUSES.CERTIFICATES}
        onCancel={cancel}
        onSign={sign}
        certificates={certificates}
        selectedCertificate={selectedCertificate}
        onChangeCertificate={selectCertificate}
      />
      <SignSuccessModal isOpen={status === STATUSES.SIGN} onCancel={cancel} />
    </SignFrame>
  );
};
