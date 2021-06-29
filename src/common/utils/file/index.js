import { setDateFormat } from '../dates';

/**
 * Конвертирует файл в base64 строку
 *
 * @example const base64String = await baseconvertFileToBase64(file)
 *
 * @param {File} file - файл
 *
 * @returns {Promise} промис
 */
export const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result
        .replace('data:', '')
        .replace(/^.+,/, '');
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

/**
 * Скачать файл
 *
 * @example
 *
 * Axios.get(url, { responseType: 'blob' }).then(res => { downloadFile(res.data, 'File.txt'); });
 *
 * @param {string | ArrayBuffer | ArrayBufferView | Blob} data - Данные
 * @param {string} filename - Имя файла
 * @param {string} [mime] - mime тип
 * @param {string} [bom] - bom
 *
 * @returns {void}
 */
export const downloadFile = (data, filename, mime, bom) => {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data];
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' });
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    /*
     * IE workaround for "HTML7007: One or more blob URLs were
     * revoked by closing the blob for which they were created.
     * These URLs will no longer resolve as the data backing
     * the URL has been freed."
     */
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const blobURL =
      window.URL && window.URL.createObjectURL
        ? window.URL.createObjectURL(blob)
        : window.webkitURL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);

    /*
     * Safari thinks _blank anchor are pop ups. We only want to set _blank
     * target if the browser does not support the HTML5 download attribute.
     * This allows you to download files in desktop safari if pop up blocking
     * is enabled.
     */
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(tempLink);
    tempLink.click();

    // Fixes "webkit blob resource error 1"
    setTimeout(() => {
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }, 200);
  }
};

/**
 * Открыть файл в новом окне браузера
 *
 * @example
 *
 * Axios.get(url, { responseType: 'blob' }).then(res => { openFile(res.data); });
 *
 * @param {string | ArrayBuffer | ArrayBufferView | Blob} data - Данные
 * @param {string} [mime] - mime тип
 * @param {string} [bom] - bom
 *
 * @returns {void}
 */
export const openFile = (data, mime, bom) => {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data];
  const blob = new Blob(blobData, { type: mime || 'application/pdf' });
  const fileURL = URL.createObjectURL(blob);
  window.open(fileURL);
};

/**
 * ## Метод получает расширение имени файла
 * @example
 * getFileExtantion(fileName);
 *
 * @param {string} fileName - полное название файла полученное от сервера
 *
 * @returns {string} расширение файла
 */
export const getFileExtension = (fileName) => {
  if (fileName.indexOf('.') > -1) {
    return `.${fileName.split('.').pop()}`;
  }
  return '';
};

/**
 * ## Метод получает имя файла без расширения
 * @example
 * getFileName(fileName);
 *
 * @param {string} fileName - полное название файла полученное от сервера
 *
 * @returns {string} имя файла без расширения
 */
export const getFileName = (fileName) => {
  if (fileName.indexOf('.') === -1) {
    return fileName;
  }
  return fileName.split('.').slice(0, -1).join('.');
};

/**
 * ## Форматирует размер файла в читаемый формат
 *
 * @example
 * formatFileSize(1024);
 *
 * @param {number} bytes - размер файла в байтах
 * @param {number} decimals - количество знаков после запятой
 *
 * @returns {string} отформатированный размер файла
 */
// eslint-disable-next-line max-statements
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) {
    return '0 Б';
  }
  const kilo = 1024;
  const dec = decimals < 0 ? 0 : decimals;
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];

  const int = Math.floor(Math.log(bytes) / Math.log(kilo));

  return `${(bytes / kilo ** int).toFixed(dec)} ${sizes[int]}`;
};

/**
 * ## Метод есть ли объект в массив файлов
 * @example isFileDuplicate(filesArray, file);
 *
 * @param {array} filesArray - массив объектов с файлами
 * @param {object} file - загруженый файл в дропзону
 *
 * @returns {boolean} - найдены совпадения или нет
 */
export const isFileDuplicate = (filesArray, file) =>
  filesArray.some(
    (element) =>
      element.name === file.name &&
      element.size === file.size &&
      element.lastModified === file.lastModified,
  );

/**
 * ## Метод удаляет объект из массива файлов
 * @example deleteFileFromArray(filesArray, file);
 *
 * @param {array} filesArray - массив объектов с файлами
 * @param {object} file - объект на удаление
 *
 * @returns {array} - массив файлов
 */
export const deleteFileFromArray = (filesArray, file) =>
  filesArray.filter(
    (element) =>
      `${element.name}${element.size}${element.lastModified}` !==
      `${file.name}${file.size}${file.lastModified}`,
  );

/**
 * ## Метод формирует имя файла и добавляет в него текущую дату
 * @example addDateToFileName(name, extention);
 *
 * @param {string} name - имя файла к которому добавится дата
 * @param {string} extention - расширение файла
 *
 * @returns {string} - полное имя файла
 */
export const addDateToFileName = (name = 'документ', extention = 'pdf') =>
  `${name}_${setDateFormat()}.${extention}`;
