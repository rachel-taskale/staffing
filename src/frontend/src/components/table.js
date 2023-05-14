import {
  Box,
  Text,
  TableCaption,
  Table,
  Circle,
  Button,
  TableContainer,
  Thead,
  Th,
  Td,
  Tfoot,
  Tr,
  Tbody,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

import { Title } from "./title";

export const StaffTable = (props) => {
  const [roles, setRoles] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/roles")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setRoles(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (item) => {
    axios({
      method: "DELETE",
      url: "http://localhost:5000/api/staff/role",
      data: item,
    })
      .then((res) => {
        console.log(res);
        console.log("deleted");
        const newlist = roles.filter(
          (i) => i.staff_id !== item.staff_id && i.type_id !== item.type_id
        );
        setRoles(newlist);
        console.log(roles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box border='1px solid gray'  borderRadius={20} p={2}>
      <TableContainer>
        <Table  variant="simple" size="sm" maxWidth="50%" maxHeight="20px" >
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Roles</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from(props.data)?.map((person) => (
              <Tr _hover={{
                  bgColor: "teal.50",
              }}>
                <Td >
                  {person.first_name} {person.last_name}
                </Td>
                <Td>{person.email}</Td>
                <Td>{person.phone}</Td>
                <Td>
                  {Array.from(roles)?.map((item) =>
                    item.staff_id === person.staff_id ? (
                      <HStack
                        border="1px solid gray"
                        borderRadius="5px"
                        px="1rem"
                        py=".25rem"
                      >
                        <Box>{item.type_id}</Box>
                        {editMode ? (
                          <Circle
                            onClick={() =>
                              handleClick({
                                staff_id: person.staff_id,
                                first_name: person.first_name,
                                last_name: person.last_name,
                                type_id: item.type_id,
                              })
                            }
                          >
                            <RiDeleteBin5Line />
                          </Circle>
                        ) : (
                          <></>
                        )}
                      </HStack>
                    ) : (
                      <div></div>
                    )
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export const ClientTable = (props) => {
  return (
    <Box border='1px solid gray' borderRadius={20} p={2}>
      <TableContainer>
        <Table variant="simple" size="sm" maxWidth="50%">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Events</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.data ? Array.from(props.data).map((person) => (
              <Tr _hover={{
                bgColor: "teal.50",
            }}>
                <Td>
                  {person.name}
                </Td>
                <Td>{person.email}</Td>
                <Td>{person.phone}</Td>
              </Tr>
            )): <>Loading</>}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
