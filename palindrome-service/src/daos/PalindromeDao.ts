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

const model = mongoose.model<IPalindrome>('Palindrome', PalindromeSchema);

export const updateStatusByTaskId = async (taskId: string, newStatus: 'submitted' | 'started' | 'completed') => {
  await model.findByIdAndUpdate(taskId, {
    $set: {
      status: newStatus,
      timestamps: {
        started: Date.now(),
      },
    },
  });
};

export const updatePalindromeSolution = async (taskId: string, palindromSolution: IPalindromeSolution) => {
  await model.findByIdAndUpdate(taskId, {
    $set: {
      solution: palindromSolution,
      status: 'completed',
      timestamps: {
        completed: Date.now(),
      },
    },
  });
}
