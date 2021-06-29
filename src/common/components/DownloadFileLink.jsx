import React, { useState, useEffect } from 'react';
import * as L from 'korus-ui';

/**
 * ## Компонент создает ссылку для скачивания файла
 *
 * @example
 * <DownloadFileLink href={file}/>
 *
 * @param {Object} props - Параметры компонента
 * @param {File|string} props.href - файл или url
 * @param {string} props.className - класс
 *
 * @returns {React.FC} Компонент ссылка на файл
 */
export const DownloadFileLink = ({ href, className, children }) => {
  const [fileUrl, setFileUrl] = useState(undefined);
  const isIE = !!(window.navigator && window.navigator.msSaveOrOpenBlob);
  const isFile = typeof href !== 'string';

  useEffect(() => {
    if (isFile && !isIE && href) {
      const objectURL = URL.createObjectURL(href);
      setFileUrl(objectURL);

      return () => {
        URL.revokeObjectURL(objectURL);
      };
    }
    return undefined;
  }, [href]);

  if (!href) {
    return null;
  }

  const linkProps =
    isIE && isFile
      ? {
          onClick: () => window.navigator.msSaveOrOpenBlob(href, href.name),
        }
      : {
          href: isFile ? fileUrl : href,
          download: isFile ? href.name : true,
        };

  return (
    <L.A className={className} {...linkProps}>
      {children}
    </L.A>
  );
};
