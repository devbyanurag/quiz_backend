import mongoose, { Document, Schema } from 'mongoose';

interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    id: number;
}

interface Quiz {
    id: number;
    category: string;
    questions: {
        easy: Question[];
        medium: Question[];
        hard: Question[];
    };
}

const questionSchema = new Schema<Question>({
    type: String,
    difficulty: String,
    category: String,
    question: String,
    correct_answer: String,
    incorrect_answers: [String],
    id: Number,
});

const quizSchema = new Schema<Quiz>({
    id: Number,
    category: String,
    questions: {
        easy: [questionSchema],
        medium: [questionSchema],
        hard: [questionSchema],
    },
}, {
    collection: 'quiz_app',
});

const QuizModel = mongoose.model<Quiz>('Quiz', quizSchema);

export default QuizModel;
