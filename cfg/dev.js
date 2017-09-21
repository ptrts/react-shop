'use strict';

// Это для сборки путей к файлам
let path = require('path');

// Это для работы с webpack через интерфейс node.js
let webpack = require('webpack');

// Загружаем базовую конфигурацию
let baseConfig = require('./base');

// Загружаем параметры по-умолчанию
let defaultSettings = require('./defaults');

// Плагин вебпака для боуера (зачем???)
let BowerWebpackPlugin = require('bower-webpack-plugin');

// Берем базовый конфиг, и прибавляем к нему параметры конфигурации для разработки
let config = Object.assign(

  {},

  baseConfig,

  {
    entry: [
      'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
      'webpack/hot/only-dev-server',
      './src/index'
    ],

    cache: true,

    devtool: 'eval-source-map',

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new BowerWebpackPlugin({
        searchResolveModulesDirectories: false
      })
    ],
    module: defaultSettings.getDefaultModules()
  }
);

// Добавляем лоудер
config.module.loaders.push({

  // Загружает файлы js и jsx
  test: /\.(js|jsx)$/,

  // Сначала загружаем бабелем, а потом react-hot
  loader: 'react-hot!babel-loader',

  // Загружать только файлы из таких каталогов
  include: [].concat(

    // Массив каких-то дополнительных путей
    config.additionalPaths,

    // Массив обычных путей, где у нас лежат исходники
    [
      path.join(__dirname, '/../src')
    ]
  )
});

module.exports = config;
