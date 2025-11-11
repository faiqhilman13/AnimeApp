import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppDispatch';
import AnimeCard from '../components/AnimeCard';
import EmptyState from '../components/EmptyState';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const favorites = useAppSelector((state) => state.favorites.favorites);

  return (
    <Box minH="100vh" bg="gray.900" position="relative">
      {/* Scanline overlay */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        pointerEvents="none"
        zIndex={1}
        opacity={0.05}
        backgroundImage="repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)"
      />

      {/* Hero Section */}
      <Box
        position="relative"
        py={12}
        bg="linear-gradient(135deg, rgba(255, 140, 43, 0.1) 0%, rgba(168, 43, 255, 0.1) 100%)"
        borderBottom="2px solid"
        borderColor="sunset.500"
      >
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack spacing={6} textAlign="center">
            {/* Retro badge */}
            <Box
              px={4}
              py={1}
              bg="sunset.500"
              color="white"
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="wider"
              textTransform="uppercase"
              borderRadius="sm"
              border="2px solid"
              borderColor="sunset.300"
              boxShadow="0 0 20px rgba(255, 140, 43, 0.5)"
            >
              ［ MY COLLECTION ］
            </Box>

            {/* Main title */}
            <VStack spacing={2}>
              <Heading
                size="3xl"
                bgGradient="linear(to-r, sunset.300, retro.400, brand.300)"
                bgClip="text"
                fontWeight="black"
                letterSpacing="tight"
                textShadow="0 0 40px rgba(255, 140, 43, 0.3)"
              >
                MY LIST
              </Heading>
              <Text
                color="gray.400"
                fontSize="xl"
                fontWeight="bold"
                letterSpacing="wide"
                textTransform="uppercase"
              >
                ⟨ {favorites.length} {favorites.length === 1 ? 'Favorite' : 'Favorites'} ⟩
              </Text>
            </VStack>

            {/* Decorative elements */}
            <HStack spacing={4} color="retro.500">
              <Box w="60px" h="2px" bg="retro.500" boxShadow="0 0 10px rgba(168, 43, 255, 0.6)" />
              <Text fontSize="sm" fontWeight="bold" color="retro.400">
                ♥ SAVED ♥
              </Text>
              <Box w="60px" h="2px" bg="retro.500" boxShadow="0 0 10px rgba(168, 43, 255, 0.6)" />
            </HStack>

            {/* Back button */}
            <Button
              onClick={() => navigate('/')}
              variant="retro"
              size="md"
              leftIcon={<Text>←</Text>}
            >
              Back to Search
            </Button>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        {favorites.length === 0 ? (
          <EmptyState
            title="No Favorites Yet"
            description="Start adding anime to your collection by clicking the heart icon on any anime card!"
          />
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {favorites.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default FavoritesPage;
