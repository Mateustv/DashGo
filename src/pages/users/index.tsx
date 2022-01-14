import { Spinner, Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Header from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../services/hook/useUsers";

export default function UserList() {
  const [page, setPage] = useState(1)
  const { isLoading, error, data, isFetching } = useUsers(page)

  return (
    <Box>
      <Header />
      <Flex w='100%' maxWidth={1480} mx='auto' px='6'>
        <Sidebar />

        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>

          <Flex mb='8' justify='space-between' align='center'>
            <Heading size="lg" fontWeight='normal'>
              Usuários
              {!isLoading && isFetching && <Spinner size='sm' ml='4' color='gray.500' />}
            </Heading>

            <Link href='/users/create' passHref>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} fontSize='20' />} >
                Criar novo
              </Button>
            </Link>
          </Flex>

          {
            isLoading ? (
              <Flex justify='center' >
                <Spinner size='xl' />
              </Flex>
            )
              : error ? (
                <Flex justify='center'>
                  <Text>Erro ao pegar a listagem de usuariom</Text>
                </Flex>
              )
                :
                (
                  <>
                    <Table colorScheme='whiteAlpha'>
                      <Thead>
                        <Tr>
                          <Th px='6' color='gray.300' width='8'>
                            <Checkbox colorScheme='pink' />
                          </Th>
                          <Th>Usuários</Th>
                          <Th>Data de cadastro</Th>
                          <Th width='8'></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {data.users.map(user => {
                          return (
                            <Tr key={user.id}>
                              <Td px='6'>
                                <Checkbox colorScheme='pink' />
                              </Td>
                              <Td>
                                <Box>
                                  <Text fontWeight='bold'>{user.name}</Text>
                                  <Text fontSize='sm' color='gray.300'>{user.email}</Text>
                                </Box>
                              </Td>
                              <Td>{user.createdAt}</Td>
                              <Td>
                                <Button
                                  as='a'
                                  size='sm'
                                  fontSize='sm'
                                  colorScheme='purple'
                                  leftIcon={<Icon as={RiPencilLine} fontSize='16' />} >
                                  Editar
                                </Button>
                              </Td>
                            </Tr>
                          )
                        })
                        }
                      </Tbody>
                    </Table>

                    <Pagination
                      totalCountOfRegisters={data.totalCount}
                      currentPage={page}
                      onPageChange={setPage}
                    />
                  </>
                )}

        </Box>
      </Flex>
    </Box>
  )
}