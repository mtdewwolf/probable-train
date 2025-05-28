import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#E6F4FF',  // Lightest blue
      100: '#BAE0FF',
      200: '#7CC4FA',
      300: '#FFB74D',  // Light orange
      400: '#FFA726',  // Medium orange
      500: '#FF9800',  // Primary orange
      600: '#FB8C00',  // Darker orange
      700: '#F57C00',  // Deep orange
      800: '#EF6C00',  // Dark orange
      900: '#E65100',  // Darkest orange
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
})

export { theme } 