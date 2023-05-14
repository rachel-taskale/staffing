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



export const EventsCard = (props) =>{
    console.log('here')

    return(
        <HStack bgColor="gray.100" m="1.5" py="10px" px='10px' borderRadius={10}>
            <Text>{props.name}</Text>
            <Text>{props.date}</Text>
            <Button border='1px solid black' size='xs'>More info</Button>
        </HStack>
    )

}