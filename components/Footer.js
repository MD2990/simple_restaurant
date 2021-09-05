import {
	Box,
	Wrap,
	WrapItem,
	chakra,
	Container,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ReactNode } from 'react';

const SocialButton = ({ children, label, href }) => {
	return (
		<chakra.button
			bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
			rounded={'full'}
			w={8}
			h={8}
			cursor={'pointer'}
			as={'a'}
			href={href}
			display={'inline-flex'}
			alignItems={'center'}
			justifyContent={'center'}
			transition={'background 0.3s ease'}
			_hover={{
				bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
			}}>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

export default function Footer() {
	return (
		<Box
			position='fixed'
			w='100%'
			left='0'
			bottom='0'
			bg={useColorModeValue('green.100', 'green.900')}
			color={useColorModeValue('green.700', 'green.200')}>
			<Wrap spacing={{ base: 2, md: 4, sm: 1 }} justify='center' h='3rem' p='3'>
				<WrapItem>
					<Text>© 2020 All rights reserved</Text>
				</WrapItem>
				<WrapItem>
					<Box ml={{ base: '1.0rem', md: '15.0rem', sm: '4.0rem' }}></Box>
				</WrapItem>

				<WrapItem>
					<SocialButton label={'Twitter'} href={'#'}>
						<FaTwitter />
					</SocialButton>
				</WrapItem>

				<WrapItem>
					<SocialButton label={'YouTube'} href={'#'}>
						<FaYoutube />
					</SocialButton>
				</WrapItem>

				<WrapItem>
					<SocialButton label={'Instagram'} href={'#'}>
						<FaInstagram />
					</SocialButton>
				</WrapItem>
			</Wrap>
		</Box>
	);
}
