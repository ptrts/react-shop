
import React from 'react';

import Modal from '../modal/Modal';

export default class ModalDropdownButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mouseover: false
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver() {
    this.setState({
      mouseover: true
    });
  }

  handleMouseOut() {
    this.setState({
      mouseover: false
    });
  }

  render() {
    return (
      <div
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {this.props.button}

        <div style={{
          position: 'relative'
        }}>

          <div
            style={{
              position: 'absolute',
              zIndex: 100
            }}
          >

            <Modal visible={this.state.mouseover}>
              {this.props.modal}
            </Modal>

          </div>

        </div>

      </div>
    );
  }
}
