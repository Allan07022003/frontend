// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';  
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    teal: {
      200: '#81E6D9',  
      400: '#38B2AC',
      500: '#319795',
      600: '#2C7A7B',
    },
    pink: {
      200: '#FFB6C1',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
      <Toaster position="bottom-left" reverseOrder={false} />
    </ChakraProvider>
  </React.StrictMode>
);

