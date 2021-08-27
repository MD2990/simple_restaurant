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
import { findIndex, sumBy } from 'lodash';
import { useSnapshot } from 'valtio';
import state from '../store/stats';
import * as currency from 'currency.js';
const Data = () => {
	const snap = useSnapshot(state);

	return (
		<Wrap justify='flex-end' spacing='4'>
			{snap.data.map((pizza) => (
				<WrapItem key={pizza.key}>
					<Box
						onClick={() => {
							const check_index = snap.bill.findIndex(
								(item) => item.key === pizza.key,
							);

							if (check_index === -1) {
								state.bill.push(pizza);
							} else {
								state.bill[check_index].quantity += 1;
							}
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

const InvoiceTable = () => {
	const snap = useSnapshot(state);

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
				{snap.bill.map((pizza, index) => {
					//	state.totalAmount = pizza.price * pizza.quantity;
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
					<Th>Total Items: {snap.bill.length}</Th>
					<Th></Th>
					<Th></Th>
					<Th></Th>
					<Th ml={10}>
						Total Amount:{' '}
						{snap.bill.reduce(function (acc, curr) {
							const results = acc + curr.quantity * curr.price;

							return results;
						}, 0)}{' '}
						$
					</Th>
				</Tr>
			</Tfoot>
		</Table>
	);
};
export default function Main() {
	const snap = useSnapshot(state);

	return (
		<Center m='2%'>
			<VStack>
				{/* 	<pre>{JSON.stringify(snap.bill, null, 2)}</pre> */}
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
					<InvoiceTable />
				</Box>
				<Data />
			</VStack>
		</Center>
	);
}
