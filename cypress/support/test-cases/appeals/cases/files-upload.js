import { FIXTURE_FILES } from '@support/common/constants';
import { largeFileUploadTimeout } from '@support/common/utils';

/**
 * Тест-кейс для проверки множественной загрузки файлов при заполнении анкеты ЖС
 *
 * @param {object} field - объект с полем загрузки файлов
 *
 */
export const multipleFilesUploadTestCase = (field) =>
  field
    .appendFile(FIXTURE_FILES.LITTLE_PNG)
    .shouldHaveFiles([FIXTURE_FILES.LITTLE_PNG])
    .appendFile(FIXTURE_FILES.LARGE_PNG)
    .waitStopLoading({ timeout: largeFileUploadTimeout() })
    .shouldHaveFiles([FIXTURE_FILES.LITTLE_PNG, FIXTURE_FILES.LARGE_PNG])
    .appendFile(FIXTURE_FILES.EXTRA_LARGE_PNG)
    .shouldBeFailureBySize();

/**
 * Тест-кейс для проверки загрузки файла при заполнении анкеты ЖС
 *
 * @param {object} field - объект с полем загрузки файла
 *
 */
export const singleFileUploadTestCase = (field) =>
  field
    .appendFile(FIXTURE_FILES.LITTLE_PNG)
    .shouldBeSuccess()
    .appendFile(FIXTURE_FILES.LARGE_PNG)
    .shouldBeSuccess({ timeout: largeFileUploadTimeout() })
    .appendFile(FIXTURE_FILES.EXTRA_LARGE_PNG)
    .shouldBeFailureBySize();
