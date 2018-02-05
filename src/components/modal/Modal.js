/* eslint-disable no-console */

import React from 'react';

import ModalBackdrop from './ModalBackdrop'

export default class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  setShowTimeoutIfNeeded() {

    if (!this.showTimeout) {

      this.showTimeout = setTimeout(

        () => {

          this.showTimeout = null;

          this.setState({
            visible: true
          });

          if (this.props.onVisibilityChanged) {
            this.props.onVisibilityChanged(true);
          }
        },

        100
      );
    }
  }

  clearShowTimeoutIfNeeded() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
  }

  setHideTimeoutIfNeeded() {

    if (!this.hideTimeout) {

      this.hideTimeout = setTimeout(

        () => {

          this.hideTimeout = null;

          this.setState({
            visible: false
          });

          if (this.props.onVisibilityChanged) {
            this.props.onVisibilityChanged(false);
          }
        },

        10
      );
    }
  }

  clearHideTimeoutIfNeeded() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  updateThings() {

    this.setState((prevState, props) => {

      if (props.visible) {

        // Наверху просят показаться

        if (!prevState.visible) {

          // А мы не показанные

          // Значит, надо собраться показываться, если мы еще не собрались
          this.setShowTimeoutIfNeeded();

        } else {

          // А мы как раз и показываемся

          // Но, может быть, мы запланировали себе скрыться
          // Тогда - отказываемся от этой идеи
          this.clearHideTimeoutIfNeeded();
        }

      } else {

        // Наверху просят скрыться

        if (prevState.visible) {

          // А мы отображаемся

          // Значит, надо собраться скрываться, если мы еще не собрались
          this.setHideTimeoutIfNeeded();

        } else {

          // А мы как раз и есть скрытые

          // Но, может быть, мы запланировали себе показаться
          // Тогда - отказываемся от этой идеи
          this.clearShowTimeoutIfNeeded();
        }
      }
    });
  }

  componentDidMount() {
    this.updateThings();
  }

  componentWillUpdate() {
    this.updateThings();
  }

  componentDidUpdate() {
    if (this.props.visible) {
      // console.log('visible');
      ModalBackdrop.show();
    } else {
      // console.log('not visible');
      ModalBackdrop.hide();
    }
  }

  render() {
    return (
      <div style={{
        display: this.state.visible ? 'block' : 'none',
        color: 'black',
        backgroundColor: 'white',
        border: 'black solid 1px'
      }}>
          {this.props.children}
      </div>
    );
  }
}
