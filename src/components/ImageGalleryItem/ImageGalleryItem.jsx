import { Modal } from 'components/Modal/Modal';
import { Image, Item } from './ImageGalleryItem.styled';
import { useState } from 'react';

export const ImageGalleryItem = ({ smallImage, largeImage, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <>
      <Item>
        <Image src={smallImage} alt={tags} onClick={toggleModal} />

        {isModalOpen && (
          <Modal
            largeImage={largeImage}
            tags={tags}
            isOpen={isModalOpen}
            onClose={toggleModal}
          />
        )}
      </Item>
    </>
  );
};
