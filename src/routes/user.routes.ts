import { Router } from 'express';
import UserController from '../controllers/user.controller';
import userMid from '../middlewares/user.middleware';

const router = Router();

const { 
  prodUsernameValidator,
  prodClasseValidator,
  prodLevelValidator, 
  prodPasswordValidator,
} = userMid;

const userController = new UserController();

router.post(
  '/users',
  prodUsernameValidator,
  prodClasseValidator,
  prodLevelValidator,
  prodPasswordValidator,
  userController.create,
);

export default router;