import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { RiSearchLine } from "react-icons/ri";

interface SearchBoxProps {
  showSearchLabel?: boolean;
}

export function SearchBox({ showSearchLabel }: SearchBoxProps) {

  const searchInputRef = useRef<HTMLInputElement>(null)

  if (showSearchLabel) {
    return (
      <Flex
        as='label'
        flex='1'
        paddingY='4'
        paddingX='8'
        marginLeft='6'
        maxWidth={400}
        alignSelf='center'
        color='gray.200'
        position='relative'
        background='gray.800'
        borderRadius='full'
      >
        <Input
          color='gray.50'
          variant='unstyled'
          px='4'
          mr='4'
          placeholder='Buscar na plataforma'
          _placeholder={{ color: 'gray.400' }}
          ref={searchInputRef}
        />
        <Icon as={RiSearchLine} fontSize='20' />
      </Flex>
    )
  }

  return (
    <Flex
      as='label'
      flex='1'
      marginLeft='3'
      alignSelf='center'
      color='gray.200'
      position='relative'
    >
      <Icon as={RiSearchLine} fontSize='20' />
    </Flex>
  )
}