// test router
import express from 'express';
import {
  getRankedTests,
  getTests,
  submitTest,
} from '../controllers/testController.js';

const router = express.Router();

router.get('/', getTests);
router.post('/submit', submitTest);
router.get('/ranking', getRankedTests);

export default router;
