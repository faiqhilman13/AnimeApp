import { HStack, Select, Button, Box, Text, VStack } from '@chakra-ui/react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { setSortBy, setViewMode, setGenreFilter, type SortOption, type ViewMode } from '../store/slices/searchSlice';

const GENRES = [
  'All Genres',
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
];

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const { sortBy, viewMode, results, genreFilter } = useAppSelector((state) => state.search);
  const [showGenres, setShowGenres] = useState(false);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as SortOption));
  };

  const handleViewToggle = (mode: ViewMode) => {
    dispatch(setViewMode(mode));
  };

  const handleGenreSelect = (genre: string) => {
    dispatch(setGenreFilter(genre === 'All Genres' ? null : genre));
  };

  if (results.length === 0) return null;

  return (
    <Box
      bg="gray.900"
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.800"
      p={{ base: 3, md: 4 }}
    >
      <VStack spacing={4} align="stretch">
        {/* Main Controls Row */}
        <HStack spacing={4} justify="space-between" flexWrap="wrap">
          {/* Filter Button */}
          <Button
            size="sm"
            onClick={() => setShowGenres(!showGenres)}
            bg="gray.900"
            color="gray.200"
            border="1px solid"
            borderColor="gray.800"
            borderRadius="xl"
            _hover={{ color: 'white', borderColor: 'gray.700' }}
            leftIcon={<SlidersHorizontal size={20} />}
          >
            Filter
          </Button>

          {/* Sort dropdown */}
          <HStack spacing={2} flex="1" minW="200px" maxW="300px">
            <Select
              value={sortBy}
              onChange={handleSortChange}
              size="sm"
              bg="gray.900"
              borderColor="gray.800"
              color="gray.200"
              borderRadius="xl"
              _hover={{ borderColor: 'gray.700', color: 'white' }}
              _focus={{ borderColor: 'brand.500', boxShadow: '0 0 10px rgba(43, 134, 255, 0.3)' }}
              aria-label="Sort anime results"
            >
              <option value="">Recommended</option>
              <option value="score">Highest Score</option>
              <option value="popularity">Most Popular</option>
              <option value="title">Title (A-Z)</option>
              <option value="start_date">Newest First</option>
            </Select>
          </HStack>

          {/* View toggle */}
          <HStack spacing={1} bg="gray.900" borderRadius="lg" p={1} border="1px solid" borderColor="gray.800">
            <Button
              size="sm"
              onClick={() => handleViewToggle('grid')}
              bg={viewMode === 'grid' ? 'gray.800' : 'transparent'}
              color={viewMode === 'grid' ? 'white' : 'gray.400'}
              borderRadius="md"
              _hover={{
                bg: viewMode === 'grid' ? 'gray.800' : 'gray.800',
                color: 'white',
              }}
              leftIcon={<Grid size={16} />}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              Grid
            </Button>
            <Button
              size="sm"
              onClick={() => handleViewToggle('list')}
              bg={viewMode === 'list' ? 'gray.800' : 'transparent'}
              color={viewMode === 'list' ? 'white' : 'gray.400'}
              borderRadius="md"
              _hover={{
                bg: viewMode === 'list' ? 'gray.800' : 'gray.800',
                color: 'white',
              }}
              leftIcon={<List size={16} />}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              List
            </Button>
          </HStack>
        </HStack>

        {/* Genre Filter Row */}
        {showGenres && (
          <HStack
            spacing={2}
            overflowX="auto"
            css={{
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
            }}
            pb={2}
          >
            {GENRES.map((genre) => (
              <Button
                key={genre}
                size="sm"
                onClick={() => handleGenreSelect(genre)}
                bg={
                  (genre === 'All Genres' && !genreFilter) || genreFilter === genre
                    ? 'gray.800'
                    : 'gray.900'
                }
                color={
                  (genre === 'All Genres' && !genreFilter) || genreFilter === genre
                    ? 'white'
                    : 'gray.300'
                }
                border="1px solid"
                borderColor={
                  (genre === 'All Genres' && !genreFilter) || genreFilter === genre
                    ? 'gray.700'
                    : 'gray.800'
                }
                borderRadius="xl"
                whiteSpace="nowrap"
                _hover={{
                  color: 'white',
                  borderColor: 'gray.700',
                }}
              >
                {genre}
              </Button>
            ))}
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default FilterBar;
