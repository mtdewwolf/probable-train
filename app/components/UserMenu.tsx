'use client'

import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Text,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

export function UserMenu() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleLogout = () => {
    logout()
    router.push('/auth')
  }

  const handleProfile = () => {
    router.push('/profile')
  }

  const handleSettings = () => {
    router.push('/settings')
  }

  return (
    <Menu>
      <MenuButton
        as={Avatar}
        size="sm"
        cursor="pointer"
        name={user?.name}
        bg="brand.500"
        color="white"
        _hover={{ opacity: 0.8 }}
      />
      <MenuList
        bg={bgColor}
        borderColor={borderColor}
        boxShadow="lg"
        minW="200px"
      >
        <MenuItem
          icon={<Icon as={FaUser} />}
          onClick={handleProfile}
          _hover={{ bg: 'gray.100' }}
        >
          <Text>Profile</Text>
        </MenuItem>
        <MenuItem
          icon={<Icon as={FaCog} />}
          onClick={handleSettings}
          _hover={{ bg: 'gray.100' }}
        >
          <Text>Settings</Text>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          icon={<Icon as={FaSignOutAlt} />}
          onClick={handleLogout}
          _hover={{ bg: 'gray.100' }}
          color="red.500"
        >
          <Text>Logout</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  )
} 