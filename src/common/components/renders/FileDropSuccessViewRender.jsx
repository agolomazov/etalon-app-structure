import React from 'react';
import * as L from 'korus-ui';

import { DownloadFileLink } from '../DownloadFileLink';

import { FileDropVariantRender } from './FileDropVariantRender';

/**
 * ## Компонент для кастомизация FileDrop
 *
 * @example <L.FileDrop successViewRender={FileDropSuccessViewRender} />
 *
 * @returns {React.FC} Компонент для кастомизация FileDrop
 */
export const FileDropSuccessViewRender = ({
  Element,
  elementProps,
  componentProps,
  onDeleteClick,
}) => (
  <Element {...elementProps}>
    <FileDropVariantRender isSuccess onDeleteClick={onDeleteClick}>
      <L.Div>
        <>Файл </>
        <DownloadFileLink href={componentProps.value}>
          {componentProps?.value?.name}
        </DownloadFileLink>
        <> успешно загружен</>
      </L.Div>
    </FileDropVariantRender>
  </Element>
);
