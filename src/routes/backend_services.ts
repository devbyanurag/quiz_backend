// routes/api.js

import { Request, Response, Router } from "express";
import { data } from "../data/data";
import { Category, Data } from "types";
import QuestionModel from "../models/backend_services";
import mongoose from "mongoose";
const router_backend_services = Router();

function addIdsToQuestions(data: Data): Data {
    for (const categoryId in data) {
        let idCounterEasy = 1;
        let idCounterMedium = 1;
        let idCounterHard = 1;
        const category: Category = data[categoryId];
        category.questions.easy.forEach((difficultyKey) => {
            difficultyKey.id = idCounterEasy++;
        });
        category.questions.hard.forEach((difficultyKey) => {
            difficultyKey.id = idCounterHard++;
        });
        category.questions.medium.forEach((difficultyKey) => {
            difficultyKey.id = idCounterMedium++;
        });
    }
    return data;
}

router_backend_services.get('/generate_dataWithIds', (req: Request, res: Response) => {
    const dataWithIds: Data = addIdsToQuestions(data);
    res.json({ message: 'Hello, TypeScript World!', data: dataWithIds });
});

router_backend_services.get('/questions', async (req: Request, res: Response) => {
    try {
        const collection = mongoose.connection.collection('quiz_app');

        // Insert the data directly into the collection
        await collection.insertMany(Object.values(data));

        console.log('Data inserted into the database successfully');
        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router_backend_services.delete('/questions', async (req: Request, res: Response) => {
    try {
        const collectionName = 'quiz_app';
        mongoose.connection.collection(collectionName).drop();
        console.log('Deleted successfully');
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export { router_backend_services }
