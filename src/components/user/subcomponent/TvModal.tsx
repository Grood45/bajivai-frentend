// App.js
import React, { useState } from 'react';
import { ChakraProvider, CSSReset, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';

const TvModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ChakraProvider>
      <CSSReset />
      <Box p={4}>
        <Button onClick={openModal}>Open Modal</Button>
        <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Embedded Content</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Embed the content using an iframe */}
              <iframe src="https://bababetbook.in/tv/hlive.php?eid=32962725" width="100%" height="400" frameBorder="0" allowFullScreen ></iframe>

            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default TvModal;
