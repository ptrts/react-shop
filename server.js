/*eslint no-console:0 */

'use strict';

require('core-js/fn/object/assign');

// Импортируем функцию webpack, которая есть в модуле webpack для node.js
// С webpack можно работать не только через CLI, но и через модуль для node.js
// webpack - это не только пакет npm, в котором есть утилита командной строки.
// Пакет также содержит и модуль для node.js, при помощи которого можно совершать
// компиляцию и запуск приложения из приложений node.js
const webpack = require('webpack');

// Импортируем также DevServer
const WebpackDevServer = require('webpack-dev-server');

// Загружаем нашу конфигурацию WebPack, в соответствии с параметрами запуска текущего приложения node.js
const config = require('./webpack-env-config');

// Запускаем сборку проекта вебпаком, с конфигурацией, которая у нас есть в проекте
// Получаем ссылку на скомпилированое приложение как объект
const compiler = webpack(config);

// Запускаем DevServer на базе скомпилированного нами
// Это веб сервер, который умеет выдавать html, css и js нашего скомпилированного приложения
// Кроме того, он смотрит за исходниками, из которых произошла компиляция, и если они изменились,
// то запускает перекомпиляцию
new WebpackDevServer(compiler, config.devServer)

  .listen(

    // В конфиге написан порт, на котором нужно открывать DevServer
    config.port,

    'localhost',

    (err) => {
      if(err) {
        console.log(err);
      }
      console.log('Listening at localhost:' + config.port);
    }
  );

let isInitialCompilation = true;

compiler.plugin('done', () => {

  if(isInitialCompilation) {
    // Ensures that we log after webpack printed its stats (is there a better way?)
    setTimeout(() => {
      console.log('\n✓ The bundle is now ready for serving!\n');
      console.log('  Open in iframe mode:\t\x1b[33m%s\x1b[0m', 'http://localhost:' + config.port + '/webpack-dev-server/');
      console.log('  Open in inline mode:\t\x1b[33m%s\x1b[0m', 'http://localhost:' + config.port + '/\n');
      console.log('  \x1b[33mHMR is active\x1b[0m. The bundle will automatically rebuild and live-update on changes.')
    }, 350);
  }

  isInitialCompilation = false;

});
