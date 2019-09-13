import * as PalindromeDao from './../daos/PalindromeDao';
import { findPalindromes } from '../process';
import { logger } from '@shared';

export const newProblemConsumer = async (msg: string) => {
  logger.info('in the consumer');
  const palindromeRequest: PalindromeDao.IPalindrome = JSON.parse(msg);

  try {
    await PalindromeDao.updateStatusByTaskId(palindromeRequest.taskId, 'started');
  } catch (err) {
    logger.error(`Could not update status to 'started': `, err);
  }

  const palindromeProblem = palindromeRequest.problem.text.toLowerCase();
  const palindromes: string[] = findPalindromes(palindromeProblem);

  const longestPalindrome = palindromes.sort((a, b) => b.length - a.length)[0];
  const palindromSolution: PalindromeDao.IPalindromeSolution = {
    largestPalindrome: longestPalindrome,
    largestPalindromeLength: longestPalindrome.length,
  };

  try {
    await PalindromeDao.updatePalindromeSolution(palindromeRequest.taskId, palindromSolution);
  } catch (err) {
    logger.error(`Could not update status to 'completed': `, err);
  }

};
