import { Modal } from 'components/Modal/Modal';
import { Image, Item } from './ImageGalleryItem.styled';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  render() {
    const { smallImage, largeImage, tags } = this.props;

    return (
      <>
        <Item>
          <Image src={smallImage} alt={tags} onClick={this.toggleModal} />

          {this.state.isModalOpen && (
            <Modal
              largeImage={largeImage}
              tags={tags}
              isOpen={this.state.isModalOpen}
              onClose={this.toggleModal}
            />
          )}
        </Item>
      </>
    );
  }
}
