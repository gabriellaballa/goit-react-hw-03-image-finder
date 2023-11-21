// Modal.js

import React from 'react';
import css from './Modal.module.css';

class Modal extends React.Component {
  handleClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;

    return (
      <div className={css.overlay} onClick={this.handleClose}>
        <div className={css.modal}>
          <img src={image.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
