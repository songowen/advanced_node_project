import { AuthService } from '../services/auth.service.js';

export class UsersController {
  authService = new AuthService();

  //내정보 조회
  getUserInfo = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userInfo = await this.authService.findUserInfo(userId);

      return res.status(200).json({ data: userInfo });
    } catch (err) {
      next(err);
    }
  };

  //내정보 수정
  updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { password, title, content  } = req.body;

      const updatedUser = await this.authService.updateUser( userId, password, title, content );
      
      return res.status(200).json({ data: updatedUser });
    } catch (err) {
      next(err);
    }
  };
}
