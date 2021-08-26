import {
	Box,
	Center,
	HStack,
	Table,
	TableCaption,
	Tbody,
	Td,
	Text,
	Tfoot,
	Th,
	Thead,
	Tr,
	VStack,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import dataArray from '../data';
import { findIndex, findKey } from 'lodash';

const Data = ({ data, setState, arr }) => {
	let ss = false;
	const addToCart = (id) => {
		const check_index = arr.findIndex((item) => item.key === id);
		if (check_index !== -1) {
			ss = true;
			console.log('Quantity updated:', arr);
		} else {
			ss = false;
			//art.push({ ...products.find((p) => p.id === id), quantity: 1 });

			//setState((prevState) => [...prevState.find((p) => p.key === key), pizza]);
			console.log('The product has been added to cart:', arr);
		}
	};

	return (
		<Wrap justify='flex-end' spacing='4'>
			{data.map((pizza) => (
				<WrapItem key={pizza.key}>
					<Box
						onClick={() => {
							addToCart(pizza.key);
							if (ss) {
								pizza.quantity += 1;
								//setState((prevState) => [...prevState, pizza]);
								setState({
									arrayvar: [...arr.arrayvar, pizza],
								});
							} else setState((prevState) => [...prevState.quantity, pizza]);
						}}
						cursor='pointer'
						borderLeft='8px'
						borderBottom='8px'
						borderColor='whiteAlpha.100'
						borderRadius='3xl'
						shadow='dark-lg'>
						<Image src={pizza.img} height={500} width={500} alt={pizza.name} />
					</Box>
				</WrapItem>
			))}
		</Wrap>
	);
};

const InvoiceTable = ({ pizza }) => {
	return (
		<Table variant='striped' size='sm' colorScheme='green'>
			<TableCaption placement='top' fontWeight='extrabold'>
				Where is My Pizza
			</TableCaption>
			<TableCaption placement='bottom'>
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
				{pizza.map((p, index) => {
					return (
						<Tr key={index}>
							<Td>{index + 1}</Td>
							<Td>{p.name}</Td>
							<Td>{p.price}</Td>
							<Td>{p.quantity}</Td>
							<Td>{p.price * 2}</Td>
						</Tr>
					);
				})}
			</Tbody>
			<Tfoot>
				<Tr>
					<Th>Total Items: 4</Th>
					<Th></Th>
					<Th></Th>
					<Th></Th>
					<Th ml={10}>Total Amount: 34.56 USD</Th>
				</Tr>
			</Tfoot>
		</Table>
	);
};
export default function Main() {
	const [arr, setArr] = useState([]);
	return (
		<Center m='2%'>
			<VStack>
				<pre>{JSON.stringify(arr, null, 2)}</pre>
				<Text
					alignSelf='stretch'
					textAlign='center'
					fontFamily='heading'
					letterSpacing='1rem'
					fontSize='5xl'
					color='yellowgreen'
					fontWeight='extrabold'
					shadow='xl'
					p='4'
					borderRadius='3xl'>
					World Restaurant{' '}
				</Text>
				<Box
					alignSelf='flex-start'
					textAlign='left'
					border='solid 2px'
					borderColor='green.100'
					p='1'
					borderRadius='2xl'>
					<InvoiceTable pizza={arr} />
				</Box>
				<Data data={dataArray} setState={setArr} arr={arr} />
			</VStack>
		</Center>
	);
}
