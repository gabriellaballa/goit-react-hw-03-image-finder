import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

const API_KEY = '39874564-0f11a439c7c25eb7f8c6d4ea1';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      images: [],
      loading: false,
      selectedImage: null,
      page: 1,
      totalHits: 0,
    };
  }

  handleSearch = async query => {
    try {
      this.setState({
        searchQuery: query,
        loading: true,
        page: 1,
        totalHits: 0,
      });
      const response = await fetch(
        `https://pixabay.com/api/?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      this.setState({
        images: data.hits,
        totalHits: data.totalHits,
      });
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMore = async () => {
    try {
      const { searchQuery, page, totalHits } = this.state;
      if (page * 12 < totalHits && totalHits > 0) {
        this.setState({ loading: true, page: page + 1 });
        const response = await fetch(
          `https://pixabay.com/api/?q=${searchQuery}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const data = await response.json();
        this.setState(prevState => ({
          images: [
            ...prevState.images,
            ...data.hits.filter(
              newImage =>
                !prevState.images.some(oldImage => oldImage.id === newImage.id)
            ),
          ],
        }));
      }
    } catch (error) {
      console.error('Error fetching more images:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  openModal = image => {
    this.setState({ selectedImage: image });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, loading, selectedImage } = this.state;

    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} openModal={this.openModal} />
        {loading && <Loader />}
        {images.length > 0 && !loading && (
          <Button onClick={this.loadMore} label="Load More" />
        )}
        {selectedImage && (
          <Modal image={selectedImage} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
