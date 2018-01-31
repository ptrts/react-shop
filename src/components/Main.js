import 'normalize.css/normalize.css';
import '../styles/global/global.scss';
import '../styles/App.css';

import 'bootstrap';

import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (

      <div>

        <div className="container-fluid">

          <br/>

          <div className="row app-bg-dark-2 text-white p-2">

            <div className="col-1">
              Лого Амазона
            </div>

            <div className="col">
              Строка поиска
            </div>

            <div className="col-3">
              Разные переменные штуки
            </div>

          </div>

          <div className="row app-bg-dark-2 text-white p-2">

            <div className="col-1">
              Departments
            </div>

            <div className="col">
              Немного ссылок с навигацией
            </div>

            <div className="col-3">
              Личный кабинет, текущие заказы, реклама прайма, корзина
            </div>
          </div>

        </div>

        {/*<div className="container-fluid">
          <div>------------</div>

          <div className="row app-bg-primary-lighter-11">-11</div>
          <div className="row app-bg-primary-lighter-10">-10</div>
          <div className="row app-bg-primary-lighter-9">-9</div>
          <div className="row app-bg-primary-lighter-8">-8</div>
          <div className="row app-bg-primary-lighter-7">-7</div>
          <div className="row app-bg-primary-lighter-6">-6</div>
          <div className="row app-bg-primary-lighter-5">-5</div>
          <div className="row app-bg-primary-lighter-4">-4</div>
          <div className="row app-bg-primary-lighter-3">-3</div>
          <div className="row app-bg-primary-lighter-2">-2</div>
          <div className="row app-bg-primary-lighter-1">-1</div>
          <div className="row app-bg-primary">0</div>
          <div className="row app-bg-primary-darker-1">1</div>
          <div className="row app-bg-primary-darker-2">2</div>
          <div className="row app-bg-primary-darker-3">3</div>
          <div className="row app-bg-primary-darker-4">4</div>
          <div className="row app-bg-primary-darker-5">5</div>
          <div className="row app-bg-primary-darker-6">6</div>
          <div className="row app-bg-primary-darker-7">7</div>
          <div className="row app-bg-primary-darker-8">8</div>
          <div className="row app-bg-primary-darker-9">9</div>
          <div className="row app-bg-primary-darker-10">10</div>
          <div className="row app-bg-primary-darker-11">11</div>

          <div>------------</div>

          <div className="row app-bg-dark-1">1</div>
          <div className="row app-bg-dark-2">2</div>
          <div className="row app-bg-dark-3">3</div>

          <div>------------</div>

          <div className="row app-bg-blue-1">1</div>
          <div className="row app-bg-blue-2">2</div>
          <div className="row app-bg-blue-3">3</div>
          <div className="row app-bg-blue-4">4</div>
          <div className="row app-bg-blue-5">5</div>

        </div>*/}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
