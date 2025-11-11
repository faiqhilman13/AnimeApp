import { Input, InputGroup, InputLeftElement, Box } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <Box position="relative">
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder="Search for anime..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          variant="retro"
          fontSize="lg"
          _focus={{
            transform: 'scale(1.02)',
            transition: 'transform 0.2s ease',
          }}
        />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
