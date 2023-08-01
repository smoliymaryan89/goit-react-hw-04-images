import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => (
  <>
    <GalleryItem
      onClick={() => {
        onClick(largeImageURL);
      }}
    >
      <img src={webformatURL} alt={tags} />
    </GalleryItem>
  </>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
