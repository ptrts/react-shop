/* eslint-disable no-console */

import React from 'react';
import $ from 'jquery';

let that;

export default class ModalBackdrop extends React.Component {

  static show() {
    that.setState({
      visible: true
    });
    console.log('after show');
  }

  static hide() {
    that.setState({
      visible: false
    });
    console.log('after hide');
  }

  constructor(props) {
    super(props);

    this.state = {
      top: 0,
      visible: false
    };

    that = this;
  }

  componentDidMount() {

    this.updateTop();

    window.addEventListener('resize', this.updateTop, false);
    window.addEventListener('scroll', this.updateTop, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateTop, false);
    window.removeEventListener('scroll', this.updateTop, false);
  }

  updateTop() {

    const scrollTop = $(window).scrollTop();

    const topInDocument = $('#modalBegin').offset().top;

    const topInWindow = topInDocument - scrollTop;

    that.setState({
      top: topInWindow
    });
  }

  render() {
    return (
      <div>

        <div id="modalBegin"/>

        <div
          style={{
            display: this.state.visible ? 'block' : 'none',
            position: 'fixed',
            backgroundColor: 'black',
            opacity: 0.5,
            top: this.state.top,
            bottom: '0px',
            left: '0px',
            right: '0px'
          }}
        />

      </div>
    );
  }
}
