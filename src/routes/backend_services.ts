// routes/api.js

import { Request, Response, Router } from "express";
import { data } from "../data/data";
import { Category, Data } from "types";
import mongoose from "mongoose";
import QuizModel from "../models/quiz";
const router_backend_services = Router();

router_backend_services.get('/add', async (req: Request, res: Response) => {
    try {
        await QuizModel.insertMany(data);
        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export { router_backend_services }
