import Router from 'express';
const router = Router();
import {
  getPost,
  deletePost,
  updatePost,
  createPost,
  getPosts,
  getNewestPosts,
  getPostsByCategory,
} from '../controllers/postController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

router.route('/').post(authenticateUser, createPost).get(getPosts);
router.route('/newest').get(getNewestPosts);

router
  .route('/:id')
  .put(authenticateUser, updatePost)
  .delete(authenticateUser, deletePost)
  .get(getPost);
router.route('/category/:id').get(getPostsByCategory);

export default router;
