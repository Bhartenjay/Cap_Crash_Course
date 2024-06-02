import React from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { authState, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box bg="teal.500" p={4}>
      <Flex justify="space-between" align="center">
        {authState.isAuthenticated ? (
          <>
            <Text color="white">{authState.email}</Text>
            <Flex>
              <Link to="/home">
                <Button colorScheme="teal" variant="outline" mr={4}>
                  Home
                </Button>
              </Link>
              <Button colorScheme="teal" variant="outline" onClick={handleLogout}>
                LOGOUT
              </Button>
            </Flex>
          </>
        ) : (
          <Link to="/login">
            <Button colorScheme="teal" variant="outline">
              Login
            </Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
