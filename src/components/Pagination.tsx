import { HStack, Button, Text, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5; // Number of page buttons to show

    if (totalPages <= showPages) {
      // Show all pages if total is less than showPages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <HStack spacing={2} justify="center" py={4}>
      <IconButton
        aria-label="Previous page"
        icon={<ChevronLeftIcon />}
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        variant="retro"
        size="md"
      />

      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <Text key={`ellipsis-${index}`} color="gray.500" px={2}>
              ...
            </Text>
          );
        }

        return (
          <Button
            key={page}
            onClick={() => onPageChange(page as number)}
            variant={currentPage === page ? 'retro' : 'ghost'}
            size="md"
            minW="40px"
            color={currentPage === page ? 'white' : 'gray.400'}
            _hover={{
              bg: currentPage === page ? 'brand.600' : 'gray.700',
            }}
          >
            {page}
          </Button>
        );
      })}

      <IconButton
        aria-label="Next page"
        icon={<ChevronRightIcon />}
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={!hasNextPage || currentPage === totalPages}
        variant="retro"
        size="md"
      />
    </HStack>
  );
};

export default Pagination;
