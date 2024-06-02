import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Spinner, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`API_PRODUCT_DETAILS_ENDPOINT/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    setIsDialogOpen(false);
    toast({
      title: 'Item added to cart.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error.message}</Text>
      ) : (
        product && (
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Text fontWeight="bold">{product.title}</Text>
            <Text>{product.category}</Text>
            <Text>${product.price}</Text>
            <Text>{product.description}</Text>
            <Button mt={2} colorScheme="teal" onClick={() => setIsDialogOpen(true)}>
              Add to Cart
            </Button>

            {isDialogOpen && (
              <Box position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" bg="white" p={6} borderRadius="md" boxShadow="lg">
                <Text>Are you sure you want to add this item to cart?</Text>
                <Button colorScheme="teal" onClick={handleAddToCart}>Confirm</Button>
                <Button ml={4} onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              </Box>
            )}
          </Box>
        )
      )}
    </Box>
  );
};

export default ProductDetailsPage;
