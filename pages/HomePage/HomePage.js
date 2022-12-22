
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import React, { useEffect, useState } from 'react'
import Singlecard from './Singlecard'

const HomePage = () => {
    const [search,setSearch] = useState('');
    const [data,setData] = useState([]);
    
  return (
    <Box  >
        <Box display={'flex'} justifyContent={'center'}>
        <Input type={'text'} border={'1px solid black'} placeholder={'...Search Item'}  w={'40%'} />
        <Select w={'auto'}>
        <option value='option1'>Low to High</option>
  <option value='option2'>High to Low</option>
  <option value='option3'></option>
        </Select>
        </Box>
        <Singlecard/>
    </Box>
  )
}

export default HomePage