import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const PostProduct = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newProduct = {
      name,
      data: { color, capacity },
    };

    try {
      await axios.post('https://api.restful-api.dev/objects', newProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error posting the product:', error);
      alert(`Error posting the product: ${error.message}`);
    }
  };

  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <h1>Post New Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Color:</label>
          <input value={color} onChange={(e) => setColor(e.target.value)} required />
        </div>
        <div>
          <label>Capacity:</label>
          <input value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default PostProduct;
