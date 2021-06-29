import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { APP_URLS } from '@src/constants';
import { formatFileSize } from '@common/utils';
import { useActions } from '@common/hooks';
import { DownloadFileLink } from '@common/components';

import { actions } from '../ducks';
import { selectors } from '../selectors';

/**
 * ## Компонент список прикрепленных файлов
 *
 * @example
 * <AttachmentsList appealId={appealId}/>
 *
 * @param {Object} props - Параметры компонента
 * @param {Object} props.appealId - Id обращения
 *
 * @returns {React.FC} Компонент список прикрепленных файлов
 */
export const AttachmentsList = ({ appealId }) => {
  const { deleteAppealFileFlow } = useActions(actions);

  const filesListSelector = useMemo(() => selectors.createFilesListSelector(), [
    appealId,
  ]);

  const files = useSelector((state) => filesListSelector(state, appealId));

  if (!files || files.length === 0) {
    return null;
  }

  return (
    <L.Div _margin-top-16>
      {files.map(({ id: fileId, size, name, isLoading }) => {
        const DownloadFileLinkOrDiv = isLoading ? L.Div : DownloadFileLink;
        return (
          <L.Div
            className={`flex-row align-items-center inner
                     secondary padding-x-16 padding-y-12 margin-y-8
                     ${isLoading && 'disabled'}`}
            key={fileId}
            data-cy="file-item"
          >
            <DownloadFileLinkOrDiv
              className="flex-row width-95"
              href={APP_URLS.appealFileUrl(appealId, fileId)}
            >
              <L.I
                className="novicon-doc-list margin-right-12
                           txt-light-gray"
              />
              <L.Span className="txt-nowrap">{name}</L.Span>
              <L.Span className="margin-left-auto txt-gray">
                {`${formatFileSize(size)}`}
              </L.Span>
            </DownloadFileLinkOrDiv>
            <L.Button
              className="blank more novicon-del
                       padding-none margin-left-auto txt-gray"
              isDisabled={isLoading}
              onClick={() => deleteAppealFileFlow({ appealId, fileId })}
            />
          </L.Div>
        );
      })}
    </L.Div>
  );
};
