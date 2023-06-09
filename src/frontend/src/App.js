import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { CButton } from "./components/button";
import { Title } from "./components/title";
import { ClientTable, StaffTable } from "./components/table";
import { AddStaffForm, AddClientForm } from "./components/form";
import { useRef } from "react";
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
  VStack,
  HStack,
} from "@chakra-ui/react";
import { EventsCard } from "./components/eventsCard";

export default function App() {
  const [clients, setClients] = useState({});
  const [staff, setStaff] = useState({});
  const [events, setEvents] = useState({});
  const [test, setTest] = useState("");
  const cancelRef = useRef < HTMLButtonElement > null;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const types_of_staff = [
    "setup",
    "break down",
    "bartender",
    "wait staff",
    "captain",
    "delivery",
    "garbage disposal",
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res[0]);
        setClients(res[0]);
        setStaff(res[1]);
        setEvents(res[3]);
        console.log(res[3]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const newData = (data) => {
    console.log(data);
    // come up with a staff id

    axios({
      method: "POST",
      url: "http://localhost:5000/api/staff/",
      data: {
        staff_id: 10,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
      },
    })
      .then((res) => {
        axios({
          method: "POST",
          url: "http://localhost:5000/api/staff/role",
          data: {
            staff_id: 10,
            first_name: data.first_name,
            last_name: data.last_name,
            roles: data.roles,
          },
        });

        App.newData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // todo: add and remove roles from a person
  //   background-color: #eff1f3;
  return (
    <Box className="App" fontSize="md" fontWeight="medium">
      <Box mx="2.5rem">
        <Text fontSize="3xl" fontWeight="bold" pt='30px'>
          Staffing
        </Text>
        <Spacer h={8} />

        <HStack>
          <VStack
            bgColor="white"
            borderRadius="20px"
            py="1rem" 
            px='2rem'
            mb='20px' 
            mr='20px'
            h='350px'
          >
            <Box alignItems="left">
              <HStack>
                <Text fontWeight="bold" fontSize="md" display="flex">
                  Clients
                </Text>
                <Box
                  border="1px solid #1D2127"
                  w="300px"
                  h="30px"
                  borderRadius="5px"
                ></Box>
                <Button bgColor="#1D2127" color='white' fontSize='12px' py='.5rem' height='fit-content'>Search</Button>
              </HStack>
              <Box overflowY="scroll" mt='1rem'>
              <ClientTable width='full' data={clients}></ClientTable>
              </Box>
            </Box>
            <Box alignItems="right" width='full' >
              <AddClientForm  display='flex' border='1px solid black'/>
            </Box>
          </VStack>




          <VStack bgColor="white" borderRadius="20px"  py="1rem" px='2rem' mb='20px' maxH='350px' width='full' alignItems='left'>
            <Text fontWeight="bold" fontSize="md" display='flex'>
              Events
            </Text>
            <Box overflowY="scroll">
              {events ? (
                Array.from(events).map((item) => (
                  <EventsCard name={item.name} date={item.date} />
                ))
              ) : (
                <></>
              )}
            </Box>
            <Box alignItems="right" width='full' >
              <AddClientForm  display='flex' border='1px solid black'/>
            </Box>
          </VStack>
        </HStack>

        <VStack
          h="fit-content"
          // py={5}
          py="1rem" px='2rem'
          minWidth="50%"
          maxHeight="400px"
          bgColor="white"
          borderRadius="20px"
          alignItems='left'
          display='flex'
        >
          <Text fontWeight="bold" fontSize="md">
            Staff List
          </Text>
          <Box overflowY="scroll">
          <StaffTable  data={staff} width="full" />
          </Box>
          <AddStaffForm types_of_staff={types_of_staff} newData={newData} />
        </VStack>
      </Box>
    </Box>
  );
}
