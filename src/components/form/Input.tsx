import { FormControl, FormErrorMessage, FormLabel, Input as ChakraIpunt, InputProps as ChakraIpuntProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraIpuntProps {
  name: string;
  label: string;
  error?: FieldError;
}

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
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
        ref={ref}
        {...rest}
      />
      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)