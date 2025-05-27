'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Avatar,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Spinner,
  Textarea,
} from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'
import { Navbar } from '../components/Navbar'

export default function ProfilePage() {
  const { user, login } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    if (!user) return
    setLoading(true)
    fetch(`/api/user/profile?id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setProfile({
          name: data.name,
          email: data.email,
          bio: data.profile?.bio || '',
          location: data.profile?.location || '',
          phone: data.profile?.phone || '',
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          name: profile.name,
          email: profile.email,
          profile: {
            bio: profile.bio,
            location: profile.location,
            phone: profile.phone,
          },
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update profile')
      login({ ...user, name: data.name, email: data.email }) // update context
      toast({ title: 'Profile updated', status: 'success', duration: 3000, isClosable: true })
      setEditMode(false)
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, status: 'error', duration: 3000, isClosable: true })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <Box pt="16" textAlign="center" py={20}><Spinner size="xl" /></Box>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Box pt="16">
        <Container maxW="container.xl" py={10}>
          <VStack spacing={8} align="stretch">
            <Box
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="lg"
              bg={bgColor}
              borderColor={borderColor}
            >
              <VStack spacing={6}>
                <Avatar
                  size="2xl"
                  name={profile?.name}
                  bg="brand.500"
                  color="white"
                />
                {editMode ? (
                  <>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input name="name" value={profile.name} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input name="email" value={profile.email} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Bio</FormLabel>
                      <Textarea name="bio" value={profile.bio} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Location</FormLabel>
                      <Input name="location" value={profile.location} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Phone</FormLabel>
                      <Input name="phone" value={profile.phone} onChange={handleChange} />
                    </FormControl>
                    <Button colorScheme="brand" onClick={handleSave} isLoading={saving}>
                      Save
                    </Button>
                    <Button variant="ghost" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Heading size="xl">{profile?.name}</Heading>
                    <Text color="gray.600">{profile?.email}</Text>
                    {profile.bio && <Text color="gray.500">{profile.bio}</Text>}
                    {profile.location && <Text color="gray.500">Location: {profile.location}</Text>}
                    {profile.phone && <Text color="gray.500">Phone: {profile.phone}</Text>}
                    <Button colorScheme="brand" onClick={() => setEditMode(true)}>
                      Edit Profile
                    </Button>
                  </>
                )}
              </VStack>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <Stat
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                bg={bgColor}
                borderColor={borderColor}
              >
                <StatLabel>Games Played</StatLabel>
                <StatNumber>0</StatNumber>
                <StatHelpText>Total games participated</StatHelpText>
              </Stat>

              <Stat
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                bg={bgColor}
                borderColor={borderColor}
              >
                <StatLabel>Games Created</StatLabel>
                <StatNumber>0</StatNumber>
                <StatHelpText>Total games organized</StatHelpText>
              </Stat>

              <Stat
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                bg={bgColor}
                borderColor={borderColor}
              >
                <StatLabel>Rating</StatLabel>
                <StatNumber>0.0</StatNumber>
                <StatHelpText>Player rating</StatHelpText>
              </Stat>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </>
  )
} 