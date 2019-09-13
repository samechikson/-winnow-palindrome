import PalindromeDocument from './../daos/Palindrome/PalindromeDao';
import { logger, paramMissingError, messenger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK, NOT_FOUND } from 'http-status-codes';

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

    // publish message
    messenger.publish('redis', JSON.stringify(savedPalindrome));

    return res.status(CREATED).json(savedPalindrome.toJSON());
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

router.get('/:taskId', async (req: Request, res: Response) => {
  logger.info(req);
  const { taskId } = req.params;
  if (!taskId) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  try {
    const palindrome = await PalindromeDocument.findById(taskId);
    if (palindrome) {
      palindrome.taskId = palindrome._id;
      return res.status(OK).json(palindrome);
    } else {
      return res.status(NOT_FOUND).json({
        error: 'Not Found',
      });
    }
  } catch (err) {
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
