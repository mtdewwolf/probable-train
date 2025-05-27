'use client'

import React, { useState } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Select,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react'
import { Navbar } from '../components/Navbar'

const sportOptions = [
  { value: 'basketball', label: 'Basketball' },
  { value: 'soccer', label: 'Soccer' },
  { value: 'volleyball', label: 'Volleyball' },
  { value: 'tennis', label: 'Tennis' },
  { value: 'other', label: 'Other' },
]

export default function CreateGamePage() {
  const [form, setForm] = useState({
    sport: '',
    location: '',
    datetime: '',
    description: '',
    maxPlayers: '',
  })
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to create game')
      toast({
        title: 'Game created!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setForm({ sport: '', location: '', datetime: '', description: '', maxPlayers: '' })
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to create game',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <Box pt="16">
        <Container maxW="container.sm" py={10}>
          <VStack spacing={8} align="stretch">
            <Heading size="lg">Create a Pickup Game</Heading>
            <Box
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="lg"
              bg={bgColor}
              borderColor={borderColor}
            >
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>Sport</FormLabel>
                    <Select name="sport" value={form.sport} onChange={handleChange} placeholder="Select sport">
                      {sportOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Location</FormLabel>
                    <Input name="location" value={form.location} onChange={handleChange} placeholder="Enter location" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Date & Time</FormLabel>
                    <Input name="datetime" type="datetime-local" value={form.datetime} onChange={handleChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Game details, rules, etc." />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Max Players</FormLabel>
                    <Input name="maxPlayers" type="number" min={2} value={form.maxPlayers} onChange={handleChange} placeholder="e.g. 10" />
                  </FormControl>
                  <Button type="submit" colorScheme="brand" isLoading={loading} mt={4}>
                    Create Game
                  </Button>
                </VStack>
              </form>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  )
} 