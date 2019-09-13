import mongoose, { Schema, Document } from 'mongoose';

export interface IPalindromeSolution {
  largestPalindromeLength: number;
  largestPalindrome: string;
}

export interface IPalindrome extends Document {
  taskId: string;
  status: 'submitted' | 'started' | 'completed';
  timestamps: {
    submitted: number; // unix/epoch time
    started: number; // unix/epoch time or null if not started
    completed: number; // unix/epoch time or null if not completed
  };
  problem: {
    text: string;
  };
  solution?: IPalindromeSolution;
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

const PalindromeModel = mongoose.model<IPalindrome>('Palindrome', PalindromeSchema);

export const findPalindromeByProblemText = async (problemText: string) => {
  return await PalindromeModel.findOne({
    problem: {
      text: problemText,
    },
  });
};

export const saveNewPalindromeProblem = async (text: string): Promise<Document> => {
  const palindrome = new PalindromeModel();
  palindrome.status = 'started';
  palindrome.timestamps.submitted = Date.now();
  palindrome.problem.text = text;
  const savedPalindrome = await palindrome.save();
  savedPalindrome.taskId = savedPalindrome._id;

  return savedPalindrome;
};

export const FindPalindromeById = async (taskId: string) => {
  return await PalindromeModel.findById(taskId);
}
