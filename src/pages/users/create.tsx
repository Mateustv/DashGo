import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";

import { Input } from "../../components/Form/Input";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateUserData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const createUserSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Password obrigatório').min(6, 'Mínimo de 6 caracteres.'),
  passwordConfirmation: yup.string().oneOf([null, yup.ref('password')], 'Senhas devem corresponder.')
})


export default function UserList() {

  const router = useRouter()

  const createUser = useMutation(async (user: CreateUserData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    })
    return response.data.user
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  const { register, handleSubmit, formState } = useForm<CreateUserData>({
    resolver: yupResolver(createUserSchema)
  })

  const handleCreateUser: SubmitHandler<CreateUserData> = async (values) => {
    await new Promise(resolver => setTimeout(resolver, 1000))
    await createUser.mutateAsync(values)

    router.push('/users')
  }

  return (
    <Box>
      <Header />

      <Flex w='100%' maxWidth={1480} mx='auto' px='6'>
        <Sidebar />

        <Box
          as='form'
          flex='1'
          borderRadius={8}
          bg='gray.800'
          p={['6', '8']}
          maxWidth={720}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading
            size='lg'
          >
            Criar usuário
          </Heading>
          <Divider my='6' borderColor='gray.700' />
          <VStack spacing='8'>
            <SimpleGrid
              minChildWidth='240px' spacing='8' w='100%'
            >
              <Input
                name='name'
                type='text'
                label='Nome completo'
                {...register('name')}
                error={formState.errors.name}
              />
              <Input
                name='email'
                label='E-mail'
                type='email'
                {...register('email')}
                error={formState.errors.email}
              />
            </SimpleGrid>
            <SimpleGrid
              minChildWidth='240px' spacing='8' w='100%'
            >
              <Input
                name='password'
                label='Password'
                type='password'
                {...register('password')}
                error={formState.errors.password}
              />
              <Input
                name='password'
                label='Confirmar password'
                type='password'
                {...register('passwordConfirmation')}
                error={formState.errors.passwordConfirmation}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Button
                colorScheme='pink'
                border='none'
                type='submit'
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
              <Link href='/users' passHref >
                <Button colorScheme='whiteAlpha' border='none'>
                  Cancelar
                </Button>
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}