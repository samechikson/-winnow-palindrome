import { Router } from 'express';
import PalindromeRouter from './Palindrome';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/palindrome', PalindromeRouter);

// Export the base-router
export default router;
