import Router from 'express';
const router = Router();
import {
  getListQuestions,
  importQuestions,
} from '../controllers/questionController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

router.route('/').get(authenticateUser, getListQuestions);
router.route('/import').post(importQuestions);

export default router;
