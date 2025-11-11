import { Box, Skeleton, VStack, AspectRatio } from '@chakra-ui/react';

const AnimeCardSkeleton = () => {
  return (
    <Box
      bg="gray.800"
      borderRadius="lg"
      overflow="hidden"
      border="2px solid"
      borderColor="gray.700"
    >
      <AspectRatio ratio={3 / 4}>
        <Skeleton />
      </AspectRatio>

      <VStack p={4} align="stretch" spacing={2}>
        <Skeleton height="20px" width="80%" />
        <Skeleton height="20px" width="60%" />
        <Skeleton height="16px" width="40%" />
        <Skeleton height="14px" />
        <Skeleton height="14px" />
        <Skeleton height="14px" width="90%" />
      </VStack>
    </Box>
  );
};

export default AnimeCardSkeleton;
