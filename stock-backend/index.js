const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config()
require('./db/dbconnection');
const app = express();
app.use(cors());

const stockSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Stock = mongoose.model('Stock', stockSchema);


const predefinedStocks = [
  { name: 'AAPL', price: 150.12 },
  { name: 'GOOGL', price: 2750.67 },
  { name: 'MSFT', price: 300.45 },
  { name: 'AMZN', price: 3400.21 },
  { name: 'TSLA', price: 800.98 },
  { name: 'NFLX', price: 650.32 },
  { name: 'FB', price: 350.76 },
  { name: 'NVDA', price: 250.89 },
  { name: 'PYPL', price: 220.50 },
  { name: 'AMD', price: 110.67 },
];

predefinedStocks.forEach(async (stock) => {
  await Stock.findOneAndUpdate({ name: stock.name }, stock, { upsert: true, new: true });
});

const updateStockPrice = async (stockName, newPrice) => {
  const stock = await Stock.findOneAndUpdate({ name: stockName }, { price: newPrice }, { new: true });
  return stock;
};

const changeStockPrice = () => {
  predefinedStocks.forEach(async (stock) => {
    const newPrice = stock.price + Math.random() * 10 - 5; // Simulated random price change
    const updatedStock = await updateStockPrice(stock.name, newPrice);
    console.log(`Stock ${updatedStock.name} price updated to ${updatedStock.price}`);
  });
};

setInterval(changeStockPrice, 30000); // Update prices every 30 seconds

app.get('/api/stock-price/:name', async (req, res) => {
  const stockName = req.params.name;
  const stock = await Stock.findOne({ name: stockName });
  if (stock) {
    res.json({ price: stock.price });
  } else {
    res.status(404).json({ error: 'Stock not found' });
  }
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
