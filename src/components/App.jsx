import { useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import fetchImages from 'api/pixabay-api';
import Loader from './Loader/Loader';
import Button from './Button/Button';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [images, setImages] = useState(null);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPage = total / images?.length;

  const onSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages(null);
  };
  const onSearchImages = useCallback(async () => {
    if (!searchQuery) return;

    setIsLoading(true);

    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      if (hits.length === 0) {
        setIsLoading(false);
        return toast.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      setImages(prev => (prev ? [...prev, ...hits] : hits));
      setTotal(totalHits);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [page, searchQuery]);

  useEffect(() => {
    onSearchImages();
  }, [onSearchImages]);

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const onImgClick = largeImageUrl => {
    setLargeImageUrl(largeImageUrl);
    toggleModal();
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      {error && toast.error('Something went wrong, please try again!')}
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery onClick={onImgClick} images={images} />
      {isLoading && <Loader />}
      {totalPage > 1 && !isLoading && <Button onClick={onLoadMore} />}
      {showModal && (
        <Modal onClose={toggleModal} largeImageUrl={largeImageUrl} />
      )}
    </>
  );
};

export default App;
