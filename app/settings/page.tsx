'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Switch,
  Text,
  useColorModeValue,
  Divider,
  Spinner,
  useToast,
  Select,
} from '@chakra-ui/react'
import { Navbar } from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

const defaultSettings = {
  emailNotifications: false,
  gameReminders: false,
  newGameAlerts: false,
  showProfile: true,
  showGameHistory: true,
  language: 'en',
}

export default function SettingsPage() {
  const { user } = useAuth()
  const [settings, setSettings] = useState(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [password, setPassword] = useState('')
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    if (!user) return
    setLoading(true)
    fetch(`/api/user/settings?id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setSettings({ ...defaultSettings, ...data.settings })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value
    }));
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Password change is demo only, not persisted
      const res = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, settings }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update settings')
      setSettings({ ...defaultSettings, ...data.settings })
      toast({
        title: 'Settings saved',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      if (password) {
        toast({
          title: 'Password change (demo only)',
          description: 'Password change is not persisted in this demo.',
          status: 'info',
          duration: 4000,
          isClosable: true,
        })
        setPassword('')
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to save settings',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
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
        <Container maxW="container.md" py={10}>
          <VStack spacing={8} align="stretch">
            <Heading size="lg">Settings</Heading>

            <Box
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="lg"
              bg={bgColor}
              borderColor={borderColor}
            >
              <VStack spacing={6} align="stretch">
                <Heading size="md">Account Settings</Heading>
                <FormControl>
                  <FormLabel>Change Password</FormLabel>
                  <Input type="password" placeholder="New password" value={password} onChange={handlePasswordChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Language</FormLabel>
                  <Select name="language" value={settings.language} onChange={handleChange}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                  </Select>
                </FormControl>
                <Button colorScheme="brand" onClick={handleSave} isLoading={saving}>
                  Save Changes
                </Button>
              </VStack>
            </Box>

            <Box
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="lg"
              bg={bgColor}
              borderColor={borderColor}
            >
              <VStack spacing={6} align="stretch">
                <Heading size="md">Notifications</Heading>
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel mb="0">Email Notifications</FormLabel>
                  <Switch name="emailNotifications" colorScheme="brand" isChecked={settings.emailNotifications} onChange={handleChange} />
                </FormControl>
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel mb="0">Game Reminders</FormLabel>
                  <Switch name="gameReminders" colorScheme="brand" isChecked={settings.gameReminders} onChange={handleChange} />
                </FormControl>
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel mb="0">New Game Alerts</FormLabel>
                  <Switch name="newGameAlerts" colorScheme="brand" isChecked={settings.newGameAlerts} onChange={handleChange} />
                </FormControl>
              </VStack>
            </Box>

            <Box
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="lg"
              bg={bgColor}
              borderColor={borderColor}
            >
              <VStack spacing={6} align="stretch">
                <Heading size="md">Privacy</Heading>
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel mb="0">Show Profile to Others</FormLabel>
                  <Switch name="showProfile" colorScheme="brand" isChecked={settings.showProfile} onChange={handleChange} />
                </FormControl>
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel mb="0">Show Game History</FormLabel>
                  <Switch name="showGameHistory" colorScheme="brand" isChecked={settings.showGameHistory} onChange={handleChange} />
                </FormControl>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  )
} 