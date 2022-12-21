import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import styles from '../../styles/Signup/signup.module.css'
import Link from 'next/link';

export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [details, setDetails] = useState({
          username:'',
          email:'',
          password:''    
    })

    const handleChange = (e) => {
        const {value, name} = e.target;
        setDetails({...details, [name]: value}) 
    }

    const handleClick = () => {
        console.log(details);
    }

    return (
        <Flex
            className={styles.main}
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            >
            <Stack className={styles.signup} spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        signup to seek help ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input name='username' onChange={handleChange} type="text" />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input name='email' onChange={handleChange}  type="email" />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input name='password' onChange={handleChange}  type={showPassword ? 'text' : 'password'} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick={handleClick}
                                loadingText="Submitting"
                                size="lg"
                                bg={'gray'}
                                color={'white'}
                                _hover={{
                                    bg: 'black',
                                }}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link style={{ color: '#1c7ed6' }} href='/auth/login'>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
