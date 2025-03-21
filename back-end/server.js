// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productRoutes from './routes/product.route.js'
import notFoundPage from './routes/404.route.js'

dotenv.config();

const app = express();

app.use(express.json());//allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

//404 Page
app.use(notFoundPage);

app.listen(3000, ()=>{
    connectDB(); 
    console.log('Server Started on http://localhost:3000/');
})