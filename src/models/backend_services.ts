// questionModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface Question extends Document {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  id?: number;
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

const QuestionModel = mongoose.model<Question>('Question', questionSchema);

export default QuestionModel;
