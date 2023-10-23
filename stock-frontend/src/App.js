import React, { useState } from 'react';
import StockSelector from './components/StockSelector';
import PriceDisplay from './components/PriceDisplay';

const stocks = [
  { name: 'AAPL' },
  { name: 'GOOGL' },
  { name: 'MSFT' },
  { name: 'AMZN' },
  { name: 'TSLA' },
  { name: 'NFLX' },
  { name: 'FB' },
  { name: 'NVDA' },
  { name: 'PYPL' },
  { name: 'AMD' },
];

function App() {
  const [selectedStock, setSelectedStock] = useState(stocks[0].name);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{height:"90vh"}}>
      <div className='card shadow border-0 p-4'>
      <h1 className='mb-4'>Stock Price Tracker</h1>
      <StockSelector
        stocks={stocks}
        selectedStock={selectedStock}
        setSelectedStock={setSelectedStock}
      />
      <PriceDisplay selectedStock={selectedStock} />
      </div>
    </div>
  );
}

export default App;
