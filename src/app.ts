// src/app.ts
import express, {  } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router_backend_services } from './routes/backend_services';
import connectDB from './database/db';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;
connectDB();

// const allowedOrigins = ['http://frontendapp1.com', 'http://frontendapp2.com'];
const corsOptions = {
    //   origin: allowedOrigins,
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions))



app.use('/backend_services',router_backend_services);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
