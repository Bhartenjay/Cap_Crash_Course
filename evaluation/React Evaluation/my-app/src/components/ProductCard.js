import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Text fontWeight="bold">{product.title}</Text>
      <Text>{product.category}</Text>
      <Text>${product.price}</Text>
      <Button mt={2} colorScheme="teal" onClick={() => navigate(`/product/${product.id}`)}>
        More Details
      </Button>
    </Box>
  );
};

export default ProductCard;
