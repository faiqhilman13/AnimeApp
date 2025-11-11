import { Box, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { fetchSuggestedAnime } from '../store/slices/suggestedSlice';
import AnimeCard from './AnimeCard';
import AnimeCardSkeleton from './AnimeCardSkeleton';

const SuggestedAnime = () => {
  const dispatch = useAppDispatch();
  const { animes, loading } = useAppSelector((state) => state.suggested);

  useEffect(() => {
    dispatch(fetchSuggestedAnime());
  }, [dispatch]);

  return (
    <Box
      bg="gray.900"
      py={16}
      borderTop="2px solid"
      borderColor="brand.500"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage:
          'radial-gradient(circle at 20% 50%, rgba(168, 43, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255, 140, 43, 0.05) 0%, transparent 50%)',
        zIndex: 0,
      }}
    >
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={8} align="stretch">
          {/* Section Header */}
          <VStack spacing={3} textAlign="center">
            <Box
              px={4}
              py={1}
              bg="retro.500"
              color="white"
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="wider"
              textTransform="uppercase"
              borderRadius="sm"
              border="2px solid"
              borderColor="retro.300"
              boxShadow="0 0 20px rgba(168, 43, 255, 0.5)"
            >
              ［ CURATED SELECTION ］
            </Box>

            <Heading
              size="2xl"
              bgGradient="linear(to-r, retro.400, sunset.300, brand.300)"
              bgClip="text"
              fontWeight="black"
              letterSpacing="tight"
            >
              SUGGESTED ANIME
            </Heading>

            <Text color="gray.400" fontSize="md" letterSpacing="wide">
              ⟨ Handpicked Classics for You ⟩
            </Text>
          </VStack>

          {/* Anime Grid */}
          {loading ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
              {Array.from({ length: 4 }).map((_, index) => (
                <AnimeCardSkeleton key={index} />
              ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
              {animes.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default SuggestedAnime;
