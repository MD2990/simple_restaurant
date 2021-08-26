import { Center } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import Main from '../components/Main';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<>
			<Head>
				<title>World Restaurant </title>
				<meta name='description' content='Generated MD AD' />
				<link rel='icon' href='/icon.ico' />
			</Head>

			<Main/>
		</>
	);
}
