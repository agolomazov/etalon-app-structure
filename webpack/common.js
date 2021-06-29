const babelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getConfig = require('./config');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: babelLoaderExcludeNodeModulesExcept([
          'crypto-types',
          'crypto-api',
        ]),
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(eot|png|ttf|svg|woff|woff2)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
          'img-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@common': getConfig('appCommon'),
      '@styles': getConfig('appStyles'),
      '@features': getConfig('appFeatures'),
      '@processes': getConfig('appProcesses'),
      '@pages': getConfig('appPages'),
      '@store': getConfig('appStore'),
      '@src': getConfig('appDir'),
      '@packageSrc': getConfig('appPackageJson'),
      '@mockups': getConfig('appMockups'),
      '@mockups-pages': getConfig('appMockupsPages'),
      '@mockups-components': getConfig('appMockupsComponents'),
      '@mockups-layouts': getConfig('appMockupsLayouts'),
    },
    extensions: ['.jsx', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
