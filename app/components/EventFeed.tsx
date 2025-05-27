'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  VStack,
  Text,
  Heading,
  HStack,
  Badge,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react'

export function EventFeed() {
  const [games, setGames] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => {
        setGames(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <Box
      maxH="400px"
      overflowY="auto"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg={bgColor}
      borderColor={borderColor}
      p={4}
      mt={8}
    >
      <Heading size="md" mb={4}>
        Event Feed
      </Heading>
      {loading ? (
        <Spinner />
      ) : (
        <VStack align="stretch" spacing={4}>
          {games.map(game => (
            <Box key={game.id} p={4} borderWidth="1px" borderRadius="md" bg={bgColor} borderColor={borderColor}>
              <HStack justify="space-between">
                <Text fontWeight="bold">{game.sport}</Text>
                <Badge colorScheme="blue">{game.location}</Badge>
                <Badge colorScheme="green">{new Date(game.datetime).toLocaleString()}</Badge>
              </HStack>
              <Text mt={2}>{game.description}</Text>
              <Text fontSize="sm" color="gray.500" mt={1}>
                Max Players: {game.maxPlayers}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  )
} 