'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaBasketballBall, FaFutbol, FaVolleyballBall } from 'react-icons/fa'
import { useAuth } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { EventFeed } from './components/EventFeed'

export default function Home() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const bgColor = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <Navbar />
      <Box pt="16">
        <Container maxW="container.xl" py={10}>
          <VStack spacing={8} align="stretch">
            <Box textAlign="center" py={10}>
              <Heading as="h1" size="2xl" mb={4}>
                Find Local Pickup Games
              </Heading>
              <Text fontSize="xl" color="gray.600">
                Join or create pickup games in your area
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <Box
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                bg={bgColor}
                _hover={{ transform: 'translateY(-4px)', transition: 'all 0.2s' }}
              >
                <VStack spacing={4}>
                  <Icon as={FaBasketballBall} w={10} h={10} color="brand.500" />
                  <Heading size="md">Basketball</Heading>
                  <Text textAlign="center">Find basketball courts and games near you</Text>
                  <Button colorScheme="brand" width="full">
                    Find Games
                  </Button>
                </VStack>
              </Box>

              <Box
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                bg={bgColor}
                _hover={{ transform: 'translateY(-4px)', transition: 'all 0.2s' }}
              >
                <VStack spacing={4}>
                  <Icon as={FaFutbol} w={10} h={10} color="brand.500" />
                  <Heading size="md">Soccer</Heading>
                  <Text textAlign="center">Join soccer matches in your neighborhood</Text>
                  <Button colorScheme="brand" width="full">
                    Find Games
                  </Button>
                </VStack>
              </Box>

              <Box
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                bg={bgColor}
                _hover={{ transform: 'translateY(-4px)', transition: 'all 0.2s' }}
              >
                <VStack spacing={4}>
                  <Icon as={FaVolleyballBall} w={10} h={10} color="brand.500" />
                  <Heading size="md">Volleyball</Heading>
                  <Text textAlign="center">Discover volleyball games and tournaments</Text>
                  <Button colorScheme="brand" width="full">
                    Find Games
                  </Button>
                </VStack>
              </Box>
            </SimpleGrid>

            <Box textAlign="center" py={8}>
              <Button size="lg" colorScheme="brand" onClick={() => router.push('/create-game')}>
                Create New Game
              </Button>
            </Box>
          </VStack>
          <EventFeed />
        </Container>
      </Box>
    </>
  )
} 