import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import EditProduct from './components/EditProduct';
import PostProduct from './components/PostProduct';

function App() {
  return (

    <BrowserRouter>
    <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/product/new" element={<PostProduct />} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/product/:id/edit" element={<EditProduct/>} />
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
