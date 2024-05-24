import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await axios.get(`https://api.restful-api.dev/objects`);
      setProducts(result.data.slice((page - 1) * 5, page * 5));
      setTotal(result.data.length);
    };
    fetchProducts();
  }, [page]);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/product/new">Add New Product</Link>  <br/>

      <br/>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)} disabled={page * 5 >= total}>
        Next
      </button>
    </div>
  );
};

export default Home;
