import { ReactNode, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  // Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }) => (

  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [useridentity, setUserIdentity] = useState('Buyer');
  const {pathname} = useRouter()
  function UserToggle() {
    if (useridentity == 'Buyer') {
      setUserIdentity('Seller');
    } else {
      setUserIdentity('Buyer')
    }
  }

  if(pathname === '/auth/login' || pathname === '/auth/signup'){
    return <></>
  }
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              onClick={UserToggle}>
              {useridentity}
            </Button>
            <Link href='/auth/signup'>
              <Button
                variant={'solid'}
                colorScheme={'teal'}
                size={'sm'}
                mr={4}
                leftIcon={<AddIcon />}>
                Signup
              </Button>
            </Link>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  {/* <MenuItem>from post to service</MenuItem> */}
                </MenuItem>
                <MenuItem>Wallet</MenuItem>
                <MenuItem>notification</MenuItem>
                {useridentity == "Buyer" ? <div><MenuItem>Service List and Contact</MenuItem>
                  <MenuItem>Search and filter</MenuItem></div>
                  : <MenuItem w={'auto'} >from Post to service</MenuItem>}
                <MenuItem>Settings</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}