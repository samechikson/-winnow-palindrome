import PalindromeDocument from './../daos/Palindrome/PalindromeDao';
import { logger, paramMissingError } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED } from 'http-status-codes';

const router = Router();

/******************************************************************************
 *                       Add One - "POST /palindrome"
 ******************************************************************************/

router.post('/', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError,
      });
    }
    const palindrome = new PalindromeDocument();
    palindrome.status = 'started';
    palindrome.timestamps.submitted = Date.now();
    palindrome.problem.text = text;
    const savedPalindrome = await palindrome.save();
    savedPalindrome.taskId = savedPalindrome._id;
    return res.status(CREATED).json(savedPalindrome.toJSON());
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

router.get('/', (req: Request, res: Response) => {
  return res.send('This is a test');
});

export default router;
