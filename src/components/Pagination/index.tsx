import { Box, Button, Stack } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

export function Pagination() {
  return (
    <Stack
      direction="row"
      spacing='6'
      mt='8'
      justifyContent='space-between'
      align='center'
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>50</strong>
      </Box>
      <Stack spacing='2' direction='row'>
        <PaginationItem current numberPage='1' />
        <PaginationItem numberPage='2' />
        <PaginationItem numberPage='3' />
        <PaginationItem numberPage='4' />
        <PaginationItem numberPage='5' />
      </Stack>
    </Stack>
  )
}