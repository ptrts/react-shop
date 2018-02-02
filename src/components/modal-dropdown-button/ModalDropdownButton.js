
import React from 'react';

import Modal from '../modal/Modal';

export default class ModalDropdownButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mouseover: false,
      modalVisible: false
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleModalVisibilityChanged = this.handleModalVisibilityChanged.bind(this);
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

  handleModalVisibilityChanged(visible) {
    this.setState({
      modalVisible: visible
    });
  }

  render() {
    return (
      <div
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >

        <div className="d-inline-flex">

          <div>{this.props.button}</div>

          <div className="nav-dropdown-menu-down-arrow">

            <div style={{
              position: 'relative'
            }}>

              <div
                style={{
                  position: 'absolute',
                  zIndex: 110,
                  display: this.state.modalVisible ? 'block' : 'none'
                }}
                className="nav-dropdown-menu-up-arrow"
              />

            </div>

          </div>

        </div>

        <div style={{
          position: 'relative'
        }}>

          <div
            style={{
              position: 'absolute',
              zIndex: 100,
              left: this.props.left
            }}
          >

            <Modal
              visible={this.state.mouseover}
              onVisibilityChanged={this.handleModalVisibilityChanged}
            >
              {this.props.modal}
            </Modal>

          </div>

        </div>

      </div>
    );
  }
}
