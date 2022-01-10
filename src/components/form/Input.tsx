import { FormControl, FormLabel, Input as ChakraIpunt, InputProps as ChakraIpuntProps } from "@chakra-ui/react";

interface InputProps extends ChakraIpuntProps {
  name: string;
  label?: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraIpunt
        name={name}
        type="email"
        id={name}
        focusBorderColor="pink.500"
        bgColor='gray.900'
        variant="filled"
        _hover={
          { bgColor: 'gray.900' }
        }
        size="lg"
        {...rest}
      />
    </FormControl>
  )
}