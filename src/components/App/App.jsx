import { useState, useRef, useEffect } from 'react';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import * as API from 'services/api';
import { Loader } from '../Loader/Loader';
import { AppWrapper } from './App.styled';
import { Error } from 'components/Error/Error';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [isShowBtn, setIsShowBtn] = useState(false);
  const abortCtrl = useRef();
  const imagesPerPage = 12;

  useEffect(() => {
    if (searchValue === '') return;

    const getImages = async () => {
      if (abortCtrl.current) {
        abortCtrl.current.abort();
      }

      abortCtrl.current = new AbortController();

      try {
        setStatus('pending');

        const images = await API.getImages(
          searchValue,
          currentPage,
          imagesPerPage,
          abortCtrl.current.signal
        );

        if (images.hits.length === 0) {
          throw new Error();
        }

        setStatus('resolved');
        setImages(prevState => [...prevState, ...images.hits]);
        setIsShowBtn(currentPage < Math.ceil(images.totalHits / imagesPerPage));
      } catch (error) {
        setStatus('rejected');
      }
    };

    getImages();
  }, [searchValue, currentPage]);

  const onSubmit = query => {
    if (searchValue === query) {
      return;
    }

    setSearchValue(query);
    setCurrentPage(1);
    setImages([]);
  };

  const onBtnClick = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  if (status === 'pending') {
    return (
      <AppWrapper>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery images={images} />
        <Loader />
      </AppWrapper>
    );
  }

  if (status === 'resolved') {
    return (
      <AppWrapper>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery images={images} />
        {isShowBtn && <Button onClick={onBtnClick} />}
      </AppWrapper>
    );
  }

  if (status === 'rejected') {
    return (
      <AppWrapper>
        <Searchbar onSubmit={onSubmit} />
        <Error />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper>
      <Searchbar onSubmit={onSubmit} />
    </AppWrapper>
  );
};
