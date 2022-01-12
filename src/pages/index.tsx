import { Button, Flex, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from "react-hook-form";

const schema = yup.object({
  email: yup.string().email('E-mail Invalido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatório'),
}).required();

interface SignInFormData {
  email: string;
  password: string;
}


export default function Home() {

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  })

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    console.log(values);
    console.log(errors)
  }

  return (
    <Flex w="100vw" h="100vh" align='center' justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg='gray.800'
        p='8'
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input type='email' name='email' label='E-mail' error={errors.email} {...register("email")} />

          <Input type='password' name='password' label='Senha' error={errors.password}{...register("password")} />
        </Stack>

        <Button type="submit" mt="6" colorScheme='pink' size="lg">Entrar</Button>
      </Flex>
    </Flex>
  )
}
