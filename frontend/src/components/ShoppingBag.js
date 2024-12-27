import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../styles/ShoppingBag.css';

const ShoppingBag = ({ bag, setBag }) => {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const handleRemoveFromBag = (productId) => {
        setBag((prevBag) => prevBag.filter((item) => item.id !== productId));
    };

    const handleCheckout = async () => {
        try {
            await Promise.all(
                bag.map(item =>
                  axios.put(`http://localhost:5000/api/products/${item.id}`, {
                    quantity: item.quantity
                  })
                )
              );
      
          setBag([]);
      
          alert('Payment successful! Products purchased.');
          navigate('/home');
        } catch (error) {
          console.error('Checkout failed:', error);
          alert('There was an error processing your checkout. Please try again.');
        }
      };
    
    

    const totalPrice = bag.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="shopping-bag-container">
            <h2>Your Shopping Bag</h2>
            {bag.length === 0 ? (
                <p>Your bag is empty. Add some items!</p>
            ) : (
                <div className="bag-items">
                    {bag.map((item) => (
                        <div key={item.id} className="bag-item">
                            <img src={item.image} alt={item.name} className="bag-item-image" />
                            <div className="bag-item-details">
                                <h3>{item.name}</h3>
                                <p>Price: €{item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Total: €{(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => handleRemoveFromBag(item.id)} className="remove-button">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className='total'>
                        Total: €{totalPrice}
                    </div>
                    <div className="checkout-section">
                        <button onClick={() => navigate('/home')} className="back-button">
                            Continue Shopping
                        </button>
                        <button onClick={handleCheckout} className="submit-button">
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingBag;