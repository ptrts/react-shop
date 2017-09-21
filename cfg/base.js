'use strict';

// Для сборки путей к файлам
let path = require('path');

// Достаем объект с дефолтными настройками
let defaultSettings = require('./defaults');

// Какие-то дополнительные пути. Это для подключения каких-то зависимостей, которые не импортируются в
// модули нашего проекта, а какие-то особенные.
module.exports = {

  // Дополнительные пути, в которые потом можно будет добавить, например, react-bootstrap, вот так:
  //    let npmBase = path.join(__dirname, '../node_modules');
  //    let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
  // Частью конфигурации webpack не является. Это наша собственная добавка в объект конфигурации вебпака
  additionalPaths: [],

  // Порт, на котором нужно будет открыть дев сервер
  // Здесь нужно читать документацию к дев серверу о том, как это все работает
  port: defaultSettings.port,

  // Нужен дебаг
  debug: true,

  // Какой-то странный девтул
  devtool: 'eval',

  // Это наверное как паковать статические ресурсы
  output: {

    path: path.join(__dirname, '/../dist/assets'),

    // Надо собрать файл app.js
    filename: 'app.js',

    // Непонятное
    publicPath: defaultSettings.publicPath
  },

  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      sources: `${defaultSettings.srcPath}/sources/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV,
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  },

  module: {}
};
