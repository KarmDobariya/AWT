import React from 'react';

function Cart({ cartItems, onCheckout, onRemove }) {
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {cartItems.map((item, index) => (
              <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{item.name}</span>
                <div>
                  <span style={{ marginRight: '15px' }}>${item.price}</span>
                  <button 
                    onClick={() => onRemove(index)}
                    style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3 style={{ marginTop: '20px' }}>Total Amount: ${totalAmount}</h3>
          <button 
            onClick={onCheckout} 
            style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '10px' }}
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;