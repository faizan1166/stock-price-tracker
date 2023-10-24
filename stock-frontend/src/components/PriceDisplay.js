import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PriceDisplay = ({ selectedStock }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(`https://stock-price-tracker-one.vercel.app/api/stock-price/${selectedStock}`);
        const data = response.data;
        setPrice(data.price);
      } catch (error) {
        console.error('Error fetching stock price:', error);
      }
    };

    fetchPrice();

    const interval = setInterval(fetchPrice, 60000);

    return () => clearInterval(interval);
  }, [selectedStock]);

  return (
    <div className='d-flex justify-content-center align-items-center flex-column mt-4'>
      <h4>Current Price:</h4>
      <p style={{color:"green"}}>{price ? `$${price}` : 'Loading...'}</p>
    </div>
  );
};

export default PriceDisplay;
