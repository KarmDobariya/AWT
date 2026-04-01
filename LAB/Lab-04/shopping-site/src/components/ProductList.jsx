import React from 'react';
import { products } from '../data/products';

function ProductList({ onAddToCart }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      {products.map((product) => (
        <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '200px', backgroundColor: 'white' }}>
          <h3>{product.name}</h3>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>${product.price}</p>
          <button 
            onClick={() => onAddToCart(product)} 
            style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;