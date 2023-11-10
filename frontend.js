import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [website, setWebsite] = useState('');
  const [niche, setNiche] = useState('');
  const [products, setProducts] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make a request to the backend to get the product information
    const response = await axios.get(`/api/products?website=${website}&niche=${niche}`);

    // Set the product information in the state
    setProducts(response.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Website:
          <input type="text" value={website} onChange={(event) => setWebsite(event.target.value)} />
        </label>
        <br />
        <label>
          Niche:
          <input type="text" value={niche} onChange={(event) => setNiche(event.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.name}>
            {product.name} - {product.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}
