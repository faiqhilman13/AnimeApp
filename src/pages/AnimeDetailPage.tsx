import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Image,
  SimpleGrid,
  Divider,
  Skeleton,
  useToast,
  AspectRatio,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { fetchAnimeDetail, clearAnimeDetail } from '../store/slices/animeDetailSlice';

const MotionBox = motion(Box);

const AnimeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { anime, loading, error } = useAppSelector((state) => state.animeDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeDetail(Number(id)));
    }
    return () => {
      dispatch(clearAnimeDetail());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (error && !error.includes('cancelled')) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [error, toast]);

  if (loading) {
    return (
      <Box minH="100vh" py={8}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              alignSelf="flex-start"
            >
              ← Back to Search
            </Button>
            <Skeleton height="400px" borderRadius="lg" />
            <VStack align="stretch" spacing={4}>
              <Skeleton height="40px" width="60%" />
              <Skeleton height="20px" width="40%" />
              <Skeleton height="200px" />
            </VStack>
          </VStack>
        </Container>
      </Box>
    );
  }

  if (!anime) {
    return (
      <Box minH="100vh" py={8}>
        <Container maxW="container.xl">
          <VStack spacing={4}>
            <Text>Anime not found</Text>
            <Button onClick={() => navigate('/')} variant="retro">
              Back to Search
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.900">
      {/* Hero Banner */}
      <Box
        position="relative"
        h={{ base: '300px', md: '400px' }}
        overflow="hidden"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgGradient: 'linear(to-b, transparent, gray.900)',
          zIndex: 1,
        }}
      >
        <Image
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          w="100%"
          h="100%"
          objectFit="cover"
          filter="blur(8px) brightness(0.4)"
        />
      </Box>

      <Container maxW="container.xl" position="relative" mt="-120px" zIndex={2}>
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          mb={4}
          color="white"
          _hover={{ bg: 'whiteAlpha.200' }}
        >
          ← Back to Search
        </Button>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {/* Poster */}
            <Box>
              <AspectRatio ratio={3 / 4}>
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  borderRadius="lg"
                  border="3px solid"
                  borderColor="brand.500"
                  boxShadow="0 8px 32px rgba(43, 134, 255, 0.3)"
                />
              </AspectRatio>
            </Box>

            {/* Details */}
            <VStack align="stretch" spacing={6} gridColumn={{ md: 'span 2' }}>
              {/* Title */}
              <VStack align="stretch" spacing={2}>
                <Heading
                  size="2xl"
                  bgGradient="linear(to-r, brand.300, sunset.300)"
                  bgClip="text"
                >
                  {anime.title}
                </Heading>
                {anime.title_english && anime.title_english !== anime.title && (
                  <Text color="gray.400" fontSize="lg">
                    {anime.title_english}
                  </Text>
                )}
                {anime.title_japanese && (
                  <Text color="gray.500" fontSize="md">
                    {anime.title_japanese}
                  </Text>
                )}
              </VStack>

              {/* Stats and Badges */}
              <HStack spacing={4} flexWrap="wrap">
                {anime.score && (
                  <Badge variant="neon" fontSize="lg" px={3} py={1}>
                    ⭐ {anime.score}
                  </Badge>
                )}
                {anime.type && <Badge variant="retro">{anime.type}</Badge>}
                {anime.status && <Badge variant="sunset">{anime.status}</Badge>}
                {anime.rating && <Badge colorScheme="purple">{anime.rating}</Badge>}
              </HStack>

              {/* Info Grid */}
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                {anime.episodes && (
                  <InfoItem label="Episodes" value={anime.episodes.toString()} />
                )}
                {anime.season && anime.year && (
                  <InfoItem
                    label="Season"
                    value={`${anime.season} ${anime.year}`}
                  />
                )}
                {anime.duration && (
                  <InfoItem label="Duration" value={anime.duration} />
                )}
                {anime.studios && anime.studios.length > 0 && (
                  <InfoItem
                    label="Studio"
                    value={anime.studios.map((s) => s.name).join(', ')}
                  />
                )}
              </SimpleGrid>

              <Divider borderColor="gray.700" />

              {/* Genres */}
              {anime.genres && anime.genres.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={2} color="gray.300">
                    Genres
                  </Text>
                  <HStack spacing={2} flexWrap="wrap">
                    {anime.genres.map((genre) => (
                      <Badge key={genre.mal_id} colorScheme="blue">
                        {genre.name}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              )}

              {/* Synopsis */}
              {anime.synopsis && (
                <Box>
                  <Text fontWeight="bold" mb={2} fontSize="lg" color="gray.300">
                    Synopsis
                  </Text>
                  <Text color="gray.400" lineHeight="tall">
                    {anime.synopsis}
                  </Text>
                </Box>
              )}

              {/* Background */}
              {anime.background && (
                <Box>
                  <Text fontWeight="bold" mb={2} fontSize="lg" color="gray.300">
                    Background
                  </Text>
                  <Text color="gray.400" lineHeight="tall">
                    {anime.background}
                  </Text>
                </Box>
              )}
            </VStack>
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
};

// Helper component for info items
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <Box>
    <Text fontSize="sm" color="gray.500" fontWeight="semibold">
      {label}
    </Text>
    <Text color="gray.200">{value}</Text>
  </Box>
);

export default AnimeDetailPage;
