import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Color palette inspired by Cowboy Bebop and Samurai Champloo
const colors = {
  brand: {
    // Deep blues from Cowboy Bebop's jazz aesthetic
    50: '#e8f4ff',
    100: '#c3deff',
    200: '#9dc8ff',
    300: '#77b2ff',
    400: '#519cff',
    500: '#2b86ff', // Primary blue
    600: '#1f6fd6',
    700: '#1658ad',
    800: '#0e4184',
    900: '#062a5b',
  },
  sunset: {
    // Warm oranges and yellows for accents
    50: '#fff5e8',
    100: '#ffe0c3',
    200: '#ffcb9d',
    300: '#ffb677',
    400: '#ffa151',
    500: '#ff8c2b', // Primary sunset
    600: '#d6721f',
    700: '#ad5916',
    800: '#84400e',
    900: '#5b2706',
  },
  retro: {
    // Purples and magentas for neon accents
    50: '#f8e8ff',
    100: '#e8c3ff',
    200: '#d89dff',
    300: '#c877ff',
    400: '#b851ff',
    500: '#a82bff', // Neon purple
    600: '#8a1fd6',
    700: '#6c16ad',
    800: '#4e0e84',
    900: '#30065b',
  },
  jazz: {
    // Muted earth tones
    50: '#f5f5f0',
    100: '#e6e6d9',
    200: '#d7d7c2',
    300: '#c8c8ab',
    400: '#b9b994',
    500: '#aaaa7d',
    600: '#8a8a64',
    700: '#6a6a4b',
    800: '#4a4a32',
    900: '#2a2a19',
  },
};

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const styles = {
  global: {
    body: {
      bg: 'gray.900',
      color: 'gray.50',
      fontFamily: 'body',
    },
    // Add a subtle film grain texture
    '::before': {
      content: '""',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.03,
      zIndex: -1,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      pointerEvents: 'none',
    },
  },
};

const fonts = {
  heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
  body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
  mono: `'JetBrains Mono', 'Courier New', monospace`,
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'md',
      transition: 'all 0.3s ease',
    },
    variants: {
      retro: {
        bg: 'brand.500',
        color: 'white',
        border: '2px solid',
        borderColor: 'brand.300',
        boxShadow: '0 0 10px rgba(43, 134, 255, 0.3)',
        _hover: {
          bg: 'brand.600',
          boxShadow: '0 0 20px rgba(43, 134, 255, 0.5)',
          transform: 'translateY(-2px)',
        },
        _active: {
          transform: 'translateY(0)',
        },
      },
      sunset: {
        bg: 'sunset.500',
        color: 'white',
        border: '2px solid',
        borderColor: 'sunset.300',
        boxShadow: '0 0 10px rgba(255, 140, 43, 0.3)',
        _hover: {
          bg: 'sunset.600',
          boxShadow: '0 0 20px rgba(255, 140, 43, 0.5)',
          transform: 'translateY(-2px)',
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'gray.800',
        borderRadius: 'lg',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'gray.700',
        transition: 'all 0.3s ease',
        _hover: {
          borderColor: 'brand.500',
          boxShadow: '0 4px 20px rgba(43, 134, 255, 0.2)',
          transform: 'translateY(-4px)',
        },
      },
    },
  },
  Input: {
    variants: {
      retro: {
        field: {
          bg: 'gray.800',
          border: '2px solid',
          borderColor: 'gray.600',
          color: 'gray.50',
          _hover: {
            borderColor: 'brand.500',
          },
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 15px rgba(43, 134, 255, 0.3)',
          },
          _placeholder: {
            color: 'gray.500',
          },
        },
      },
    },
    defaultProps: {
      variant: 'retro',
    },
  },
  Badge: {
    variants: {
      retro: {
        bg: 'brand.500',
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 'xs',
        fontWeight: 'bold',
        px: 2,
        py: 1,
        borderRadius: 'sm',
        border: '1px solid',
        borderColor: 'brand.300',
      },
      sunset: {
        bg: 'sunset.500',
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 'xs',
        fontWeight: 'bold',
        px: 2,
        py: 1,
        borderRadius: 'sm',
        border: '1px solid',
        borderColor: 'sunset.300',
      },
      neon: {
        bg: 'retro.500',
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 'xs',
        fontWeight: 'bold',
        px: 2,
        py: 1,
        borderRadius: 'sm',
        border: '1px solid',
        borderColor: 'retro.300',
        boxShadow: '0 0 10px rgba(168, 43, 255, 0.4)',
      },
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  styles,
  components,
  shadows: {
    outline: '0 0 0 3px rgba(43, 134, 255, 0.6)',
  },
});

export default theme;
