// ImageGalleryItem.js

import React from 'react';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends React.Component {
  handleClick = () => {
    this.props.openModal(this.props.image);
  };

  render() {
    const { image } = this.props;

    return (
      <li className={css.galleryItem} onClick={this.handleClick}>
        <img className={css.galleryImage} src={image.webformatURL} alt="" />
      </li>
    );
  }
}

export default ImageGalleryItem;
