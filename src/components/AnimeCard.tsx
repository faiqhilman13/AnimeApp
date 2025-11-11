import { Box, Image, Text, VStack, Badge, HStack, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Anime } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { toggleFavorite } from '../store/slices/favoritesSlice';

const MotionBox = motion(Box);

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
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
      overflow="hidden"
      border="1px solid"
      borderColor="gray.800"
      cursor="pointer"
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
      whileHover={{
        scale: 1.02,
      }}
      transition={{ duration: 0.5 }}
      sx={{
        '&:hover .anime-image': {
          filter: 'blur(8px)',
          transform: 'scale(1.02)',
        },
        '&:hover .content-overlay': {
          opacity: 1,
        },
      }}
    >
      {/* Favorite button */}
      <IconButton
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        icon={<Heart fill={isFavorited ? '#ff8c2b' : 'none'} color={isFavorited ? '#ff8c2b' : 'white'} size={20} />}
        position="absolute"
        top={2}
        right={2}
        zIndex={3}
        size="sm"
        bg="blackAlpha.700"
        _hover={{
          bg: 'blackAlpha.800',
          transform: 'scale(1.1)',
        }}
        onClick={handleFavoriteClick}
        borderRadius="full"
      />

      {/* Anime Image - Full Card Background */}
      <Box
        className="anime-image"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        transition="all 0.5s ease"
      >
        <Image
          src={anime.images.jpg.large_image_url}
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
              <Text color="gray.500" fontSize="sm">
                No Image
              </Text>
            </Box>
          }
        />
      </Box>

      {/* Content Overlay - Shows on Hover */}
      <Box
        className="content-overlay"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.800"
        backdropFilter="blur(4px)"
        opacity={0}
        transition="opacity 0.3s ease"
      >
        <VStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          p={6}
          align="stretch"
          spacing={3}
          transform="translateY(4px)"
          transition="transform 0.3s ease"
          sx={{
            '.content-overlay:hover &': {
              transform: 'translateY(0)',
            },
          }}
        >
          <Text
            fontWeight="bold"
            fontSize="lg"
            noOfLines={2}
            color="white"
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
          </HStack>

          {anime.episodes && (
            <Text fontSize="sm" color="gray.300">
              {anime.episodes} episodes
            </Text>
          )}

          {anime.synopsis && (
            <Text fontSize="sm" color="gray.400" noOfLines={3}>
              {anime.synopsis}
            </Text>
          )}
        </VStack>
      </Box>

      {/* Minimum height for card */}
      <Box h={{ base: '64', sm: '72', md: '80', lg: '96' }} />
    </MotionBox>
  );
};

export default AnimeCard;
