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

app.get('/api/stock-price/:name', async (req, res) => {
  const stockName = req.params.name;
  const stock = await Stock.findOne({ name: stockName });
  if (stock) {
    res.json({ price: stock.price });
  } else {
    res.status(404).json({ error: 'Stock not found' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);

})