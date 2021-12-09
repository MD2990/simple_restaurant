import {
  Box,
  Center,
  HStack,
  IconButton,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon, MinusIcon, CalendarIcon } from "@chakra-ui/icons";
import { ImPrinter } from "react-icons/im";

import { toPDF } from "../utils/functions";
import Image from "next/image";
import React from "react";
import { useSnapshot } from "valtio";
import state from "../store/stats";
import Footer from "./Footer";
const Data = () => {
  const snap = useSnapshot(state);
  const getIndex = (index) => {
    const check_index = snap.bill.findIndex((item) => item.key === index.key);
    return check_index;
  };
  return (
    <Wrap justify="center" spacing="4" mb="7%">
      {snap.data.map((pizza) => (
        <WrapItem key={pizza.key}>
          <Box
            borderLeft="4px"
            borderBottom="4px"
            borderColor="gray.300"
            borderRadius="xl"
            shadow="dark-lg"
            overflow="hidden"
          >
            <Image src={pizza.img} height={120} width={150} alt={pizza.name} />
            <HStack spacing="4" justify="center" p="1" maxW="150px">
              <Text
                textAlign="center"
                isTruncated
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                fontWeight="extrabold"
                fontSize="12px"
                textColor="teal.400"
              >
                {pizza.name.length < 16
                  ? pizza.name
                  : pizza.name.substr(0, 16) + "... "}
                {pizza.price.toFixed(2)}
              </Text>
              <Text
                textAlign="center"
                fontWeight="hairline"
                fontSize="10px"
                textColor="teal.200"
              >
                {pizza.currency}
              </Text>
            </HStack>
            <HStack spacing="4" justify="center" p="2" maxW="150">
              <IconButton
                size="xs"
                colorScheme="green"
                aria-label="Add Pizza"
                icon={<AddIcon />}
                onClick={() => {
                  if (getIndex(pizza) === -1) {
                    state.bill.push(pizza);
                  } else {
                    state.bill[getIndex(pizza)].quantity += 1;
                  }
                }}
              />

              <IconButton
                size="xs"
                colorScheme="green"
                aria-label="Remove Pizza"
                icon={<MinusIcon />}
                isDisabled={getIndex(pizza) > -1 ? false : true}
                onClick={() => {
                  if (
                    state.bill[getIndex(pizza)] &&
                    state.bill[getIndex(pizza)].quantity > 1
                  ) {
                    state.bill[getIndex(pizza)].quantity -= 1;
                  } else {
                    state.bill = state.bill.filter((p) => p.key !== pizza.key);
                  }
                }}
              />

              <IconButton
                isDisabled={getIndex(pizza) > -1 ? false : true}
                size="xs"
                colorScheme="red"
                aria-label="Remove Pizza"
                icon={<DeleteIcon />}
                onClick={() => {
                  state.bill.map((p) => (p.quantity = 1));

                  state.bill = state.bill.filter((p) => p.key !== pizza.key);
                }}
              />
            </HStack>
          </Box>
        </WrapItem>
      ))}
    </Wrap>
  );
};

const InvoiceTable = () => {
  const snap = useSnapshot(state);
  function printPdf() {
    let count = 0;
    const rows = [];
    state.bill.map((e) => {
      count++;
      rows.push({
        name: e.name.toString().toUpperCase(),
        price: e.price,
        quantity: e.quantity,
        total: e.quantity * e.price,
        len: count,
      });
    });

    count = 0;
    const columns = [
      { title: "#", key: "len" },
      { title: "Item", key: "name" },
      { title: "Price", key: "price" },
      { title: "Quantity", key: "quantity" },
      { title: "Total", key: "total" },
    ];

    return toPDF({
      rows: rows,
      columns: columns,
      title: "Where is my Pizza",
      totalItems: snap.bill.length,
      totalAmount:
        state.bill.reduce(function (acc, curr) {
          const results = acc + curr.quantity * curr.price;

          return results;
        }, 0) + " USD",
    });
  }
  return (
    <Center>
      <Box border="solid 1px lightgreen" borderRadius="2xl" m="2">
        {snap.bill.length > 0 && (
          <HStack>
            <IconButton
              size="lg"
              p="2"
              m="2"
              colorScheme="red"
              aria-label="Clear"
              icon={<DeleteIcon />}
              onClick={() => {
                state.bill.map((p) => (p.quantity = 1));
                state.bill = [];
              }}
            />

            <IconButton
              size="lg"
              p="2"
              m="2"
              colorScheme="green"
              aria-label="Clear"
              icon={<ImPrinter size="1.5rem" />}
              onClick={() => printPdf()}
            />
          </HStack>
        )}

        <Table variant="striped" size="sm" colorScheme="green">
          <TableCaption placement="top" fontWeight="extrabold">
            Where is My Pizza
          </TableCaption>
          <TableCaption
            placement="bottom"
            fontWeight="bold"
            fontSize="xx-small"
          >
            Thank you and have a delicious meal...
          </TableCaption>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Description</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {snap.bill.map((pizza, index) => {
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{pizza.name}</Td>
                  <Td>{pizza.price.toFixed(2)}</Td>
                  <Td>{pizza.quantity}</Td>
                  <Td>{(pizza.price * pizza.quantity).toFixed(2)}</Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th colSpan="2" textAlign="left" nowrap="nowrap">
                Total Items: {snap.bill.length}
              </Th>

              <Th colSpan="3" textAlign="right" nowrap="nowrap">
                Total Amount:{" "}
                {state.bill.reduce(function (acc, curr) {
                  const results = acc + curr.quantity * curr.price;

                  return results;
                }, 0)}{" "}
                usd
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </Center>
  );
};
export default function Main() {
  const snap = useSnapshot(state);

  return (
    <>
      <div className="stick" onClick={() => scrollTo(0, 0)}>
        {snap.bill.length}
      </div>
      <Center>
        <Wrap justify="center">
          <WrapItem>
            <InvoiceTable />
          </WrapItem>
          <WrapItem>
            <Data />
          </WrapItem>
        </Wrap>
      </Center>
      <Footer />
    </>
  );
}
