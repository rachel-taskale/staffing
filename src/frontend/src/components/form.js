import React, { useEffect, useState, onChange } from "react";
import axios from "axios";
import { SelectButton } from "./selectButton";
import { setTest } from "../App.js";
import {
  Box,
  Text,
  TableCaption,
  Table,
  Circle,
  Button,
  TableContainer,
  Input,
  Wrap,
  Thead,
  useDisclosure,
  Th,
  Td,
  Tfoot,
  Tr,
  Tbody,
  HStack,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";

export const AddStaffForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [roles, setRoles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleStaffRoles = (type) => {
    if (roles.includes(type)) {
      const newlist = roles.filter((i) => i !== type);
      setRoles(newlist);
    } else {
      setRoles([...roles, type]);
    }
  };

  return (
    <Box>
      <Button
        border="1px solid #1D2127"
        bgColor="white"
        size="sm"
        onClick={onOpen}
      >
        Add Staff
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Staff</ModalHeader>
          <Box>
            <Box mx={10}>
              <Input
                variant="flushed"
                mt="10px"
                placeholder="First name"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              ></Input>
              <Input
                variant="flushed"
                mt="10px"
                placeholder="Last name"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              ></Input>
              <Input
                variant="flushed"
                mt="10px"
                placeholder="Email"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              ></Input>
              <Input
                variant="flushed"
                mt="10px"
                placeholder="Phone Number"
                onChange={(event) => {
                  setPhoneNum(event.target.value);
                }}
              ></Input>
              <Text mt="20px">Roles</Text>
              <Wrap>
                {props.types_of_staff.map((type) => (
                  <Box
                    onClick={() => {
                      handleStaffRoles(type);
                    }}
                  >
                    <SelectButton
                      p="5px"
                      border="1px solid gray"
                      borderRadius={5}
                      name={type}
                    />
                  </Box>
                ))}
              </Wrap>
            </Box>
            <ModalFooter>
              <Button variant="ghost" mt={5} mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme="blue"
                mt={5}
                mr={3}
                onClick={() =>
                  props.newData({
                    first_Name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phoneNum,
                    roles: roles,
                  })
                }
              >
                Submit
              </Button>
            </ModalFooter>
          </Box>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export const AddClientForm = () => {
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [roles, setRoles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button border='1px solid' bgColor='white' onClick={onOpen} fontSize='sm'>Add Client</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Staff</ModalHeader>
          <ModalCloseButton />

          <Box>
            <Box mx={10}>
            <Input
                variant="flushed"
                mt="10px"
                placeholder="Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              ></Input>

            </Box>
          </Box>
          <ModalFooter>
              <Button variant="ghost" mt={5} mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme="blue"
                mt={5}
                mr={3}
                
              >
                Submit
              </Button>
            </ModalFooter>
        </ModalContent>
        
      </Modal>
    </Box>
  );
};
