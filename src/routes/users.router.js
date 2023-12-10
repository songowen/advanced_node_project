import express from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { needSignin } from '../middlewares/need-signin.middleware.js';

const router = express.Router();
const usersController = new UsersController();

// 인증이 필요한 라우터에 미들웨어 추가
router.get('/users/:userId', needSignin, usersController.getUserInfo);
router.put('/users/:userId', needSignin, usersController.updateUser);

export default router;
