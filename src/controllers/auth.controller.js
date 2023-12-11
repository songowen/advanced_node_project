import { AuthService } from '../services/auth.service.js';

export class AuthController {
  authService = new AuthService();

  //회원가입

  signUp = async (req, res, next) => {
    try {
      const { email, password, passwordConfirm, name } = req.body;



      const createdUser = await this.authService.signUp(email, password, passwordConfirm, name);
      return res.status(201).json({ message:"회원가입에 성공했습니다.", data: createdUser });
    } catch (err) {
      next(err);
    }
  };

  //로그인

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const createdUser = await this.authService.signIn(email, password);
      
     
      return res.status(200).json({ message:"로그인에 성공했습니다.",data: createdUser });

    } catch (err) {
      next(err);
    }
  };
}
