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
  Divider,
  Th,
  Thead,
  Tr,
  Wrap,
  WrapItem,
  TableContainer,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
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
    <Wrap
      justify="center"
      spacing={[1, 2, 3, 4]}
      m="1%"
      p="1%"
      mb={"4rem"}
      boxShadow={"inner"}
      borderRadius="xl"
    >
      {snap.data.map((pizza) => (
        <WrapItem key={pizza.key}>
          <Box
            borderLeft="4px"
            borderBottom="4px"
            borderColor="gray.300"
            borderRadius="xl"
            shadow="dark-lg"
            overflow="hidden"
            textAlign={"center"}
          >
            <Image
              src={pizza.img}
              width={150}
              height={150}
              alt={pizza.name}
              quality={100}
              blurDataURL="data:/img/loading.png"
              placeholder="blur"
              priority={true}
            />

            <Text
              textAlign="center"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              fontWeight="extrabold"
              fontSize={["xx-small", "xs", "md", "lg"]}
              textColor="teal.600"
            >
              {pizza.name}
            </Text>
            <Divider />

            <Text
              textAlign="center"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              fontWeight="hairline"
              fontSize={["xx-small", "xs"]}
              textColor="teal.400"
            >
              {pizza.price.toFixed(2)} {" USD"}
            </Text>

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
    <Center >
      <TableContainer border="solid 1px lightGreen" borderRadius="2xl" >
        {snap.bill.length > 0 && (
          <HStack spacing={[1, 2, 3]} p="1" m="1">
            <IconButton
              size={["xs", "sm", "md"]}
              colorScheme="red"
              aria-label="Clear"
              icon={<DeleteIcon />}
              onClick={() => {
                state.bill.map((p) => (p.quantity = 1));
                state.bill = [];
              }}
            />

            <IconButton
              size={["xs", "sm", "md"]}
              colorScheme="green"
              aria-label="Clear"
              icon={<ImPrinter />}
              onClick={() => printPdf()}
            />
          </HStack>
        )}
        <Table variant="striped" size={["sm", "md", "lg"]} colorScheme="green">
          <TableCaption
            placement="top"
            fontWeight="bold"
            fontSize={["xx-small", "sm", "md", "lg"]}
            textDecoration={"underline"}
            color={"teal.300"}
          >
            Where is My Pizza
          </TableCaption>
          <TableCaption
            placement="bottom"
            fontWeight="hairline"
            fontSize={["xx-small", "sm"]}
          >
            Thank you and have a delicious meal 🍕
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
        </Table>{" "}
      </TableContainer>
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
      <Center m="1" p="1">
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
