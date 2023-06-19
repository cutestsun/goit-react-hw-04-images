import { Component } from 'react';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import * as API from 'services/api';
import { Loader } from '../Loader/Loader';
import { AppWrapper } from './App.styled';
import { Error } from 'components/Error/Error';

export class App extends Component {
  abortCtrl;

  state = {
    searchValue: '',
    images: [],
    currentPage: 1,
    status: 'idle',
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { currentPage, searchValue } = this.state;

    if (this.abortCtrl) {
      this.abortCtrl.abort();
    }

    this.abortCtrl = new AbortController();

    try {
      this.setState({ status: 'pending' });

      const images = await API.getImages(
        searchValue,
        currentPage,
        this.abortCtrl.signal
      );

      if (images.hits.length === 0) {
        throw new Error();
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({
        status: 'rejected',
      });
    }
  };

  onSubmit = searchValue => {
    if (this.state.searchValue === searchValue) {
      return;
    }

    this.setState({
      searchValue,
      currentPage: 1,
      images: [],
    });
  };

  onBtnClick = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { status, images } = this.state;

    if (status === 'pending') {
      return (
        <AppWrapper>
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery images={images} />
          <Loader />
        </AppWrapper>
      );
    }

    if (status === 'resolved') {
      return (
        <AppWrapper>
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery images={images} />
          <Button onClick={this.onBtnClick} />
        </AppWrapper>
      );
    }

    if (status === 'rejected') {
      return (
        <AppWrapper>
          <Searchbar onSubmit={this.onSubmit} />
          <Error />
        </AppWrapper>
      );
    }

    return (
      <AppWrapper>
        <Searchbar onSubmit={this.onSubmit} />
      </AppWrapper>
    );
  }
}
