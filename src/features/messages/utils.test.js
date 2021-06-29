import {
  getCommentAuthor,
  getDirectionIcon,
  fixUrl,
  getAttachmentDataById,
  getAppealStatusStyle,
  getDocumentStatusStyle,
  getStatusStyle,
  setSortMessagesList,
  convertFeedback,
  setFilterMessagesList,
  isDocumentRequireSignature,
  isDocumentNotRequireSignature,
  isAppeal,
} from './utils.js';

import {
  BACKEND_URL_PREFIX,
  APPEAL_STATUS,
  INCOMING_DOCUMENT_STATUS,
} from './constants';

const attachments = [
  { file: { id: 1, size: 20, name: 'file1.pdf' } },
  { file: { id: 2, size: 20, name: 'file2.pdf' } },
  { file: { id: 3, size: 20, name: 'file3.pdf' } },
];

const authorOne = {
  rosim: false,
  name: {
    lastName: 'Данилов',
    firstName: 'Фёдор',
    middleName: 'Сергеевич',
  },
};

const authorTwo = {
  rosim: false,
  name: {
    lastName: 'Шлом',
    firstName: 'Анатолий',
  },
};

const authorRosim = {
  rosim: true,
};

describe('getCommentAuthor - Метод формирует отправителя комментария', () => {
  test('Должен вернуть корректное значение', () => {
    expect(getCommentAuthor(authorOne)).toBe('Фёдор Сергеевич Данилов');
    expect(getCommentAuthor(authorTwo)).toBe('Анатолий Шлом');
    expect(getCommentAuthor(authorRosim)).toBe('Росимущество');
  });
});

describe('getDirectionIcon - Метод формирует иконку указывающую направление последнего комментария', () => {
  test('Должен вернуть корректное значение класса', () => {
    expect(getDirectionIcon('IN')).toBe('novicon-double-arrow-left');
    expect(getDirectionIcon('OUT')).toBe('novicon-double-arrow-right');
    expect(getDirectionIcon('ERROR')).toBe(null);
    expect(getDirectionIcon(undefined)).toBe(null);
    expect(getDirectionIcon(null)).toBe(null);
  });
});

describe('fixUrl - убирает лишний префикс у URL полученного от бэкэнда', () => {
  test('Должен вернуть корректное значение класса', () => {
    expect(fixUrl(`${BACKEND_URL_PREFIX}/whatever`)).toBe('/whatever');
    expect(fixUrl(`${BACKEND_URL_PREFIX}/any-text`)).toBe('/any-text');
    expect(fixUrl(`${BACKEND_URL_PREFIX}/endpoin/params`)).not.toBe(
      `${BACKEND_URL_PREFIX}/endpoin/params`,
    );
    expect(fixUrl(`${BACKEND_URL_PREFIX}///`)).toBe('///');
    expect(fixUrl('any text')).toBe('any text');
  });
});

describe('fixUrl - убирает лишний префикс у URL полученного от бэкэнда', () => {
  test('Должен вернуть корректное значение класса', () => {
    expect(fixUrl(`${BACKEND_URL_PREFIX}/whatever`)).toBe('/whatever');
    expect(fixUrl(`${BACKEND_URL_PREFIX}/any-text`)).toBe('/any-text');
    expect(fixUrl(`${BACKEND_URL_PREFIX}/endpoin/params`)).not.toBe(
      `${BACKEND_URL_PREFIX}/endpoin/params`,
    );
    expect(fixUrl(`${BACKEND_URL_PREFIX}///`)).toBe('///');
    expect(fixUrl('any text')).toBe('any text');
  });
});

describe('getAttachmentDataById - ищет данные вложения по Id в дополнительных данных по обращению', () => {
  test('Должен вернуть корректное значение', () => {
    expect(getAttachmentDataById(attachments, 1)).toEqual(attachments[0]);
    expect(getAttachmentDataById(attachments, 2)).toEqual(attachments[1]);
    expect(getAttachmentDataById(attachments, 3)).toEqual(attachments[2]);
    expect(getAttachmentDataById(attachments, 4)).toBe(null);
  });
});

describe('getAppealStatusStyle - Метод определяющий какой CSS класс применять к тексту статуса обращения', () => {
  test('Должен вернуть корректное значение класса', () => {
    expect(getAppealStatusStyle(APPEAL_STATUS.DRAFT)).toBe('txt-info');
    expect(getAppealStatusStyle(APPEAL_STATUS.FINAL_ANSWER)).toBe(
      'txt-success',
    );
    expect(getAppealStatusStyle(APPEAL_STATUS.ADDITIONAL_INFO_REQUESTED)).toBe(
      'txt-warning',
    );
    expect(getAppealStatusStyle(APPEAL_STATUS.INTERIM_ANSWER)).toBe('txt-info');
    expect(getAppealStatusStyle(APPEAL_STATUS.SENT)).toBe('txt-info');
    expect(getAppealStatusStyle('any text')).toBe('txt-info');
    expect(getAppealStatusStyle('any text', false)).toBe('info');
    expect(getAppealStatusStyle(APPEAL_STATUS.SENT, false)).toBe('info');
    expect(
      getAppealStatusStyle(APPEAL_STATUS.ADDITIONAL_INFO_REQUESTED, true),
    ).toBe('txt-warning');
    expect(
      getAppealStatusStyle(APPEAL_STATUS.ADDITIONAL_INFO_REQUESTED, false),
    ).toBe('warning');
    expect(getAppealStatusStyle(APPEAL_STATUS.FINAL_ANSWER, false)).toBe(
      'success',
    );
  });
});

describe('getDocumentStatusStyle - Метод определяющий какой CSS класс применять к тексту статуса документа', () => {
  test('Должен вернуть корректное значение класса', () => {
    expect(getDocumentStatusStyle(INCOMING_DOCUMENT_STATUS.SIGNED)).toBe(
      'txt-success',
    );
    expect(getDocumentStatusStyle(INCOMING_DOCUMENT_STATUS.REJECTED)).toBe(
      'txt-success',
    );
    expect(getDocumentStatusStyle(INCOMING_DOCUMENT_STATUS.SIGNED, true)).toBe(
      'txt-success',
    );
    expect(
      getDocumentStatusStyle(INCOMING_DOCUMENT_STATUS.REJECTED, true),
    ).toBe('txt-success');
    expect(getDocumentStatusStyle(INCOMING_DOCUMENT_STATUS.SIGNED, false)).toBe(
      'success',
    );
    expect(
      getDocumentStatusStyle(INCOMING_DOCUMENT_STATUS.REJECTED, false),
    ).toBe('success');
    expect(
      getDocumentStatusStyle(INCOMING_DOCUMENT_STATUS.SIGN_REQUESTED),
    ).toBe('txt-warning');
    expect(
      getDocumentStatusStyle(INCOMING_DOCUMENT_STATUS.SIGN_REQUESTED, true),
    ).toBe('txt-warning');
    expect(
      getDocumentStatusStyle(INCOMING_DOCUMENT_STATUS.SIGN_REQUESTED, false),
    ).toBe('warning');
    expect(getDocumentStatusStyle('Any other status')).toBe('txt-info');
    expect(getDocumentStatusStyle('staus', true)).toBe('txt-info');
    expect(getDocumentStatusStyle('any staus', false)).toBe('info');
  });
});

describe('getStatusStyle - Метод определяющий какой CSS класс применять к статусу на основании типа сообщения и его статуса', () => {
  test('Должен вернуть корректное значение класса', () => {
    expect(
      getStatusStyle(
        'REQUIRED_CONFIRMATION_REQUIRED_SIGN',
        INCOMING_DOCUMENT_STATUS.SIGNED,
      ),
    ).toBe('txt-success');
    expect(
      getStatusStyle(
        'REQUIRED_CONFIRMATION_NOT_REQUIRED_SIGN',
        INCOMING_DOCUMENT_STATUS.REJECTED,
      ),
    ).toBe('txt-success');
    expect(
      getStatusStyle(
        'REQUIRED_CONFIRMATION_NOT_REQUIRED_SIGN',
        INCOMING_DOCUMENT_STATUS.SIGNED,
        true,
      ),
    ).toBe('txt-success');
    expect(
      getStatusStyle(
        'REQUIRED_CONFIRMATION_NOT_REQUIRED_SIGN',
        INCOMING_DOCUMENT_STATUS.REJECTED,
        true,
      ),
    ).toBe('txt-success');
    expect(
      getStatusStyle(
        'REQUIRED_CONFIRMATION_NOT_REQUIRED_SIGN',
        INCOMING_DOCUMENT_STATUS.SIGNED,
        false,
      ),
    ).toBe('success');
    expect(
      getStatusStyle(
        'REQUIRED_CONFIRMATION_NOT_REQUIRED_SIGN',
        INCOMING_DOCUMENT_STATUS.REJECTED,
        false,
      ),
    ).toBe('success');
    expect(
      getStatusStyle(
        'REQUIRED_CONFIRMATION_NOT_REQUIRED_SIGN',
        INCOMING_DOCUMENT_STATUS.SIGN_REQUESTED,
      ),
    ).toBe('txt-warning');
    expect(
      getStatusStyle(
        'REQUIRED_CONFIRMATION_REQUIRED_SIGN',
        INCOMING_DOCUMENT_STATUS.SIGN_REQUESTED,
        true,
      ),
    ).toBe('txt-warning');
    expect(
      getStatusStyle(
        'REQUIRED_CONFIRMATION_REQUIRED_SIGN',
        INCOMING_DOCUMENT_STATUS.SIGN_REQUESTED,
        false,
      ),
    ).toBe('warning');
    expect(getStatusStyle('Any-type', 'Any other status')).toBe('txt-info');
    expect(getStatusStyle('Any-type', 'staus', true)).toBe('txt-info');
    expect(getStatusStyle('Any-type', 'any staus', false)).toBe('info');
    expect(
      getStatusStyle('COMPLAINT_ON_ACTION', APPEAL_STATUS.FINAL_ANSWER),
    ).toBe('txt-success');
    expect(
      getStatusStyle(
        'CHANGE_DIRECTOR',
        APPEAL_STATUS.ADDITIONAL_INFO_REQUESTED,
      ),
    ).toBe('txt-warning');
    expect(
      getStatusStyle('CHANGE_CONTACT_DETAILS', APPEAL_STATUS.INTERIM_ANSWER),
    ).toBe('txt-info');
  });
});

describe('setSortMessagesList - Метод сортировки списка обращений', () => {
  test('Должен вернуть отсортированный список', () => {
    const sortStartCaseOne = [
      { updated: '2020-07-10T07:11:57Z' },
      { updated: '2020-07-10T07:12:57Z' },
      { updated: '2020-07-10T07:13:57Z' },
    ];
    const sortEndCaseOne = [
      { updated: '2020-07-10T07:13:57Z' },
      { updated: '2020-07-10T07:12:57Z' },
      { updated: '2020-07-10T07:11:57Z' },
    ];
    const sortStartCaseTwo = [
      { updated: '2019-07-10T07:13:57Z' },
      { updated: '2020-07-11T07:12:57Z' },
      { updated: '2020-07-10T07:11:57Z' },
      { updated: '2020-07-10T02:11:57Z' },
    ];
    const sortEndCaseTwo = [
      { updated: '2020-07-11T07:12:57Z' },
      { updated: '2020-07-10T07:11:57Z' },
      { updated: '2020-07-10T02:11:57Z' },
      { updated: '2019-07-10T07:13:57Z' },
    ];
    expect(setSortMessagesList(sortStartCaseOne)).toStrictEqual(sortEndCaseOne);
    expect(setSortMessagesList(sortStartCaseTwo)).toStrictEqual(sortEndCaseTwo);
    expect(setSortMessagesList(sortEndCaseTwo)).toStrictEqual(sortEndCaseTwo);
    expect(setSortMessagesList(sortStartCaseOne)).not.toStrictEqual(
      sortStartCaseOne,
    );
  });
});

describe('convertFeedback - преобразует оценку пользователя в серверный формат и обратно', () => {
  test('Должен вернуть корректное значение', () => {
    expect(convertFeedback(1)).toBe('ONE_POINT');
    expect(convertFeedback('ONE_POINT')).toBe(1);
    expect(convertFeedback(2)).toBe('TWO_POINTS');
    expect(convertFeedback('TWO_POINTS')).toBe(2);
    expect(convertFeedback(3)).toBe('THREE_POINTS');
    expect(convertFeedback('THREE_POINTS')).toBe(3);
    expect(convertFeedback(4)).toBe('FOUR_POINTS');
    expect(convertFeedback('FOUR_POINTS')).toBe(4);
    expect(convertFeedback(5)).toBe('FIVE_POINTS');
    expect(convertFeedback('FIVE_POINTS')).toBe(5);
    expect(convertFeedback('any text')).toBe(null);
    expect(convertFeedback(null)).toBe(null);
    expect(convertFeedback(10)).toBe(null);
  });
});

describe('setFilterMessagesList - фильтрует список обращений', () => {
  const caseOne = [{ title: 'test' }];
  const caseTwo = [
    { title: 'my simple test' },
    { title: 'what we should test next' },
  ];
  test('Должен вернуть корректный массив', () => {
    expect(setFilterMessagesList(caseOne, 'tes')).toStrictEqual(caseOne);
    expect(setFilterMessagesList(caseOne, 'tesp')).not.toStrictEqual(caseOne);
    expect(setFilterMessagesList(caseOne, 'tesp')).toStrictEqual([]);
    expect(setFilterMessagesList(caseOne, '[')).toStrictEqual([]);
    expect(setFilterMessagesList(caseTwo, 'ple')).toStrictEqual([caseTwo[0]]);
    expect(setFilterMessagesList(caseTwo, 'test')).toStrictEqual(caseTwo);
    expect(setFilterMessagesList(caseTwo, '')).toStrictEqual(caseTwo);
    expect(setFilterMessagesList(caseTwo, 'anytext')).toStrictEqual([]);
  });
});

describe('isDocumentRequireSignature - проверяет является ли обращение Входящим документом требующим подпись', () => {
  test('Должен вернуть корректное значение', () => {
    expect(
      isDocumentRequireSignature('REQUIRED_CONFIRMATION_REQUIRED_SIGN'),
    ).toBe(true);
    expect(
      isDocumentRequireSignature('REQUIRED_CONFIRMATION_NOT_REQUIRED_SIGN'),
    ).toBe(false);
    expect(
      isDocumentRequireSignature('NOT_REQUIRED_CONFIRMATION_NOT_REQUIRED_SIGN'),
    ).toBe(false);
    expect(isDocumentRequireSignature('OFFSET_TO_DIFFERENT_CONTRACT')).toBe(
      false,
    );
    expect(isDocumentRequireSignature('any-type')).toBe(false);
    expect(isDocumentRequireSignature()).toBe(false);
    expect(isDocumentRequireSignature(null)).toBe(false);
  });
});

describe('isDocumentNotRequireSignature - проверяет является ли обращение Входящим документом НЕ требующим подпись', () => {
  test('Должен вернуть корректное значение', () => {
    expect(
      isDocumentNotRequireSignature('REQUIRED_CONFIRMATION_REQUIRED_SIGN'),
    ).toBe(false);
    expect(
      isDocumentNotRequireSignature('REQUIRED_CONFIRMATION_NOT_REQUIRED_SIGN'),
    ).toBe(true);
    expect(
      isDocumentNotRequireSignature(
        'NOT_REQUIRED_CONFIRMATION_NOT_REQUIRED_SIGN',
      ),
    ).toBe(true);
    expect(isDocumentNotRequireSignature('OFFSET_TO_DIFFERENT_CONTRACT')).toBe(
      false,
    );
    expect(isDocumentNotRequireSignature('any-type')).toBe(false);
    expect(isDocumentNotRequireSignature()).toBe(false);
    expect(isDocumentNotRequireSignature(null)).toBe(false);
  });
});

describe('isAppeal - проверяет является ли обращение "Обращением по ЖС"', () => {
  test('Должен вернуть корректное значение', () => {
    expect(isAppeal('REQUIRED_CONFIRMATION_REQUIRED_SIGN')).toBe(false);
    expect(isAppeal('REQUIRED_CONFIRMATION_NOT_REQUIRED_SIGN')).toBe(false);
    expect(isAppeal('NOT_REQUIRED_CONFIRMATION_NOT_REQUIRED_SIGN')).toBe(false);
    expect(isAppeal('OFFSET_TO_DIFFERENT_CONTRACT')).toBe(true);
    expect(isAppeal('any-type')).toBe(false);
    expect(isAppeal()).toBe(false);
    expect(isAppeal(null)).toBe(false);
  });
});
