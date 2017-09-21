/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

// Это для составления путей к файлам
const path = require('path');

// Делаем путь к каталогу с исходниками
const srcPath = path.join(__dirname, '/../src');

// Порт, на котором нужно открывать сервер для разработки
const defaultPort = 8000;

function getDefaultModules() {

  return {

    // Какие-то прелоудеры, наверно у нового вебпака такое есть
    preLoaders: [

      {
        // Исходники js и jsx
        test: /\.(js|jsx)$/,

        // Которые лежат в каталоге исходников нашего проекта
        include: srcPath,

        // Прогнать через eslint, линтер для нового JavaScript, который у нас теперь EcmaScript2015
        loader: 'eslint-loader'
      }
    ],

    // Теперь нормальные лоудеры
    loaders: [

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },

      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },

      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },

      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },

      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  };
}

// Экспортируем объект, который не является настройками WebPack, это просто какой-то вспомогательный объект,
// из которого будут браться настройки для конфигов
module.exports = {

  // Исходники здесь
  srcPath: srcPath,

  // Что-то там должно лежать в каталоге assets, но у нас такого каталога нет
  publicPath: '/assets/',

  // Дефолтный порт - вот такой
  port: defaultPort,

  // Вот метод для получения дефолтного значения modules, там есть loaders и preLoaders
  getDefaultModules: getDefaultModules
};
