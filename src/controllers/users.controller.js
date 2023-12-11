import { UsersService } from '../services/users.service.js';

export class UsersController {
  usersService = new UsersService();

  //내정보 조회
  getUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userInfo = await this.usersService.getUser(userId);

      return res.status(200).json({ data: userInfo });
    } catch (err) {
      next(err);
    }
  };

  //내정보 수정
  updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { name, age, gender, profileImage  } = req.body;

      const updatedUser = await this.usersService.updateUserInfo( userId, name, age, gender, profileImage );
      
      return res.status(200).json({ data: updatedUser });
    } catch (err) {
      next(err);
    }
  };
}
