/* eslint-disable no-console */

import React from 'react';

import ModalBackdrop from './ModalBackdrop'

export default class Modal extends React.Component {

  componentDidUpdate() {
    if (this.props.visible) {
      console.log('visible');
      ModalBackdrop.show();
    } else {
      console.log('not visible');
      ModalBackdrop.hide();
    }
  }

  render() {
    return (
      <div style={{
        display: this.props.visible ? 'block' : 'none',
        color: 'black',
        backgroundColor: 'white',
        border: 'black solid 1px',
        width: 400
      }}>
          {this.props.children}
      </div>
    );
  }
}
