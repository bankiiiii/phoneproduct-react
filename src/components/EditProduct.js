import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
        try{
            const result = await axios.get(`https://api.restful-api.dev/objects/${id}`);
      setProduct(result.data);
      setName(result.data.name);
      setColor(result.data.data?.color || '');
      setCapacity(result.data.data?.capacity || '');
        } catch(error) {
            console.error('error fetching product', error)
        }
      
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProduct = {
      ...product,
      name,
      data: { color, capacity },
    };
    try{
        await axios.put(`https://api.restful-api.dev/objects/${id}`, updatedProduct);
    navigate(`/product/${id}`);
    } catch (error) {
        console.error('Error updating the product:', error);
      alert(`Error updating the product: ${error.message}`);
    }
    
  };

  return (
    <>
    <div>  
            <Link to={"/"}> home </Link>
        </div>
    <div>
      <h1>Edit Product</h1>
      {product && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Color:</label>
            <input value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
          <div>
            <label>Capacity:</label>
            <input value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          </div>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
    </>
  );
};

export default EditProduct;
