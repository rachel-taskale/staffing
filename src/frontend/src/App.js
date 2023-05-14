import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { CButton } from "./components/button";
import { Title } from "./components/title";
import { ClientTable, StaffTable } from "./components/table";
import {AddForm} from './components/form';
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
} from "@chakra-ui/react";

export default function App() {
  const [clients, setClients] = useState({});
  const [staff, setStaff] = useState({});
  const [events, setEvents] = useState({});
  const [test, setTest] = useState("");
  const cancelRef = useRef < HTMLButtonElement > null;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const types_of_staff = ['setup', 'break down', 'bartender', 'wait staff', 'captain', 'delivery', 'garbage disposal']

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const newData = (data) =>{
    console.log(data)
    // come up with a staff id


    axios({
        method: "POST",
        url: "http://localhost:5000/api/staff/",
        data: {'staff_id': 10, 'first_name' : data.first_name, 'last_name' : data.last_name, 'email':data.email, 'phone':data.phone},
      })
        .then((res) => {
          axios({
            method:"POST",
            url: "http://localhost:5000/api/staff/role",
            data:{'staff_id': 10,  'first_name' : data.first_name, 'last_name' : data.last_name, 'roles':data.roles }
          })
      
            App.newData(res)
          
        })
        .catch((err) => {
          console.log(err);
        });
  }
  

  // todo: add and remove roles from a person

  return (
    <Box  className="App" mx="2.5%" p="2.5rem">
      <Text fontSize="3xl" fontWeight="bold">
        Staffing
      </Text>
      <Spacer h={8}/>
      <Wrap>
        <StaffTable data={staff} mb="5%" maxWidth="40%" />
        <Spacer width="20%" />
        <ClientTable data={clients} mb="5%"></ClientTable>
      </Wrap>
      
        <AddForm
              types_of_staff = {types_of_staff}
              newData = {newData}
              />            
         
    </Box>
  );
}

