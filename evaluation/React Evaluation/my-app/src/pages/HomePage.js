import React, { useState, useEffect } from 'react';
import { Box, Grid, Select, Spinner, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('API_PRODUCTS_ENDPOINT');
        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const sortedFilteredProducts = products
    .filter(product => category ? product.category === category : true)
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <Box p={4}>
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error.message}</Text>
      ) : (
        <>
          <VStack spacing={4} mb={4}>
            <Select placeholder="Sort by Price" onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Select>
            <Select placeholder="Filter by Category" onChange={(e) => setCategory(e.target.value)}>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Home Decor">Home Decor</option>
            </Select>
          </VStack>
          <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
            {sortedFilteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default HomePage;
