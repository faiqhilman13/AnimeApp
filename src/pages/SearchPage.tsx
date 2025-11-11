import { useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  useToast,
  Button,
  Badge,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { useDebounce } from '../hooks/useDebounce';
import { searchAnime, setQuery, setCurrentPage } from '../store/slices/searchSlice';
import SearchBar from '../components/SearchBar';
import AnimeCard from '../components/AnimeCard';
import AnimeCardSkeleton from '../components/AnimeCardSkeleton';
import AnimeListView from '../components/AnimeListView';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import SuggestedAnime from '../components/SuggestedAnime';

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { query, results, pagination, loading, error, currentPage, viewMode } =
    useAppSelector((state) => state.search);
  const favoritesCount = useAppSelector((state) => state.favorites.favorites.length);

  // Debounce the search query
  const debouncedQuery = useDebounce(query, 250);

  // Perform search when debounced query changes or on initial load
  useEffect(() => {
    // Always search - if no query, it will fetch top anime
    dispatch(searchAnime({ query: debouncedQuery, page: currentPage }));
  }, [debouncedQuery, currentPage, dispatch]);

  // Show error toast (but not for cancelled requests)
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

  const handleSearchChange = (value: string) => {
    dispatch(setQuery(value));
    // Reset to page 1 when search query changes
    if (currentPage !== 1) {
      dispatch(setCurrentPage(1));
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showEmptyState = !loading && results.length === 0 && !query;
  const showNoResults = !loading && results.length === 0 && query;

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
        bg="linear-gradient(135deg, rgba(43, 134, 255, 0.1) 0%, rgba(255, 140, 43, 0.1) 100%)"
        borderBottom="2px solid"
        borderColor="brand.500"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(168, 43, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255, 140, 43, 0.1) 0%, transparent 50%)',
          zIndex: 0,
        }}
      >
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack spacing={6} textAlign="center">
            {/* Retro badge */}
            <Box
              px={4}
              py={1}
              bg="brand.500"
              color="white"
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="wider"
              textTransform="uppercase"
              borderRadius="sm"
              border="2px solid"
              borderColor="brand.300"
              boxShadow="0 0 20px rgba(43, 134, 255, 0.5)"
            >
              ［ RETRO ARCHIVE ］
            </Box>

            {/* Main title with glitch effect */}
            <VStack spacing={2}>
              <Heading
                size="3xl"
                bgGradient="linear(to-r, brand.300, sunset.300, retro.400)"
                bgClip="text"
                fontWeight="black"
                letterSpacing="tight"
                textShadow="0 0 40px rgba(43, 134, 255, 0.3)"
              >
                ANIME VAULT
              </Heading>
              <Text
                color="gray.400"
                fontSize="xl"
                fontWeight="bold"
                letterSpacing="wide"
                textTransform="uppercase"
              >
                {query ? '⟨ Search Results ⟩' : '⟨ Top Rated Collection ⟩'}
              </Text>
            </VStack>

            {/* Decorative elements */}
            <HStack spacing={4} color="sunset.500">
              <Box w="60px" h="2px" bg="sunset.500" boxShadow="0 0 10px rgba(255, 140, 43, 0.6)" />
              <Text fontSize="sm" fontWeight="bold" color="sunset.400">
                ▸ SINCE 1980 ◂
              </Text>
              <Box w="60px" h="2px" bg="sunset.500" boxShadow="0 0 10px rgba(255, 140, 43, 0.6)" />
            </HStack>

            {/* My List button */}
            <Button
              onClick={() => navigate('/favorites')}
              variant="sunset"
              size="md"
              leftIcon={<Heart size={18} fill="white" />}
              position="relative"
            >
              My List
              {favoritesCount > 0 && (
                <Badge
                  position="absolute"
                  top="-8px"
                  right="-8px"
                  bg="retro.500"
                  color="white"
                  borderRadius="full"
                  fontSize="xs"
                  px={2}
                  boxShadow="0 0 10px rgba(168, 43, 255, 0.6)"
                >
                  {favoritesCount}
                </Badge>
              )}
            </Button>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Search Bar with retro styling */}
          <Box
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              right: '-10px',
              bottom: '-10px',
              background: 'linear-gradient(45deg, transparent 48%, rgba(43, 134, 255, 0.2) 49%, rgba(43, 134, 255, 0.2) 51%, transparent 52%)',
              borderRadius: 'lg',
              pointerEvents: 'none',
            }}
          >
            <SearchBar value={query} onChange={handleSearchChange} />
          </Box>

          {/* Filter Bar */}
          <FilterBar />

          {/* Results */}
          {loading ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
              {Array.from({ length: 8 }).map((_, index) => (
                <AnimeCardSkeleton key={index} />
              ))}
            </SimpleGrid>
          ) : showEmptyState ? (
            <EmptyState
              title="Start Searching"
              description="Enter an anime title above to search through thousands of anime series and movies."
            />
          ) : showNoResults ? (
            <EmptyState
              title="No Results Found"
              description={`We couldn't find any anime matching "${query}". Try a different search term.`}
              isError
            />
          ) : (
            <>
              {viewMode === 'grid' ? (
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                  spacing={6}
                >
                  {results.map((anime) => (
                    <AnimeCard key={anime.mal_id} anime={anime} />
                  ))}
                </SimpleGrid>
              ) : (
                <VStack spacing={4} align="stretch">
                  {results.map((anime) => (
                    <AnimeListView key={anime.mal_id} anime={anime} />
                  ))}
                </VStack>
              )}

              {/* Pagination */}
              {pagination && pagination.last_visible_page > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.last_visible_page}
                  hasNextPage={pagination.has_next_page}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </VStack>
      </Container>

      {/* Suggested Anime Section */}
      <SuggestedAnime />
    </Box>
  );
};

export default SearchPage;
