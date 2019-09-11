import { IPalindromeRequest } from 'src/entities/PalindromeRequest';

export interface IPalindromeResponse {
  task: string;
  status: 'submitted' | 'started' | 'completed';
  timestamps: {
    submitted: number; // unix/epoch time
    started: number; // unix/epoch time or null if not started
    completed: number; // unix/epoch time or null if not completed
  };
  problem: IPalindromeRequest;
  solution?: {
    largestPalindromeLength: 4;
    largestPalindrome: string;
  };
}
