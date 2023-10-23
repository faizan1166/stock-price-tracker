import React from 'react';

const StockSelector = ({ stocks, selectedStock, setSelectedStock }) => {
  const handleSelectChange = (e) => {
    setSelectedStock(e.target.value);
  };

  return (
    <div>
      <select class="form-select" value={selectedStock} aria-label="Select Stocks" onChange={handleSelectChange}>
        {stocks.map((stock) => (
          <option key={stock.name} value={stock.name}>
            {stock.name}
          </option>
        ))}
      </select>
      
    </div>
  );
};

export default StockSelector;
