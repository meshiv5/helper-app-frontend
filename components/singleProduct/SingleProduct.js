import {  HStack } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { Card, CardBody } from '@chakra-ui/card'
import { Image } from '@chakra-ui/image'
import { Heading, Stack, Text } from '@chakra-ui/layout'
import { MdOutlineSubtitles, MdDescription } from 'react-icons/md'
import { RiMoneyDollarBoxFill } from 'react-icons/ri'
import { useRouter } from 'next/router'




const SingleProduct = ({ task, pay, description }) => {

  const router = useRouter()
 
  useEffect(() => {
    // if(localStorage.getItem('mode') === 'Buyer')
    // router.push('/')

  }, []);

  return (
    <Card
      style={{width: '70%', margin:'auto'}}
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    ><Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt='Caffe Latte'
      />

      <Stack>
        <CardBody>
          <HStack>
            <MdOutlineSubtitles />
            <Heading size='md'>{task}</Heading>
          </HStack>
          <HStack>
            <MdDescription />
            <Text py='2'>{description}</Text>
          </HStack>
          <HStack>
            <RiMoneyDollarBoxFill />
            <Text py='2'> ₹ {pay}</Text>
          </HStack>
        </CardBody>

        {/* <CardFooter>
          <Button variant='solid' colorScheme='blue'>
            Buy Latte
          </Button>
        </CardFooter> */}
      </Stack>
    </Card>

  )
}

export default SingleProduct