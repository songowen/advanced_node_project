import { AuthService } from '../services/auth.service.js';

export class AuthController {
  authService = new AuthService();

  //회원가입

  signUp = async (req, res, next) => {
    try {
      const { email, password, passwordConfirm, name } = req.body;

  // 비밀번호 확인
  if (password !== passwordConfirm) {
    return res.status(400).json({
      success: false,
      message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
    });
  }

  // 비밀번호 암호화
  const hashedPassword = await this.authService.hashPassword(password);


      const createdUser = await this.authService.signUp({email, hashedPassword, passwordConfirm, name});
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

      
      return res.status(200).json({ data: createdUser });
    } catch (err) {
      next(err);
    }
  };
}
