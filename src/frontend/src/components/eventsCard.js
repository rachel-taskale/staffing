import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Spacer,
  Input,
  Select,
  TableCaption,
  Table,
  TableContainer,
  Thead,
  Th,
  Td,
  Tfoot,
  Tr,
  Tbody,
  Wrap,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  HStack,
} from "@chakra-ui/react";

export const EventsCard = (props) => {
  console.log("here");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack bgColor="white" m="1.5" py="10px" px="10px" border='1px solid #1D2127' borderRadius={10}>
      <Text>{props.name}</Text>
      <Text>{props.date}</Text>
      <Spacer />
      <Button size='xs' color='gray' onClick={onOpen}>More Info</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{props.date}</Text>
            <Text>Add more info here</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};
