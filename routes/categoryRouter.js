import Router from 'express';
const router = Router();
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesFilter,
  getCategoriesInfo,
  getCategoryById,
  updateCategory,
} from '../controllers/categoryController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

//router get catgories info
router.route('/intro').get(getCategoriesInfo);
router.route('/filter').get(getCategoriesFilter);

router
  .route('/')
  .post(authenticateUser, createCategory)
  .get(authenticateUser, getCategories);
router
  .route('/:id')
  .put(authenticateUser, updateCategory)
  .delete(authenticateUser, deleteCategory)
  .get(getCategoryById);

export default router;
