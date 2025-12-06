import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

// Import routes
import userouter from './routes/authRoutes.js';
import prodrouter from './routes/productsRoutes.js';
import cartrouter from './routes/cartRoutes.js';
import checkoutrouter from './routes/checkoutRoutes.js';

// Import DB connection
import  pool  from './db.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test MySQL Connection
pool.getConnection()
  .then(() => console.log(" MySQL Connected Successfully"))
  .catch(err => {
    console.error("MySQL Connection Failed");
    console.error(err);
  });

// Routes
app.use('/api/user', userouter);
app.use('/api/products', prodrouter);
app.use('/api/cart', cartrouter);
app.use('/api/checkout', checkoutrouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});
// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
