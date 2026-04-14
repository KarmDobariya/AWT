import React, { useState, useEffect } from 'react';

function PaymentGateway({ totalAmount, onBack }) {
  const [timeLeft, setTimeLeft] = useState(300);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 || orderPlaced) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, orderPlaced]);

  const handleDone = () => {
    setOrderPlaced(true);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (orderPlaced) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '8px', marginTop: '20px', maxWidth: '600px', margin: '40px auto' }}>
        <h2>Order Placed Successfully!</h2>
        <p>Your payment of ${totalAmount} was processed.</p>
        <button onClick={onBack} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
          Back to Store
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '500px', margin: '40px auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
      <h2>Payment Gateway</h2>
      <h3>Total Amount to Pay: ${totalAmount}</h3>
      <div style={{ margin: '20px 0', fontSize: '24px', color: timeLeft < 60 ? 'red' : 'black' }}>
        Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      
      {timeLeft > 0 ? (
        <button onClick={handleDone} style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Done
        </button>
      ) : (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <h3>Session Expired!</h3>
          <button onClick={onBack} style={{ padding: '10px 20px', cursor: 'pointer', marginTop: '10px' }}>
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentGateway;