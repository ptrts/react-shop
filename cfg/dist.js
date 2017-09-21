'use strict';

// Достаем собиратель путей к файлам
let path = require('path');

// Достаем сам вебпак
let webpack = require('webpack');

// Достаем базовый конфиг
let baseConfig = require('./base');

// Достаем объект с дефолтами
let defaultSettings = require('./defaults');

// Достаем какой-то плагин для боуера. Зачем?
let BowerWebpackPlugin = require('bower-webpack-plugin');

// Собираем общий конфиг, на базе базового конфига и наших местных добавочек
let config = Object.assign(

  {},

  baseConfig,

  {

    // Начинается все только с index.js, без всяких вебпаковских серверов, и т.д.
    entry: path.join(__dirname, '../src/index'),

    // Какой-то там вебпаковский кеш выключаем. В деве он у нас влючен
    cache: false,

    // девтул делае sourcemap. В деве у нас стоит eval-sourcemap
    devtool: 'sourcemap',

    // Плагины. Здесь у нас много плагинов из семейства webpack.optimize
    plugins: [

      new webpack.optimize.DedupePlugin(),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),

      new BowerWebpackPlugin({
        searchResolveModulesDirectories: false
      }),

      new webpack.optimize.UglifyJsPlugin(),

      new webpack.optimize.OccurenceOrderPlugin(),

      new webpack.optimize.AggressiveMergingPlugin(),

      new webpack.NoErrorsPlugin()
    ],

    // Ставим дефолтные настройки группы module
    // Там у нас лежат лоудеры и прелоудеры
    module: defaultSettings.getDefaultModules()
  }
);

// Добавляем дополнительные лоудеры к дефолтным
config.module.loaders.push({

  test: /\.(js|jsx)$/,

  // Здесь у нас только бабель, нету react-hot
  loader: 'babel',

  // Обычные каталоги с исходниками
  include: [].concat(

    config.additionalPaths,

    [
      path.join(__dirname, '/../src')
    ]
  )
});

module.exports = config;
