import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/auth";
import { ChakraProvider } from "@chakra-ui/react";
import { SearchProvider } from "./context/search";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>  
    <AuthProvider>
      <SearchProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </SearchProvider>
    </AuthProvider>
  </ChakraProvider>    
);
