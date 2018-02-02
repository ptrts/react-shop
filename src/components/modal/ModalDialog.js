import React from 'react';

export default class ModalDialog extends React.Component {

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          border: 'solid black 1px',
          backgroundColor: 'lightgreen',
          width: '200px',
          height: '200px',
          zIndex: 100
        }}
      >
        This is a modal
      </div>
    );
  }
}
