const puppeteer = require('puppeteer');

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function getCookies({ page, options } = {}) {
  const cookies = options.getAllBrowserCookies
    ? await getCookiesForAllDomains(page)
    : await page.cookies(options.loginUrl);

  if (options.logs) {
    console.log(cookies);
  }

  return cookies;
}

async function getLocalStorageData({ page, options } = {}) {
  const localStorageData = await page.evaluate(() => {
    let json = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      json[key] = localStorage.getItem(key);
    }
    return json;
  });
  if (options.logs) {
    console.log(localStorageData);
  }

  return localStorageData;
}

async function getSessionStorageData({ page, options } = {}) {
  const sessionStorageData = await page.evaluate(() => {
    let json = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      json[key] = sessionStorage.getItem(key);
    }
    return json;
  });
  if (options.logs) {
    console.log(sessionStorageData);
  }

  return sessionStorageData;
}

async function loginConnect({
  selectSnilsTab,
  typeUsername,
  typePassword,
  chooseOrganization,
  postLogin,
  options,
}) {
  const launchOptions = {
    headless: !!options.headless,
  };

  if (options.args && options.args.length) {
    launchOptions.args = options.args;
  }

  const browser = await puppeteer.launch(launchOptions);
  let page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-USq=0.9,enq=0.8',
  });
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
  );

  await page.goto(options.loginUrl);

  await selectSnilsTab({ page, options });
  await typeUsername({ page, options });
  await typePassword({ page, options });
  await chooseOrganization({ page, options });
  await postLogin({ page, options });

  if (options.cookieDelay) {
    await delay(options.cookieDelay);
  }

  const cookies = await getCookies({ page, options });
  const localStorageData = await getLocalStorageData({ page, options });
  const sessionStorageData = await getSessionStorageData({ page, options });

  await browser.close();

  return {
    cookies,
    localStorageData,
    sessionStorageData,
  };
}

/**
 * Авторизация через ЕСИА
 *
 * @param {object} params - входные параметры
 * @param {string} params.loginUrl - url для авторизации
 * @param {string} params.snils - снилс
 * @param {string} params.password - пароль
 * @param {string} params.organizationName - название организации
 */
async function esiaLogin({ loginUrl, snils, password, organizationName } = {}) {
  const selectSnilsTab = async function ({ page } = {}) {
    //await page.waitForSelector('a[data-bind="click: toSnils"]');
    //await page.click('a[data-bind="click: toSnils"]');
    //await delay(10);
  };

  const typeUsername = async function ({ page, options } = {}) {
    const selector = 'input#login';
    await page.waitForSelector(selector);
    await page.type(selector, options.snils, { delay: 15 });
  };

  const typePassword = async function ({ page, options } = {}) {
    await page.waitForSelector('input#password');
    await page.type('input#password', options.password);
    await page.waitForSelector('button#loginByPwdButton');
    await page.click('button#loginByPwdButton');
  };

  const chooseOrganization = async function ({ page, options } = {}) {
    await page.waitForSelector('div.header .logo');
    const [organizationElement] = await page.$x(
      `//div[contains(text(), "${options.organizationName}")]`,
    );

    if (organizationElement) {
      await organizationElement.click();
    }

    await page.waitForSelector('button#proceed-button');
    await page.click('button#proceed-button');
  };

  const postLogin = async function ({ page } = {}) {
    await page.waitForSelector('body.nova div#app');
  };

  return loginConnect({
    selectSnilsTab,
    typeUsername,
    typePassword,
    chooseOrganization,
    postLogin,
    options: {
      loginUrl,
      snils,
      password,
      organizationName,
      args: ['--ignore-certificate-errors'],
    },
  });
}

module.exports = {
  esiaLogin,
};
