import { Request, Response, Router } from "express";
import QuizModel from "../models/quiz";
import { Question } from "types";
const router_quiz = Router();



router_quiz.get('/categories', async (req: Request, res: Response) => {
    try {
        // const data = await QuizModel.find({});
        const data = await QuizModel.find({}, 'id category');
        res.json({ data: data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router_quiz.post('/questions', async (req: Request, res: Response) => {
    try {
        const { category, difficulty, numberOfQuestions } = req.body;
        if (!category || !difficulty || !numberOfQuestions) {
            return res.status(400).json({ error: 'Missing parameters' });
        }

        const numberOfQuestionsInt = parseInt(numberOfQuestions as string, 10);

        const questions = await QuizModel.aggregate([
            {
                $match: {
                    category: category as string,
                    [`questions.${difficulty as string}`]: { $exists: true }
                }
            },
            {
                $project: {
                    [`questions.${difficulty as string}`]: 1,
                    _id: 0
                }
            }
        ]);

        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for the specified category and difficulty' });
        }

        const allQuestions: Question[] = questions[0].questions[difficulty as string];
        const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, numberOfQuestionsInt);

        res.json({ questions: selectedQuestions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export { router_quiz }
