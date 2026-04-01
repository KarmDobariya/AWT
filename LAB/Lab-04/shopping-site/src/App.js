import React, { useState } from 'react';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import PaymentGateway from './components/PaymentGateway';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCartItems([]);
    setShowPayment(false);
  };

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setShowPayment(true);
    }
  };

  const handleBackToStore = () => {
    setShowPayment(false);
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#333', color: 'white' }}>
            <h2 style={{ margin: 0 }}>Shopping Store</h2>
            <div>
              <span style={{ marginRight: '20px' }}>Cart: {cartItems.length} items</span>
              <button onClick={handleLogout} style={{ padding: '5px 15px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
                Logout
              </button>
            </div>
          </div>
          
          {!showPayment ? (
            <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ flex: 2 }}>
                <ProductList onAddToCart={handleAddToCart} />
              </div>
              <div style={{ flex: 1, backgroundColor: '#fff', borderLeft: '2px solid #ddd', minHeight: 'calc(100vh - 70px)' }}>
                <Cart 
                  cartItems={cartItems} 
                  onCheckout={handleCheckout} 
                  onRemove={handleRemoveFromCart}
                />
              </div>
            </div>
          ) : (
            <PaymentGateway totalAmount={totalAmount} onBack={handleBackToStore} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;