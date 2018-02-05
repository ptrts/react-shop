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
        style={{marginLeft: '-10px'}}
      >

        <div
          className="nav-button d-inline-block"
        >

          <div className="d-inline-flex align-items-end">

            {/*Для выравнивания по baseline, во flex должны лежать div inline-block, завернутые в другие div*/}
            <div>
              <div style={{display: 'inline-block'}}>{this.props.button}</div>
            </div>

            {/*Для выравнивания по baseline, во flex должны лежать div inline-block, завернутые в другие div*/}
            <div style={{marginBottom: '2px'}}>

              <div className="nav-dropdown-menu-down-arrow">

                {/*Отмечаем точку, от которой мы будем плясать*/}
                <div style={{
                  position: 'relative'
                }}>
                  {/*>>>>>>>>>>>>>>> КОНТЕКСТ НАЛОЖЕНИЯ <<<<<<<<<<<<<<<<<<<*/}
                  <div
                    style={{
                      position: 'absolute',
                      zIndex: 3,
                      display: this.state.modalVisible ? 'block' : 'none'
                    }}
                    className="nav-dropdown-menu-up-arrow"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/*Отмечаем точку, от которой мы будем плясать*/}
        <div style={{
          position: 'relative'
        }}>

          {/*Указываем на сколько мы будем плясать от этой точки*/}
          {/*>>>>>>>>>>>>>>> КОНТЕКСТ НАЛОЖЕНИЯ <<<<<<<<<<<<<<<<<<<*/}
          <div
            style={{
              position: 'absolute',
              zIndex: 2,
              top: '-5px',
              left: this.props.left
            }}
          >

            <Modal
              visible={this.state.mouseover}
              onVisibilityChanged={this.handleModalVisibilityChanged}
            >
              {this.props.modalContents}
            </Modal>

          </div>

        </div>

      </div>
    );
  }
}
