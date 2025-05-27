'use client'

import React from 'react'
import {
  Box,
  Flex,
  Heading,
  useColorModeValue,
  Container,
} from '@chakra-ui/react'
import { UserMenu } from './UserMenu'
import Link from 'next/link'

export function Navbar() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as="nav"
      position="fixed"
      w="100%"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      zIndex="sticky"
    >
      <Container maxW="container.xl">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Heading size="md" color="brand.500" _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>
              Pickup Sports
            </Heading>
          </Link>
          <UserMenu />
        </Flex>
      </Container>
    </Box>
  )
} 