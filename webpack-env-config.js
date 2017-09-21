/*eslint no-console:0 */

'use strict';

const path = require('path');

// Взять аргументы командной строки, начиная с третьего
//
// Вообще, аргументы в этом массиве, они примерно вот такие:
//    argv[0] === 'node'
//    argv[1] === 'server.js'
//    argv[2] === '--env=dev'
let scriptArguments = process.argv.slice(2);

// Импортируем minimist
let minimist = require('minimist');

// Пропускаем аргументы через minimist
const minimistArgs = minimist(scriptArguments);

// Сейчас будем делать значение переменной env
let env;

// args._ - это наверное аргументы, которые не ключ-значение, а просто строки
// смотрим, есть ли аргумент-просто строка start
if (minimistArgs._.length > 0 && minimistArgs._.indexOf('start') !== -1) {

  // Если есть аргумент просто-строка start, то ставим env === test
  env = 'test';

} else if (minimistArgs.env) {

  // Если среди аргументов есть аргумент env, то берем его значение
  env = minimistArgs.env;

} else {

  // Если аргумента env нету, то ставим dev
  env = 'dev';
}

// Вообще, из того что у нас запускается через ноду, у нас всегда --env=dev или --env=dist

// Делаем в процессе переменную REACT_WEBPACK_ENV, и ставим туда значение нашей env
process.env.REACT_WEBPACK_ENV = env;

// Правильные env - вот такие, хотя мы еще не проверяли нашу env на правильность
const allowedEnvs = ['dev', 'dist', 'test'];

// В этот метод передается env, который пришел к нам в параметрах запуска скрипта
function loadEnvConfig(wantedEnv) {

  // Делаем флажок, что env задан, и является одним из корректных вариантов
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;

  // Если корректного env нету, то ставим dev
  let validEnv = isValid ? wantedEnv : 'dev';

  // Собираем имя файла, в котором лежат настройки для вот такого env
  let envModuleName = path.join(__dirname, 'cfg/' + validEnv);

  // Загружаем конфиг для текущего значения env
  let config = require(envModuleName);

  // Возвращаем этот самый конфиг
  return config;
}

module.exports = loadEnvConfig(env);
