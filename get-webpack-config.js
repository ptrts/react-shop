/*eslint no-console:0 */

'use strict';

// Это для работы с webpack через интерфейс node.js
const webpack = require('webpack');

// Плагин вебпака для боуера (зачем???)
const BowerWebpackPlugin = require('bower-webpack-plugin');

const {ifDev, ifDist, ifTest, ifNotTest, switchEnv} = require('./config-env-conditions');

const path = require('path');

const srcPath = path.join(__dirname, '/src');

const testPath = path.join(__dirname, '/test');

module.exports = () => {

  let config = {

    // Нужен дебаг
    debug: ifNotTest(),

    devtool: switchEnv({
      dev: 'eval-source-map',
      dist: 'sourcemap',
      test: 'eval'
    }),

    resolve: {
      extensions: ['', '.js', '.jsx'],
      alias: Object.assign(
        {
          actions: `${srcPath}/actions/`,
          components: `${srcPath}/components/`,
          sources: `${srcPath}/sources/`,
          stores: `${srcPath}/stores/`,
          styles: `${srcPath}/styles/`,
          config: `${srcPath}/config/${process.env.APP_ENV}`
        },

        ifNotTest({
          'react/lib/ReactMount': 'react-dom/lib/ReactMount'
        }),

        ifTest({
          helpers: `${testPath}/helpers`
        })
      )
    },

    module: {

      // Какие-то прелоудеры, наверно у нового вебпака такое есть
      preLoaders: [

        {
          // Исходники js и jsx
          test: /\.(js|jsx)$/,

          // Которые лежат в каталоге исходников нашего проекта
          include: srcPath,

          loader: ifTest('isparta-instrumenter-loader', 'eslint-loader')
        }
      ],

      // Теперь нормальные лоудеры
      loaders: [

        ...ifTest([
          {
            test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
            loader: 'null-loader'
          }
        ]),

        ...ifNotTest([
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
        ]),

        {
          // Загружает файлы js и jsx
          test: /\.(js|jsx)$/,

          loader: ifDev('react-hot!') + 'babel-loader',

          // Загружать только файлы из таких каталогов
          include: [
            srcPath,

            ...ifTest([
              testPath
            ])
          ]
        }
      ]

    },

    cache: ifDev(),

    plugins: [

      ...ifDev([
        new webpack.HotModuleReplacementPlugin()
      ]),

      ...ifNotTest([
        new webpack.NoErrorsPlugin()
      ]),

      new BowerWebpackPlugin({
        searchResolveModulesDirectories: false
      }),

      ...ifDist([
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),

        new webpack.optimize.DedupePlugin(),

        new webpack.optimize.UglifyJsPlugin(),

        new webpack.optimize.OccurenceOrderPlugin(),

        new webpack.optimize.AggressiveMergingPlugin()
      ])
    ]
  };

  Object.assign(

    config,

    ifNotTest({

      // Это наверное как паковать статические ресурсы
      output: {

        path: path.join(__dirname, '/dist/assets'),

        // Надо собрать файл app.js
        filename: 'app.js',

        // Непонятное
        publicPath: '/assets/'
      },

      devServer: {
        contentBase: './src/',
        historyApiFallback: true,
        hot: true,
        port: 8000,
        publicPath: '/assets/',
        noInfo: false
      },

      entry: [

        ...ifDev([
          'webpack-dev-server/client?http://127.0.0.1:8000',
          'webpack/hot/only-dev-server'
        ]),

        './src/index'
      ]
    })
  );

  console.log('WebPack configuration for ' + process.env.APP_ENV);

  console.log(JSON.stringify(config, null, '\t'));

  return config;
};
