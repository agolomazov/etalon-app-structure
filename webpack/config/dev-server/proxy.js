const DEV_STAND_ROOT_URL = 'http://45.89.226.2:41048';

const constructDevStandUrl = (path) => `${DEV_STAND_ROOT_URL}${path}`;

const headers = !process.env.DEV_STAND
  ? { Authorization: 'Bearer token' }
  : undefined;

module.exports = [
  {
    context: ['/tenant-contract/api/v*/**'],
    target: process.env.DEV_STAND
      ? constructDevStandUrl('/ros/')
      : 'http://127.0.0.1:4020',
    pathRewrite: !process.env.DEV_STAND
      ? {
          '^/tenant-contract': '',
        }
      : undefined,
    changeOrigin: true,
    headers,
  },
  {
    context: ['/openid-connect-auth/**'],
    target: constructDevStandUrl('/'),
    changeOrigin: true,
  },
  {
    context: ['/crypto/**'],
    target: constructDevStandUrl('/ros/'),
    changeOrigin: true,
  },
];
