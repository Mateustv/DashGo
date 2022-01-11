import { Text } from "@chakra-ui/react"
import Link from "next/link"

export function Logo() {
  return (
    <Link href='/dashboard' passHref>
      <Text
        as='a'
        fontSize={['2xl', '3xl']}
        fontWeight='bold'
        letterSpacing='tight'
        width='64'
      >
        Dashgo
        <Text as='span' color='pink.500' marginLeft='1'>.</Text>
      </Text>
    </Link>

  )
}