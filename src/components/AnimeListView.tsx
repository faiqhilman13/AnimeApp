import { Box, HStack, Image, VStack, Text, Badge, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Anime } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { toggleFavorite } from '../store/slices/favoritesSlice';

const MotionBox = motion(Box);

interface AnimeListViewProps {
  anime: Anime;
}

const AnimeListView = ({ anime }: AnimeListViewProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const isFavorited = favorites.some((fav) => fav.mal_id === anime.mal_id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(anime));
  };

  return (
    <MotionBox
      position="relative"
      bg="gray.900"
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.800"
      overflow="hidden"
      cursor="pointer"
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
      whileHover={{
        scale: 1.01,
      }}
      transition={{ duration: 0.3 }}
      role="article"
      aria-label={`${anime.title} anime information`}
      h="180px"
    >
      {/* Background Image */}
      <Box
        className="list-bg-image"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        transition="all 0.5s ease"
        opacity={0.3}
        sx={{
          '.chakra-box:hover &': {
            filter: 'blur(4px)',
            opacity: 0.2,
          },
        }}
      >
        <Image
          src={anime.images.jpg.large_image_url}
          alt=""
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>

      {/* Gradient Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-r, gray.900 0%, transparent 50%, gray.900 100%)"
      />

      {/* Content */}
      <HStack position="relative" spacing={4} p={4} h="100%" align="center">
        {/* Poster */}
        <Box
          position="relative"
          flexShrink={0}
          w="110px"
          h="150px"
          borderRadius="lg"
          overflow="hidden"
          border="1px solid"
          borderColor="gray.700"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.5)"
        >
          <IconButton
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            icon={<Heart fill={isFavorited ? '#ff8c2b' : 'none'} color={isFavorited ? '#ff8c2b' : 'white'} size={16} />}
            position="absolute"
            top={1}
            right={1}
            zIndex={2}
            size="xs"
            bg="blackAlpha.700"
            _hover={{
              bg: 'blackAlpha.800',
              transform: 'scale(1.1)',
            }}
            onClick={handleFavoriteClick}
            borderRadius="full"
          />
          <Image
            src={anime.images.jpg.image_url}
            alt={anime.title}
            w="100%"
            h="100%"
            objectFit="cover"
            fallback={
              <Box
                w="100%"
                h="100%"
                bg="gray.700"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="gray.500" fontSize="xs">
                  No Image
                </Text>
              </Box>
            }
          />
        </Box>

        {/* Content */}
        <VStack flex="1" align="stretch" spacing={2} justify="center">
          <Text
            fontWeight="bold"
            fontSize="xl"
            color="white"
            noOfLines={1}
          >
            {anime.title}
          </Text>

          <HStack spacing={2} flexWrap="wrap">
            {anime.score && (
              <Badge variant="neon" fontSize="xs">
                ⭐ {anime.score}
              </Badge>
            )}
            {anime.type && (
              <Badge variant="retro" fontSize="xs">
                {anime.type}
              </Badge>
            )}
            {anime.episodes && (
              <Badge colorScheme="gray" fontSize="xs">
                {anime.episodes} eps
              </Badge>
            )}
            {anime.year && (
              <Badge colorScheme="gray" fontSize="xs">
                {anime.year}
              </Badge>
            )}
          </HStack>

          <Text fontSize="sm" color="gray.300" noOfLines={2}>
            {anime.synopsis || 'No synopsis available.'}
          </Text>
        </VStack>
      </HStack>
    </MotionBox>
  );
};

export default AnimeListView;
