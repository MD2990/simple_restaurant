import { Center, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';

export default function NavBar() {
	return (
		<Center mt='5%' mb='8%'>
			<nav className='navMenu'>
				<a href='#'>Home</a>

				<a href='#'>Blog</a>

				<a href='#'>Work</a>

				<a href='#'>About</a>

				<div className='dot'></div>
			</nav>
		</Center>
	);
}
