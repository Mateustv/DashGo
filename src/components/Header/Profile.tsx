import { Avatar, Box, Flex, Text } from "@chakra-ui/react";


export function Profile() {
  return (
    <Flex>
      <Box mr='4' textAlign='right'>
        <Text>Mateus Tavares</Text>
        <Text color='gray.300' fontSize='small'>MateusTavares@hotmail.com</Text>
      </Box>
      <Avatar size='md' name='Mateus Tavares' />
    </Flex>
  )
}