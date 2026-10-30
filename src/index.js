import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MoviesStoreProvider } from "./Store/ContextStore"
import { AuthProvider } from "./Store/AuthContext"
import { ChakraProvider } from '@chakra-ui/react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MoviesStoreProvider>
          <ChakraProvider >
            <App />
          </ChakraProvider>
        </MoviesStoreProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
