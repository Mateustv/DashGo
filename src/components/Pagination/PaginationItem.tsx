import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  current?: boolean;
  numberPage: string;
}

export function PaginationItem({ current = false, numberPage }: PaginationItemProps) {
  if (current) {
    return (
      <Button
        size="sm"
        fontSize='xs'
        width='4'
        colorScheme='pink'
        disabled
        _disabled={{
          bgColor: 'pink.500',
          cursor: 'default',
        }}
      >
        {numberPage}
      </Button>
    )
  }
  return (
    <Button
      size="sm"
      fontSize='xs'
      width='4'
      bgColor='gray.700'
      _hover={{
        bgColor: 'gray.500',
      }}
    >
      {numberPage}
    </Button>
  )
}