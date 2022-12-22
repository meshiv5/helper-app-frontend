import React, { useEffect, useState } from 'react'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Button
  } from '@chakra-ui/react'
export const Login = () => {
    const [formData,setFormData] = useState({});
    function HandleLogin(e) {
        const {name,value}=e.target;
        console.log(name,value);
        setFormData({
            ...formData,
            [name]:value
        })
        console.log(formData);
    }
    function Handlesubmit() {
        
    }
    useEffect(()=>{
        console.log(formData)
    },[formData])
  return (
    <Box w={'30%'} m="auto">
        <FormControl>
  <FormLabel>Email address</FormLabel>
  <Input type='email' name='email' onChange={(e)=>HandleLogin(e)}/>
  <FormHelperText>We'll never share your email.</FormHelperText>
  <FormLabel>Password</FormLabel>
  <Input type='password' name='password' onChange={(e)=>HandleLogin(e)}/>
  <FormHelperText>We'll never share your password.</FormHelperText>
</FormControl>
<Button
            mt={4}
            colorScheme='teal'
             type='submit'
             
          >
            Submit
          </Button>
    </Box>
  )
}
