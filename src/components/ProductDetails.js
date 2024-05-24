import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await axios.get(`https://api.restful-api.dev/objects/${id}`);
        setProduct(result.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://api.restful-api.dev/objects/${id}`, {
        
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting the product:', error);
      alert(`Error deleting this product: ${error.message}`);
    }
  };

  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <h1>Product Details</h1>
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>Color: {product.data?.color || 'N/A'}</p>
          <p>Capacity: {product.data?.capacity || 'N/A'}</p>
          <Link to={`/product/${id}/edit`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
