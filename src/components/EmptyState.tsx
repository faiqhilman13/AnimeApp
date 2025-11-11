import { VStack, Text, Icon, Box } from '@chakra-ui/react';
import { SearchIcon, WarningIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface EmptyStateProps {
  title: string;
  description: string;
  isError?: boolean;
}

const EmptyState = ({ title, description, isError = false }: EmptyStateProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack
        spacing={4}
        py={16}
        px={4}
        textAlign="center"
        bg="gray.800"
        borderRadius="lg"
        border="2px dashed"
        borderColor={isError ? 'red.500' : 'gray.600'}
      >
        <MotionBox
          animate={{
            scale: [1, 1.1, 1],
            rotate: isError ? [0, -5, 5, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Icon
            as={isError ? WarningIcon : SearchIcon}
            boxSize={16}
            color={isError ? 'red.400' : 'brand.400'}
          />
        </MotionBox>

        <VStack spacing={2}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            bgGradient={
              isError
                ? 'linear(to-r, red.400, orange.400)'
                : 'linear(to-r, brand.400, sunset.400)'
            }
            bgClip="text"
          >
            {title}
          </Text>
          <Text color="gray.400" maxW="md">
            {description}
          </Text>
        </VStack>
      </VStack>
    </MotionBox>
  );
};

export default EmptyState;
