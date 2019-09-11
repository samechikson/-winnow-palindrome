import mongoose, { Schema, Document } from 'mongoose';
import { IPalindromeRequest } from 'src/entities/PalindromeRequest';

export interface IPalindrome extends Document {
  taskId: string;
  status: 'submitted' | 'started' | 'completed';
  timestamps: {
    submitted: number; // unix/epoch time
    started: number; // unix/epoch time or null if not started
    completed: number; // unix/epoch time or null if not completed
  };
  problem: IPalindromeRequest;
  solution?: {
    largestPalindromeLength: number;
    largestPalindrome: string;
  };
}

const PalindromeSchema: Schema = new Schema({
  taskId: String,
  status: { type: String, required: true },
  timestamps: {
    submitted: Number,
    started: Number,
    completed: Number,
  },
  problem: {
    text: { type: String, required: true },
  },
  solution: {
    largestPalindromeLength: Number,
    largestPalindrome: String,
  },
});

export default mongoose.model<IPalindrome>('Palindrome', PalindromeSchema);
